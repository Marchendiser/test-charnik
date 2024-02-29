// Some constant values, ids, etc
const ABILITIES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

const SKILLS = [
    'athletics',
    'acrobatics',
    'stealth',
    'history',
    'magika',
    'nature',
    'ivestigation',
    'religion',
    'perception',
    'survival',
    'medicine',
    'insight',
    'animals',
    'performance',
    'intimidation',
    'deception',
    'persuation'
]


const SKILL_TO_ABILITY = {
    'athletics': "STR",
    'acrobatics': "DEX",
    'stealth': "DEX",
    'history': "INT",
    'magika': "INT",
    'nature': "INT",
    'ivestigation': "INT",
    'religion': "INT",
    'perception': "WIS",
    'survival': "WIS",
    'medicine': "WIS",
    'insight': "WIS",
    'animals': "WIS",
    'performance': "CHA",
    'intimidation': "CHA",
    'deception': "CHA",
    'persuation': "CHA"
}

// Page data. To be synced with local storage, to be loaded from local storage
let CHAR_DATA;
let dataUpdateInterval;

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
              }, {}),
            skills: []
        };
        saveCharDataToLocalStorage(initCharData);
        CHAR_DATA = initCharData;
    }
}

function saveCharDataToLocalStorage(charData) {
    localStorage.setItem("charData", JSON.stringify(charData));
}


// Function should take the CHAR_DATA contnets (which was previously loaded from localStorage using loadCharacterListDataFromLocalStorage),
// and update the page contents to match 
function appyCharacterDataToPage() {
    ABILITIES.forEach(abilityName => {
        const abilityElementIds = getAbilityRelatedElementIds(abilityName);
        applyAbilityValueFromCharData(document.getElementById(abilityElementIds.scoreElemId), abilityName);
        
    });
    SKILLS.forEach(skill => {
        updateSkillValue(skill);
        if (CHAR_DATA.skills.includes(skill)) {
            setSkillInputValue(skill, true);
        }
    })
} 

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

//сейв текстового окна прочих владений
let otherProfData = {};
const otherProfContent = document.getElementById("otherprofcontent");
const otherData = localStorage;

otherProfContent.addEventListener("input", function(event){
    otherProfData[event.target.name] = event.target.value;
    otherData.setItem("otherProfData", JSON.stringify(otherProfData));
})
if (otherData.getItem("otherProfData")) {
    otherProfData = JSON.parse(otherData.getItem("otherProfData"));
    document.getElementById("otherprofcontent").value = otherProfData.otherprof;
}

//сейв экипировки и инвенатаря
let equipData = {};
const equipContent = document.getElementById("equipment");
const savedEquip = localStorage;

equipContent.addEventListener("input", function(event){
    equipData[event.target.name] = event.target.value;
    savedEquip.setItem("equipData", JSON.stringify(equipData));
})
if (savedEquip.getItem("equipData")) {
    equipData = JSON.parse(savedEquip.getItem("equipData"));
    document.getElementById("equipment").value = equipData.inventory;
}

let invData = {};
const invContent = document.getElementById("inventorycontent");
const savedInv = localStorage;

invContent.addEventListener("input", function(event){
    invData[event.target.name] = event.target.value;
    savedInv.setItem("invData", JSON.stringify(invData));
})
if (savedInv.getItem("invData")) {
    invData = JSON.parse(savedInv.getItem("invData"));
    document.getElementById("inventorycontent").value = invData.inventory;
}

// сейв персональных черт и пассивных абилок
let traitData1 = {}
const traitContent1 = document.getElementById("perstrait1");
const savedTrait1 = localStorage;

traitContent1.addEventListener("input", function(event){
    traitData1[event.target.name] = event.target.value;
    savedTrait1.setItem("traitData1", JSON.stringify(traitData1));
})
if (savedTrait1.getItem("traitData1")) {
    traitData1 = JSON.parse(savedTrait1.getItem("traitData1"));
    document.getElementById("perstrait").value = traitData1.perstrait;
    document.getElementById("ideal").value = traitData1.ideal;
}

let traitData2 = {}
const traitContent2 = document.getElementById("perstrait2");
const savedTrait2 = localStorage;

traitContent2.addEventListener("input", function(event){
    traitData2[event.target.name] = event.target.value;
    savedTrait2.setItem("traitData2", JSON.stringify(traitData2));
})
if (savedTrait2.getItem("traitData2")) {
    traitData2 = JSON.parse(savedTrait2.getItem("traitData2"));
    document.getElementById("affect").value = traitData2.affect;
    document.getElementById("weakness").value = traitData2.weakness;
}

let otherAbData = {}
const otherAbContent = document.getElementById("otherabcontent");
const savedOtherAb = localStorage;

otherAbContent.addEventListener("input", function(event){
    otherAbData[event.target.name] = event.target.value;
    savedOtherAb.setItem("otherAbData", JSON.stringify(otherAbData));
})
if (savedOtherAb.getItem("otherAbData")) {
    otherAbData = JSON.parse(savedOtherAb.getItem("otherAbData"));
    document.getElementById("otherabcontent").value = otherAbData.otherab;
}

//сейв заклинательных абилок
let castData = {};
const castContent = document.getElementById("caststat");
const savedCast = localStorage;

castContent.addEventListener("input", function(event){
    castData[event.target.name] = event.target.value;
    savedCast.setItem("castData", JSON.stringify(castData));
})
if (savedCast.getItem("castData")) {
    castData = JSON.parse(savedCast.getItem("castData"));
    document.getElementById("castclass").value = castData.castclass;
    document.getElementById("castab").value = castData.castab;
}

//сейв списка заклинаний
let spellList = {};
const spellContent = document.getElementById("spelllist");
const savedSpells = localStorage;

spellContent.addEventListener("input", function(event){
    spellList[event.target.name] = event.target.value;
    savedSpells.setItem("spellList", JSON.stringify(spellList));
})
if (savedSpells.getItem("spellList")) {
    spellList = JSON.parse(savedSpells.getItem("spellList"));
    document.getElementById("cantripcontent").value = spellList.cantrip;
    document.getElementById("spells1").value = spellList.spells1;
    document.getElementById("spells2").value = spellList.spells2;
    document.getElementById("spells3").value = spellList.spells3;
    document.getElementById("spells4").value = spellList.spells4;
    document.getElementById("spells5").value = spellList.spells5;
    document.getElementById("spells6").value = spellList.spells6;
    document.getElementById("spells7").value = spellList.spells7;
    document.getElementById("spells8").value = spellList.spells8;
    document.getElementById("spells9").value = spellList.spells9;
}


window.addEventListener("load", ev => {
    loadCharacterListDataFromLocalStorage(); // ЭТА ХУЙНЯ НЕ ЗАГРУЖАЕТ СТАТЫ ИЗ СТОРИДЖА ДАЖЕ В ИНПУТЫ

    // apply CHAR_DATA to html, set correct values.
    appyCharacterDataToPage();
    updateCastStats();

    dataUpdateInterval = setInterval(() => {
        saveCharDataToLocalStorage(CHAR_DATA);
    }, 2000);

})



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

// VALUES UPDATE FUNCTIONS
const ability = (id) => {
    console.log(`create ability ${id}`)
    return {
        id: id,
        value: 0,
        proficiency: false
    };
};

//загрузка значений Характеристик и Чекбоксов Спасбросокв
function applyAbilityValueFromCharData(abilityScoreElem, abilityName) {
    const ability = CHAR_DATA.abilities[abilityName];

    abilityScoreElem.value = ability.value;

    if (ability.proficiency) {
        console.log("proficiency in " + abilityName)
        const abilityCheckboxId = abilityName.toLowerCase() + '-save-prof';
        const abilityCheckbox = document.getElementById(abilityCheckboxId);

        abilityCheckbox.checked = true;
    }

    recalculateFieldsAfterAbilityUpdated(abilityName, ability)
}

function updateAbility(abilityScoreElem, abilityName) {

    const ability = CHAR_DATA.abilities[abilityName];

    ability.value = parseInt(abilityScoreElem.value);

    recalculateFieldsAfterAbilityUpdated(abilityName, ability)

    updateCastStats()
    updatePassivePersep()
};

function recalculateFieldsAfterAbilityUpdated(abilityName, ability) {
    const abilityElementIds = getAbilityRelatedElementIds(abilityName);

    let modificatorValue = getAbilityModificatorValue(ability);
    console.log(`ability mod for ${ability.id} new value`, modificatorValue);

    const abilityModEl = document.getElementById(abilityElementIds.modElemId);
    abilityModEl.textContent = intValueToString(modificatorValue);

    recalcSaveThrow(ability, CHAR_DATA.profBonus);
    
    SKILLS.filter(skill => SKILL_TO_ABILITY[skill] == abilityName)
        .forEach(skill => updateSkillValue(skill))

    if (ability.id === "DEX") {
        let initiative = document.getElementById("initiative");
        initiative.textContent = intValueToString(modificatorValue);
    }

}

function updateAbilityProficiency(abilityName, input) {
    const ability = CHAR_DATA.abilities[abilityName];
    ability.proficiency = input.checked;
    recalcSaveThrow(ability, CHAR_DATA.profBonus);
}

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


// SKILLS FUNCTIONS
function updateSkillStateAndValue (skillName, input) {
    const skillChecked = input.checked;
    if (skillChecked && !CHAR_DATA.skills.includes(skillName)) {
        CHAR_DATA.skills.push(skillName);
    } else if (!skillChecked) {
        CHAR_DATA.skills = CHAR_DATA.skills.filter(charSkill => charSkill != skillName);
    }

    updateSkillValue(skillName);
}

function updateSkillValue(skillName) {
    const relatedAbilityName = SKILL_TO_ABILITY[skillName];

    const skillValueElemId = relatedAbilityName.toLowerCase() + "-skill-" + skillName;
    const skillValueElem = document.getElementById(skillValueElemId);

    skillValueElem.innerText = intValueToString(getSkillValue(skillName));
    updatePassivePersep()
}

function setSkillInputValue(skillName, isChecked) {
    console.log("seting skill input initial", skillName, isChecked);
    const relatedAbility = SKILL_TO_ABILITY[skillName];

    const skillCheckboxId = relatedAbility.toLowerCase() + "-skill-input-" + skillName;
    const skillCheckbox = document.getElementById(skillCheckboxId);

    skillCheckbox.checked = isChecked;
}

function getSkillValue(skillName) {
    const charSkills = CHAR_DATA.skills;
    const charAbilities = CHAR_DATA.abilities;
    const profBonus = CHAR_DATA.profBonus;

    const skillAbility = SKILL_TO_ABILITY[skillName];
    const ability = charAbilities[skillAbility];
    const abilityValue = getAbilityModificatorValue(ability);

    const charHasSkill = charSkills.includes(skillName);

    return abilityValue + (charHasSkill ? profBonus : 0);
}


// SET UP PAGE LISTENERS
ABILITIES.forEach(abilityName => {
    console.log("creating listener for ", abilityName)
    const abilityElementIds = getAbilityRelatedElementIds(abilityName);

    const abilityScoreElem = document.getElementById(abilityElementIds.scoreElemId);
    abilityScoreElem.addEventListener("input", event => updateAbility(event.target, abilityName));

    const abilityCheckboxId = abilityName.toLowerCase() + '-save-prof';
    const abilityCheckbox = document.getElementById(abilityCheckboxId);
    abilityCheckbox.addEventListener("change", event => updateAbilityProficiency(abilityName, event.target));
});

SKILLS.forEach(skillName => {
    console.log("creating listener for ", skillName)
    const relatedAbility = SKILL_TO_ABILITY[skillName];

    const skillCheckboxId = relatedAbility.toLowerCase() + "-skill-input-" + skillName;
    const skillCheckbox = document.getElementById(skillCheckboxId);

    skillCheckbox.addEventListener("change", event => updateSkillStateAndValue(skillName, event.target));
})


//изменение бонуса мастерства по нажатию
function bonusup() {
    console.log("bonusup", CHAR_DATA);
    let profBonus = CHAR_DATA.profBonus + 1;
    if (profBonus > 6) {
        profBonus = 2
    }
    CHAR_DATA.profBonus = profBonus;
    recalcSaveThrowsOnProfBonusChange(profBonus);
    SKILLS.forEach(skill => updateSkillValue(skill) );
    document.getElementById("bonusnumber").innerHTML = profBonus;
    updateCastStats()
    updatePassivePersep()
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

function updateCastStats() {
    let castAbility = document.getElementById("castab");
    let spellSave = document.getElementById("spellSave");
    let spellAtk = document.getElementById("spellAtk");
    let prof = document.getElementById("bonusnumber").textContent;
    let intmod = document.getElementById("intmod").textContent;
    let wismod = document.getElementById("wismod").textContent;
    let chamod = document.getElementById("chamod").textContent;

    if (castAbility.value === "Интеллект"){
        spellSave.textContent = 8 + parseInt(prof) + parseInt(intmod);
        spellAtk.textContent = parseInt(prof) + parseInt(intmod);
    }else if (castAbility.value === "Мудрость"){
        spellSave.textContent = 8 + parseInt(prof) + parseInt(wismod);
        spellAtk.textContent = parseInt(prof) + parseInt(wismod);
    }else if (castAbility.value === "Харизма"){
        spellSave.textContent = 8 + parseInt(prof) + parseInt(chamod);
        spellAtk.textContent = parseInt(prof) + parseInt(chamod);
    }
    let castSpell = [spellSave.textContent, spellAtk.textContent];
    localStorage.setItem("castSpell", JSON.stringify(castSpell));
    if (localStorage.getItem("castSpell")){
        castSpell = JSON.parse(localStorage.getItem("castSpell"))
        spellSave.textContent = castSpell[0];
        spellAtk.textContent = castSpell[1];
    }
}

function updatePassivePersep(){
    let passivePersep = document.getElementById("passivePersep");
    let persepScore = document.getElementById("wis-skill-perception").textContent;

    passivePersep.textContent = 10 + parseInt(persepScore);

    let passivePersepScore = [passivePersep.textContent];
    localStorage.setItem("passivePersepScore", JSON.stringify(passivePersepScore));
    if (localStorage.getItem("passivePersepScore")){
        passivePersepScore = JSON.parse(localStorage.getItem("passivePersepScore"));
        passivePersep.textContent = passivePersepScore[0];
    }
}

