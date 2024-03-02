interface ICharacter {
    id: string,
    name: string,
    race: string,
    age: number,
    classAndLevel: string,
    alignment: string,
    exp: number
    armorClass: number,
    speed: number,
    initiative: number,
    health: HealthData,
    personality: IPersonality,

    profBonus: number
    abilities: IAbility[],
    skills: string[],
    otherAbilities: string,
    otherProf: string

    casterData: ICastData,
    spells: ISpellData
    equipment: string,
    inventory: string,
}

interface IPersonality {
    ideal: string,
    perstrait: string,
    affection: string,
    weakness: string
}

interface HealthData {
    current: number,
    maximum: number,
    temporal: number,
    hitDie: string
}

interface IAbility {
    abilityId: string,
    value: number,
    proficiency: boolean
}

interface ISpellData {
    cantrip: string, 
    spells1: string,
    spells2: string,
    spells3: string,
    spells4: string,
    spells5: string,
    spells6: string,
    spells7: string,
    spells8: string,
    spells9: string
}

interface ICastData {
    casterClass: string,
    ability: string,
    spellSave: number,
    spellAtk: number
}