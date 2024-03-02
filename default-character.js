
export function getInitCharData (charId) {
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
            savethrowDiff: 0,
            attackBonus: 0
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