
// DATA SECTION (берётся из localStorage при загрузке страницы)
let characters = { }; // как map: {'1': {char data (id=1)}, '2': {char data (id=2)} ...}

let newCharactersCount = 0;


// on load 
window.addEventListener('load', ev => {
    // получение персонажей из local storage, и отображение их на странице. 
    // +Пересчёт карточек для обновления значения порядкового номера и id.
    characters = JSON.parse(localStorage.getItem("characters"));
    if (characters == null || characters == undefined) {
        characters = {};
    }
    console.log(newCharactersCount); 
    for (const charId in characters) {
        const character = characters[charId];
        // проверяем,новый ли это перс, ксли да, то добавляем +1 к каунтеру
        if (!character.name??false) {
            newCharactersCount++;
        }
        // и дальше внутри метода аддКарт, если имя пусто, то = новый перс и используется каунтер
        addCard(characters[charId]); 
    }
});


function logOut(){
    if(confirm("Вы уверены что хотите выйти?"))
        window.location = "login.html"
}

//создание ячеек новых персонажей

function addNewCard() {    
    newCharactersCount++
    const charId = getNextCharId();
    console.log("New character id ", charId);
    const characterData = makeNewCharacterAndSaveToStorage(charId);
    addCard(characterData);
}

function addCard(characterData) {   
    console.log("add card for character", characterData, characterData.id) 
    var card = document.createElement("div");
    card.className = "card";
    if (characterData.name) {
        card.name = characterData.name;
    }
    var cardContentWrapper = document.createElement("div")
    var cardHeader = document.createElement("div");
    cardHeader.textContent = characterData.name || "Новый персонаж " + newCharactersCount;
    cardHeader.className = "card-header";
    cardContentWrapper.appendChild(cardHeader);

    var cardContent = document.createElement('div');
    cardContent.textContent = characterData.race + ", " + characterData.classAndLevel || "Раса, класс, уровень";
    cardContent.className = "card-content";
    cardContentWrapper.appendChild(cardContent);

    card.appendChild(cardContentWrapper);

    var deleteButton = document.createElement("p");
    deleteButton.innerHTML = "&#10006;";
    deleteButton.className = "delete-button";
    deleteButton.onclick = function (event) {
        event.stopPropagation();
        deleteCrrespondingCharacter(characterData.id);
        card.parentNode.removeChild(card);
        updateCardNumbers();
    }
    card.appendChild(deleteButton);

    card.addEventListener("click", function() {
        window.location = `char.html?id=${characterData.id}`;
    });

    document.getElementById("cardContainer").appendChild(card);
}

// Функция для сохранения карточек в localStorage
function makeNewCharacterAndSaveToStorage(charId) {
    let initCharData = getInitCharData(charId);
    characters[initCharData.id] = initCharData;
    localStorage.setItem("characters", JSON.stringify(characters));
    return initCharData;
}

function deleteCrrespondingCharacter(charId) {
    const charToDelete = characters[charId];
    // проверка, если это был новый перс, то уменьшение каунтера и перерасчет чисел
    if (!charToDelete.name??false) {
        console.log("DELETE NAME", charToDelete.name)
        newCharactersCount--;
    }
    delete characters[charId];    
    localStorage.setItem("characters", JSON.stringify(characters));
}

//обновлялка порядкового номера карточки
function updateCardNumbers() {
    const cards = document.getElementsByClassName("card");
    console.log("selected cards", cards)
    let tempCounter = 0;
    for (let i = 0; i < cards.length; i++) {
        var card = cards[i];
        console.log(`the card (${card.name})`, card)
        if (!card.name??false) {
            console.log(`update name of the card (${card.name})`, card)
            const cardHeader = card.getElementsByClassName('card-header')[0];
            cardHeader.textContent = "Новый персонаж " + (++tempCounter);
        } 
    }
  }

// Порядок id для персонажей
function getNextCharId() {
    console.log("getting new char id")
    let lastCharId = localStorage.getItem('charIdSeq');
    if (lastCharId === null || lastCharId === undefined) {
        lastCharId = 0;
    }
    const nextCharId = parseInt(lastCharId) + 1;
    localStorage.setItem('charIdSeq', nextCharId);
    return nextCharId;
}


function getInitCharData (charId) {
    return {
        id: charId,
        name: null, 
        race: "Раса",
        age: 20,
        classAndLevel: "Класс и уровень",
        alignment: "",
        exp: 0,
        armorClass: 10,
        speed: 30,
        initiative: 0,
        health: {
            current: -1,
            maximum: -1,
            temporal: 0,
            hitDie: "1dX"
        },
        personality: {
            ideal: "",
            perstrait: "",
            affection: "",
            weakness: ""
        },
    
        profBonus: 2,
        abilities: {
            "STR": {value: 8, proficiency: false}, 
            "DEX": {value: 8, proficiency: false}, 
            "CON": {value: 8, proficiency: false}, 
            "INT": {value: 8, proficiency: false}, 
            "WIS": {value: 8, proficiency: false}, 
            "CHA": {value: 8, proficiency: false}
        },
        skills: [],
        otherAbilities: "",
        otherProf: "",
        casterData: {
            casterClass: "",
            ability: "",
            spellSave: 0,
            spellAtk: 0
        },
        spells: {
            cantrip: "", 
            spells1: "",
            spells2: "",
            spells3: "",
            spells4: "",
            spells5: "",
            spells6: "",
            spells7: "",
            spells8: "",
            spells9: ""
        },
        equipment: "",
        inventory: "",
    }
}