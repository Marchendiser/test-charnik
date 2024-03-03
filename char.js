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

// Window On load
window.addEventListener("load", ev => {
    const urlParams = new URLSearchParams(window.location.search);
    const charid = urlParams.get('id');

    console.log("Char id ", charid);

    loadCharacterListDataFromLocalStorage(charid);

    // apply CHAR_DATA to html, set correct values.
    applyCharacterDataToPage();
    updateCastStats();

    dataUpdateInterval = setInterval(() => {
        saveCharDataUpdate();
    }, 2000);

})


function loadCharacterListDataFromLocalStorage(charId) {
    const allCharacters = JSON.parse(localStorage.getItem("characters"));
    const data = allCharacters[charId];

    console.log("our charact3er", data)

    if (data ==  null || data == undefined) {
        window.location = "/main.html"
    } 
    CHAR_DATA = data;

}

function saveCharDataUpdate() {
    var characters = JSON.parse(localStorage.getItem("characters"));
    characters[CHAR_DATA.id] = CHAR_DATA; 
    localStorage.setItem("characters", JSON.stringify(characters));
}


// Function should take the CHAR_DATA contnets (which was previously loaded from localStorage using loadCharacterListDataFromLocalStorage),
// and update the page contents to match 
function applyCharacterDataToPage() {
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
    document.getElementById('bonusnumber').textContent = CHAR_DATA.profBonus;
    
    // Former CharListData
    document.getElementById("name").value = CHAR_DATA.name;
    document.getElementById("race").value = CHAR_DATA.race;
    document.getElementById("class-lvl").value = CHAR_DATA.classAndLevel;
    document.getElementById("age").value = CHAR_DATA.age;
    document.getElementById("alignment").value = CHAR_DATA.alignment;
    document.getElementById("exp").value = CHAR_DATA.exp;

    // Former traitData1/traitData2
    document.getElementById("perstrait").value = CHAR_DATA.personality.perstrait;
    document.getElementById("ideal").value = CHAR_DATA.personality.ideal;
    document.getElementById("affection").value = CHAR_DATA.personality.affect;
    document.getElementById("weakness").value = CHAR_DATA.personality.weakness;

    //former player status data (CharStatusData)
    document.getElementById("armorClass").value = CHAR_DATA.armorClass;
    document.getElementById("speed").value = CHAR_DATA.speed;
    document.getElementById("curhits").value = CHAR_DATA.health.current;
    document.getElementById("maxhits").value = CHAR_DATA.health.maximum;
    document.getElementById("temphits").value = CHAR_DATA.health.temporal;
    document.getElementById("hitdie").value = CHAR_DATA.health.hitDie;

    //Former otherProfData
    document.getElementById("otherprofcontent").value = CHAR_DATA.otherProf;

    //Former equipData
    document.getElementById("equipment").value = CHAR_DATA.equipment;

    //Former invData
    document.getElementById("inventorycontent").value = CHAR_DATA.inventory;

    //Former otherAbData
    document.getElementById("otherabcontent").value = CHAR_DATA.otherAbilities;

    //Former castData (перенести сюда spellSave + spellAtk)
    document.getElementById("castclass").value = CHAR_DATA.casterData.casterClass;
    document.getElementById("castab").value = CHAR_DATA.casterData.ability;

    document.getElementById("spellSave").innerText = CHAR_DATA.casterData.spellSave;
    document.getElementById("spellAtk").innerText = CHAR_DATA.casterData.spellAtk;

    //Former spellList
    document.getElementById("cantripcontent").value = CHAR_DATA.spells.cantrip;
    document.getElementById("spells1").value = CHAR_DATA.spells.spells1;
    document.getElementById("spells2").value = CHAR_DATA.spells.spells2;
    document.getElementById("spells3").value = CHAR_DATA.spells.spells3;
    document.getElementById("spells4").value = CHAR_DATA.spells.spells4;
    document.getElementById("spells5").value = CHAR_DATA.spells.spells5;
    document.getElementById("spells6").value = CHAR_DATA.spells.spells6;
    document.getElementById("spells7").value = CHAR_DATA.spells.spells7;
    document.getElementById("spells8").value = CHAR_DATA.spells.spells8;
    document.getElementById("spells9").value = CHAR_DATA.spells.spells9;
} 

//сейв и загрузка инпутов с основной инфой
const info = document.getElementById("info");

info.addEventListener("input", function(event){
    CHAR_DATA[event.target.name] = event.target.value;
    saveCharDataUpdate();
})

// сейв персональных черт и пассивных абилок
const CHARACTER_PERSONALITY = ["perstrait", "ideal", "affection", "weakness"];
CHARACTER_PERSONALITY.forEach(value => {
    const elem = document.getElementById(value);
    console.log("Char personality", value, elem)
    elem.addEventListener("input", function(event) {
        CHAR_DATA.personality[value] = event.target.value;
        saveCharDataUpdate();
    });
})

//сейв и загрузка боевых-статов инпутов
const armorClassElem = document.getElementById("armorClass");
armorClassElem.addEventListener('input', event => {
    CHAR_DATA.armorClass = event.target.value;
});

const charSpeedElem = document.getElementById("speed");
armorClassElem.addEventListener('input', event => {
    CHAR_DATA.speed = event.target.value;
});

const CHARACTER_HEALTH_DATA = {'curhits': 'current', 'maxhits': 'maximum', 'temphits': 'temporal', 'hitdie': 'hitDie'};
for (const healthPropertyId in CHARACTER_HEALTH_DATA) {
    const charHealthProperty = CHARACTER_HEALTH_DATA[healthPropertyId];
    const elem = document.getElementById(healthPropertyId);
    console.log("Char health elem", healthPropertyId, elem)
    elem.addEventListener("input", function(event) {
        CHAR_DATA.health[charHealthProperty] = event.target.value;
        saveCharDataUpdate();
    });
}

//сейв текстового окна прочих владений
const otherProfContent = document.getElementById("otherprofcontent");

otherProfContent.addEventListener("input", function(event){
    CHAR_DATA[event.target.name] = event.target.value;
    saveCharDataUpdate();
})

//сейв экипировки и инвенатаря
const equipContent = document.getElementById("equipment");

equipContent.addEventListener("input", function(event){
    CHAR_DATA[event.target.name] = event.target.value;
    saveCharDataUpdate();
})

const invContent = document.getElementById("inventorycontent");

invContent.addEventListener("input", function(event){
    CHAR_DATA[event.target.name] = event.target.value;
    saveCharDataUpdate();
})

// сейв других абилок
const otherAbContent = document.getElementById("otherabcontent");

otherAbContent.addEventListener("input", function(event){
    CHAR_DATA[event.target.name] = event.target.value;
    saveCharDataUpdate();
})

//сейв заклинательных абилок
const castContent = document.getElementById("caststat");

castContent.addEventListener("input", function(event){
    CHAR_DATA[event.target.name] = event.target.value;
    saveCharDataUpdate();
})
    
//сейв списка заклинаний

const spellContent = document.getElementById("spelllist");

spellContent.addEventListener("input", function(event){
    CHAR_DATA[event.target.name] = event.target.value;
    saveCharDataUpdate();
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
    console.log(abilityName)
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
    console.log(`ability mod for ${abilityName} new value`, modificatorValue);

    const abilityModEl = document.getElementById(abilityElementIds.modElemId);
    abilityModEl.textContent = intValueToString(modificatorValue);

    recalcSaveThrow(abilityName, ability, CHAR_DATA.profBonus);
    
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
    recalcSaveThrow(abilityName, ability, CHAR_DATA.profBonus);
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
    ABILITIES.forEach(abilityName => recalcSaveThrow(abilityName, CHAR_DATA.abilities[abilityName], profBonusNewValue));
}

function recalcSaveThrow(abilityName, ability, profBonus) {
    console.log("Recalc save throw", ability, profBonus);
    const saveThrowElemId = getAbilityRelatedElementIds(abilityName).saveThrowElemId;
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
    saveCharDataUpdate();
}

function updatePassivePersep(){
    let passivePersep = document.getElementById("passivePersep");
    let persepScore = document.getElementById("wis-skill-perception").textContent;

    passivePersep.textContent = 10 + parseInt(persepScore);

}

