
// DATA SECTION (should come from localStorage on window load)
let cardCounter = 0;
let characters = { }; // like map: {'1': {char data (id=1)}, '2': {char data (id=2)} ...}


// on load 
window.addEventListener('load', ev => {

    // get the cards from local storage, and apply this data to the page, to render all the cards. 
    // Also, count the cards  to get the char Id counter in place. (or even read own property for that)

});


function logOut(){
    if(confirm("Вы уверены что хотите выйти?"))
        window.location = "/test/login.html"
}

//создание ячеек новых персонажей

function addCard() {    
    
    var characterData = makeNewCharacterAndSaveToStorage(cardCounter++);

    var card = document.createElement("div");
    card.className = "card";
    var cardContentWrapper = document.createElement("div")
    var cardHeader = document.createElement("a");
    cardHeader.textContent = "Новый персонаж " + characterData.id;
    cardHeader.className = "card-header";
    cardHeader.href = `/char.html?id=${characterData.id}`
    cardContentWrapper.appendChild(cardHeader);

    var cardContent = document.createElement('div');
    cardContent.textContent = "Раса, класс, уровень";
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
    
    /*
    card.addEventListener("click", function() {
        var newPage = window.open("", "_blank"); // Открываем новое окно (плейсхолдер покачто)
        var cardHtml = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Карточка</title><link rel='stylesheet' href='style.css'></head><body><h1>" + cardHeader.textContent + "</h1><p>" + cardContent.textContent + "</p></body></html>";
        newPage.document.write(cardHtml); // Записываем HTML-код карточки в новое окно
        newPage.document.close(); // Закрываем запись
    });
    */

    document.getElementById("cardContainer").appendChild(card);
    saveCardsToLocalStorage();
}
//обновлялка порядкового номера карточки
function updateCardNumbers() {
    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        var deleteButton = cards[i].querySelector("p");
        cards[i].childNodes[0].childNodes[0].textContent = "Новый персонаж " + (i + 1);
        cards[i].appendChild(deleteButton);
    }
    cardCounter = cards.length;
  }

// Функция для сохранения карточек в localStorage?
function makeNewCharacterAndSaveToStorage(charId) {
    let initCharData = getInitCharData(charId);

    characters[initCharData.id] = initCharData;

    localStorage.setItem("characters", JSON.stringify(characters));

    return initCharData;
}

function deleteCrrespondingCharacter(charId) {
    delete characters[charId];

    localStorage.setItem("characters", JSON.stringify(characters))
}


function saveCardsToLocalStorage() {
    var cardsData = [];
    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        var cardHeader = cards[i].childNodes[0].childNodes[0].textContent;
        var cardContent = cards[i].childNodes[0].childNodes[0].textContent;
        cardsData.push({header: cardHeader, content: cardContent}); 
    }
    localStorage.setItem("cards",JSON.stringify(cardsData));
}
// Функция для загрузки карточек из localStorage


// when making new card, we init new character data, and save it into the localStorage. 


// FUNCTIONS
function getInitCharData (charId) {
    return {
        id: charId,
        name: "",
        race: "human",
        age: 20,
        classAndLevel: "???, 1lvl",
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
        abilities: [
            {
                abilityId: "strenght",
                value: 8,
                proficiency: false
            },
            {
                abilityId: "dexterity",
                value: 8,
                proficiency: false
            },
            {
                abilityId: "constitution",
                value: 8,
                proficiency: false
            },
            {
                abilityId: "inteligence",
                value: 8,
                proficiency: false
            },
            {
                abilityId: "wisdom",
                value: 8,
                proficiency: false
            },
            {
                abilityId: "charisma",
                value: 8,
                proficiency: false
            }  
        ],
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