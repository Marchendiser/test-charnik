const ABILITIES = ["STR"];


let CHAR_DATA;

window.addEventListener("load", ev => {
    loadCharacterListDataFromLocalStorage(); // ЭТА ХУЙНЯ НЕ ЗАГРУЖАЕТ СТАТЫ ИЗ СТОРИДЖА ДАЖЕ В ИНПУТЫ

    // apply CHAR_DATA to html, set correct values.

    /*dataUpdateInterval = setInterval(() => {
        saveCharDataToLocalStorage(CHAR_DATA);
    }, 10000);*/

})

function loadCharacterListDataFromLocalStorage() {
    var data = localStorage.getItem("charData");
    console.log("Loaded data", data);
    if (data != null && data.length > 0) {
        CHAR_DATA = JSON.parse(data);
    } else {
        let initCharData = {
            profBonus: 2,
            abilities: ABILITIES.reduce((abils, abilityName, index) => {
                if (abils[abilityName]) {
                  console.error("Хуйня, хули она два раза у тебя", abilityName)
                } else {
                    abils[abilityName] = ability(abilityName);
                }
                return abils;
              }, {})
        };
        saveCharDataToLocalStorage(initCharData);
        CHAR_DATA = initCharData;
    }
}

function saveCharDataToLocalStorage(charData) {
    localStorage.setItem("charData", JSON.stringify(charData));
}

function applyCharData() {
    var strengthInput = document.getElementById("strength_input");

    strengthInput.value = CHAR_DATA.abilities[];
}