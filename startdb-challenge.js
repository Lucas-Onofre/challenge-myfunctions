let olympicsMedalTable = [
    { id: 1, country: "BRASIL", gold: 7, silver: 6, bronze: 6, continent: "AMERICA DO SUL" },
    { id: 2, country: "USA", gold: 46, silver: 37, bronze: 17, continent: "AMERICA DO NORTE" },
    { id: 3, country: "CHINA", gold: 26, silver: 18, bronze: 26, continent: "ASIA" },
    { id: 4, country: "RUSSIA", gold: 19, silver: 18, bronze: 19, continent: "EUROPA" },
    { id: 5, country: "REINO UNIDO", gold: 27, silver: 23, bronze: 17, continent: "EUROPA" },
    { id: 6, country: "ALEMANHA", gold: 17, silver: 10, bronze: 15, continent: "EUROPA" },
    { id: 7, country: "JAPÃO", gold: 12, silver: 8, bronze: 21, continent: "ASIA" },
    { id: 8, country: "ARGENTINA", gold: 3, silver: 1, bronze: 0, continent: "AMERICA DO SUL" },
    { id: 9, country: "ITALIA", gold: 8, silver: 12, bronze: 8, continent: "EUROPA" },
    { id: 10, country: "QUÊNIA", gold: 6, silver: 6, bronze: 1, continent: "AFRICA" },
];

Array.prototype.customFind = function (predicate) {
    // Implemente aqui seu algoritmo
    const newArray = []
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this)) {
            return this[i]
        }
    }
    return newArray
}

Array.prototype.customSome = function (predicate) {
    // Implemente aqui seu algoritmo
    let flag = Boolean
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this) || flag === true) {
            flag = true
        }
        else {
            flag = false
        }
    }
    return flag
}

Array.prototype.customFilter = function (predicate) {
    const newArray = []
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this)) {
            newArray.push(this[i])
        }
    }
    return newArray;
}

Array.prototype.customMap = function (callback) {
    const newArray = []
    for (let i = 0; i < this.length; i++) {
        newArray.push(callback(this[i], i, this))
    }
    return newArray
}

Array.prototype.customReduce = function (callback, initialValue) {
    const initialIndex = initialValue ? 0 : 1
    let acc = initialValue || this[0]
    for (let i = initialIndex; i < this.length; i++) {
        acc = callback(acc, this[i], i, this)
    }
    return acc
}

// Código modelo utilizando filter, map e reduce

const resultFilterMapReduce = olympicsMedalTable.filter(i => i.continent === "ASIA") // JAPÃO e CHINA 
    .map(i => i.gold) // 26 e 12
    .reduce((total, quantity) => total + quantity); // 38

console.log(`Medalhas de Ouro no continente Asiático: ${resultFilterMapReduce}`);


// Implemente as funções customizadas - customFilter, customMap e customReduce e verique se o retorno é igual ao do código modelo

const resultByCustomFilterMapReduce = olympicsMedalTable.customFilter(i => i.continent === "ASIA")
    .customMap(i => i.gold)
    .customReduce((total, quantity) => total + quantity);

console.log(`Resultado custom - Medalhas de Ouro no continente Asiático: ${resultByCustomFilterMapReduce}`);

/* DESAFIOS - CONCLUA AS FUNÇÕES customSome, customFind E UTILIZANDO TODAS AS FUNÇÕES 'CUSTOM' CONCLUA OS DESAFIOS ABAIXO: */

// 1 - Crie um algoritmo que encontre o único pais do continente Africano
const paisAfricano = olympicsMedalTable.customFind(element => element.continent === "AFRICA").country
console.log(paisAfricano);

// 2 - Crie um algoritmo que retorne o total de medalhas por país
const medalhasPorPais = olympicsMedalTable.customReduce((medalsPerContinent, element) => {
    let totalMedals = element.gold + element.silver + element.bronze

    medalsPerContinent[element.country] = medalsPerContinent[element.country] || []
    medalsPerContinent[element.country].push(totalMedals)

    return medalsPerContinent
}, {})
console.log(medalhasPorPais)

// 3 - Crie um algoritmo para encontrar os países que conquistaram mais que 10 medalhas de ouro
const paisesCom10MedalhasOuroNoMinimo = olympicsMedalTable.customFilter(element => element.gold > 10)
    .customMap(element => element.country)

console.log(paisesCom10MedalhasOuroNoMinimo)

// 4 - Crie um algoritmo para encontrar os países que conquistaram no minímo 30 medalhas (Ouro, Prata e Bronze)
const paisesCom30MedalhasNoMinimo = olympicsMedalTable.customFilter(element => element.gold + element.silver + element.bronze >= 30)
    .customMap(element => element.country)

console.log(paisesCom30MedalhasNoMinimo)

// 5 - Crie um algoritmo para verificar se o continente América do Sul conquistou pelo menos 20 medalhas de ouro
const paisesComPeloMenos20MedalhasDeOUro = olympicsMedalTable.customFilter(i => i.continent === "AMERICA DO SUL")
    .customMap(element => element.gold)
    .customReduce((acc, goldMedalsQuantity) => {
        acc += goldMedalsQuantity

        let isMoreThenTwenty = acc > 20 ? true : false
        return isMoreThenTwenty
    })
console.log(paisesComPeloMenos20MedalhasDeOUro)