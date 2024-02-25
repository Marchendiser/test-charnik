// Some constant values, ids, etc
const ABILITIES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

// Page data. To be synced with local storage, to be loaded from local storage
let CHAR_DATA;
let dataUpdateInterval;

//сейв и загрузка инпутов с основной инфой
let CharListData = {};
const info = document.getElementById("info");
const ListData = localStorage

info.addEventListener("input", function(event){
    CharListData[event.target.name] = event.target.value;
    ListData.setItem("CharListData", JSON.stringify(CharListData));
})
if (ListData.getItem("CharListData")) {
    CharListData = JSON.parse(ListData.getItem("CharListData"));
    document.getElementById("name").value = CharListData.name;
    document.getElementById("race").value = CharListData.race;
    document.getElementById("claslvl").value = CharListData.claslvl;
    document.getElementById("age").value = CharListData.age;
    document.getElementById("alignment").value = CharListData.alignment;
    document.getElementById("exp").value = CharListData.exp;
}

//сейв и загрузка боевых-статов инпутов
let CharStatusData = {};
const charStatus = document.getElementById("status");
const StatusData = localStorage;

charStatus.addEventListener("input", function(event){
    CharStatusData[event.target.name] = event.target.value;
    StatusData.setItem("CharStatusData", JSON.stringify(CharStatusData));
})
if (StatusData.getItem("CharStatusData")) {
    CharStatusData = JSON.parse(StatusData.getItem("CharStatusData"));
    document.getElementById("armclass").value = CharStatusData.armclass;
    document.getElementById("speed").value = CharStatusData.speed;
    document.getElementById("curhits").value = CharStatusData.curhits;
    document.getElementById("maxhits").value = CharStatusData.maxhits;
    document.getElementById("temphits").value = CharStatusData.temphits;
    document.getElementById("hitdie").value = CharStatusData.hitdie;
}


window.addEventListener("load", ev => {
    loadCharacterListData(); //ЭТА ХУЙНЯ НЕ ЗАГРУЖАЕТ СТАТЫ ИЗ СТОРИДЖА ДАЖЕ В ИНПУТЫ

    // apply CHAR_DATA to html, set correct values.

    /*dataUpdateInterval = setInterval(() => {
        saveCharDataToLocalStorage(CHAR_DATA);
    }, 10000);*/

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
var infomain = document.getElementById("content");

function showspell() {
    stats.classList.add("hidden");
    caststats.classList.remove("hidden");
    infomain.classList.add("hidden");
    spellist.classList.remove("hidden")
}

function showlist() {
    stats.classList.remove("hidden");
    caststats.classList.add("hidden");
    infomain.classList.remove("hidden");
    spellist.classList.add("hidden")
}



ABILITIES.forEach(abilityName => {
    console.log("creating listener for ", abilityName)
    const abilityElementIds = getAbilityRelatedElementIds(abilityName);
    const abilityScoreElem = document.getElementById(abilityElementIds.scoreElemId);
    const updateAbility = () => {
        const ability = CHAR_DATA.abilities[abilityName];

        ability.value = parseInt(abilityScoreElem.value);

        let modificatorValue = getAbilityModificatorValue(ability);
        console.log(`ability mod for ${ability.id} new value`, modificatorValue);

        const abilityModEl = document.getElementById(abilityElementIds.modElemId);
        abilityModEl.textContent = intValueToString(modificatorValue);

        recalcSaveThrow(ability, CHAR_DATA.profBonus);
        updateSkillCheck();

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
        proficiencyElemId: abilityName.toLowerCase() + '-save-prof',
    };
}

//Бля Святой Юрий Владимирович помогите сделать навыки!
//Бля я чот нихуя не понимаю бля как вытащить нахой?
const strSkills = document.getElementById("str-skill");
const dexSkills = document.getElementById("dex-skill");
const intSkills = document.getElementById("int-skill");
const wisSkills = document.getElementById("wis-skill");
const chaSkills = document.getElementById("cha-skill");

function updateSkillCheck() {

    strSkills.textContent = ability("str").abilityModEl;

}
