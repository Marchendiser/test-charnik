// Some constant values, ids, etc
const ABILITIES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

// Page data. To be synced with local storage, to be loaded from local storage
let CHAR_DATA;
let dataUpdateInterval;

window.addEventListener("load", ev => {
    loadCharacterListData();

    // apply CHAR_DATA to html, set correct values.

    dataUpdateInterval = setInterval(() => {
        saveCharDataToLocalStorage(CHAR_DATA);
    }, 30000);
})

function loadCharacterListData() {
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

//кнопка переключения "страниц"
var stats = document.getElementById("statwrap");
var caststats = document.getElementById("caststat");
var spellist = document.getElementById("spelllist");
var info = document.getElementById("content");

function showspell() {
    stats.classList.add("hidden");
    caststats.classList.remove("hidden");
    info.classList.add("hidden");
    spellist.classList.remove("hidden")
}

function showlist() {
    stats.classList.remove("hidden");
    caststats.classList.add("hidden");
    info.classList.remove("hidden");
    spellist.classList.add("hidden")
}
/*подчсёт модификаторов (100% можно упростить?)
и добваление к спасброскам и инициативе
(навыки пока не сделал ибо тильтанул на грязный код)*/


ABILITIES.forEach(abilityName => {
    console.log("creating listener for ", abilityName)
    const abilityElementIds = getAbilityRelatedElementIds(abilityName);
    const abilityScoreElem = document.getElementById(abilityElementIds.scoreElemId);
    const updateAbility = () => {
        const ability = CHAR_DATA.abilities[abilityName];

        ability.value = parseInt(abilityScoreElem.value);

        let modificatorValue = getAbilityModificatorValue(ability);
        console.log(`ability ${ability.id} new value`, modificatorValue);

        const abilityModEl = document.getElementById(abilityElementIds.modElemId);
        abilityModEl.textContent = intValueToString(modificatorValue);

        recalcSaveThrow(ability, CHAR_DATA.profBonus);

        if (ability.id === "DEX") {
            let initiative = document.getElementById("initiative");
            initiative.textContent = intValueToString(modificatorValue);
        }
    };
    abilityScoreElem.addEventListener("input", updateAbility);

    const abilityProficiencyElem = document.getElementById(abilityElementIds.proficiencyElemId);

    const updateAbilityProficiency = (event) => {
        const ability = CHAR_DATA.abilities[abilityName];
        ability.proficiency = event.target.checked;
        recalcSaveThrow(ability, CHAR_DATA.profBonus);
    }

    abilityProficiencyElem.addEventListener("change", updateAbilityProficiency);
});

const ability = (id) => {
    console.log(`create ability ${id}`)
    return {
        id: id,
        value: 0,
        proficiency: false
    };
};

function getAbilityModificatorValue(ability) {
    var value = ability.value;
    let newValue = 0;
    if (value >= 0 && value <= 30) {
        if (value % 2 === 0) {
            newValue = (value / 2) - 5;
        } else {
            newValue = Math.floor(value / 2) - 5;
        }
    }
    return newValue;
}

//изменение бонуса мастерства по нажатию
function bonusup() {
    console.log("bonusup", CHAR_DATA);
    let profBonus = CHAR_DATA.profBonus + 1;
    if (profBonus > 6) {
        profBonus = 2
    }
    CHAR_DATA.profBonus = profBonus;
    recalcSaveThrowsOnProfBonusChange(profBonus);
    document.getElementById("bonusnumber").innerHTML = profBonus;


}

function recalcSaveThrowsOnProfBonusChange(profBonusNewValue) {
    ABILITIES.forEach(ability => recalcSaveThrow(CHAR_DATA.abilities[ability], profBonusNewValue));
}

function recalcSaveThrow(ability, profBonus) {
    const saveThrowElemId = getAbilityRelatedElementIds(ability.id).saveThrowElemId;
    const abilitySaveThrowEl = document.getElementById(saveThrowElemId);
    let saveThrow = getAbilityModificatorValue(ability);
    if (ability.proficiency) {
        saveThrow = saveThrow + profBonus;
    }
    abilitySaveThrowEl.textContent = intValueToString(saveThrow);
}

function intValueToString(intVal) {
    if (intVal > 0) {
        return "+" + intVal;
    }
    return intVal;
}

function getAbilityRelatedElementIds(abilityName) {
    return {
        scoreElemId: abilityName.toLowerCase() + 'score',
        modElemId: abilityName.toLowerCase() + 'mod',
        saveThrowElemId: abilityName.toLowerCase() + 'save',
        proficiencyElemId: abilityName.toLowerCase() + '-save-prof'
    };
}

// добавление Бонуса Мастерства при владении (ебучие чекбоксы)
