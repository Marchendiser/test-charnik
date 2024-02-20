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

//изменение бонуса мастерства по нажатию
var bonusnumber = document.getElementById("bonusnumber");
function bonusup() {
    bonusnumber.innerHTML ++;
    if (bonusnumber.innerHTML > 6) {
        bonusnumber.innerHTML = 2
    }
}
/*подчсёт модификаторов (100% можно упростить?)
и добваление к спасброскам и инициативе
(навыки пока не сделал ибо тильтанул на грязный код)*/
var strscore = document.getElementById("strscore");
var strmod = document.getElementById("strmod");
var strsave = document.getElementById("strsave");
function updateStrMod() {
    var value = parseInt(strscore.value);
    let newValue = 0;

    if (value >= 0 && value <= 30) {
        if (value % 2 === 0) {
            newValue = (value / 2) - 5;
        } else {
            newValue = Math.floor(value / 2) - 5;
        }
        if (newValue > 0) {
            newValue = "+" + newValue;
        }
    }
    strmod.textContent = newValue;
    strsave.textContent = newValue;
}
strscore.addEventListener("input", function() {
    updateStrMod(strscore, strmod, strsave);
});

var dexscore = document.getElementById("dexscore");
var dexmod = document.getElementById("dexmod");
var dexsave = document.getElementById("dexsave")
var initiative = document.getElementById("initiative");
function updateDexMod() {
    var value = parseInt(dexscore.value);
    let newValue = 0;

    if (value >= 0 && value <= 30) {
        if (value % 2 === 0) {
            newValue = (value / 2) - 5;
        } else {
            newValue = Math.floor(value / 2) - 5;
        }
        if (newValue > 0) {
            newValue = "+" + newValue;
        }
    }
    dexmod.textContent = newValue;
    dexsave.textContent = newValue;
    initiative.textContent = newValue;
}
dexscore.addEventListener("input", function() {
    updateDexMod(dexscore, dexmod, dexsave, initiative);
})
var conscore = document.getElementById("conscore");
var conmod = document.getElementById("conmod");
var consave = document.getElementById("consave");
function updateConMod() {
    var value = parseInt(conscore.value);
    let newValue = 0;

    if (value >= 0 && value <= 30) {
        if (value % 2 === 0) {
            newValue = (value / 2) - 5;
        } else {
            newValue = Math.floor(value / 2) - 5;
        }
        if (newValue > 0) {
            newValue = "+" + newValue;
        }
    }
    conmod.textContent = newValue;
    consave.textContent = newValue;
}
conscore.addEventListener("input", function() {
    updateConMod(conscore, conmod, consave);
})
var intscore = document.getElementById("intscore");
var intmod = document.getElementById("intmod");
var intsave = document.getElementById("intsave")
function updateIntMod() {
    var value = parseInt(intscore.value);
    let newValue = 0;

    if (value >= 0 && value <= 30) {
        if (value % 2 === 0) {
            newValue = (value / 2) - 5;
        } else {
            newValue = Math.floor(value / 2) - 5;
        }
        if (newValue > 0) {
            newValue = "+" + newValue;
        }
    }
    intmod.textContent = newValue;
    intsave.textContent = newValue;
}
intscore.addEventListener("input", function() {
    updateIntMod(intscore, intmod, intsave);
})
var wisscore = document.getElementById("wisscore");
var wismod = document.getElementById("wismod");
var wissave = document.getElementById("wissave");
function updateWisMod() {
    var value = parseInt(wisscore.value);
    let newValue = 0;

    if (value >= 0 && value <= 30) {
        if (value % 2 === 0) {
            newValue = (value / 2) - 5;
        } else {
            newValue = Math.floor(value / 2) - 5;
        }
        if (newValue > 0) {
            newValue = "+" + newValue;
        }
    }
    wismod.textContent = newValue;
    wissave.textContent = newValue;
}
wisscore.addEventListener("input", function() {
    updateWisMod(wisscore, wismod, wissave);
})
var chascore = document.getElementById("chascore");
var chamod = document.getElementById("chamod");
var chasave = document.getElementById("chasave")
function updateChaMod() {
    var value = parseInt(chascore.value);
    let newValue = 0;

    if (value >= 0 && value <= 30) {
        if (value % 2 === 0) {
            newValue = (value / 2) - 5;
        } else {
            newValue = Math.floor(value / 2) - 5;
        }
        if (newValue > 0) {
            newValue = "+" + newValue;
        }
    }
    chamod.textContent = newValue;
    chasave.textContent = newValue;
}
chascore.addEventListener("input", function() {
    updateChaMod(chascore, chamod, chasave);
})
// добавление Бонуса Мастерства при владении (ебучие чекбоксы)