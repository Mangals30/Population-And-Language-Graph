const popButton = document.querySelector('.population')
const langButton = document.querySelector('.languages')
const noOfCount = document.querySelector('.no-of-count')
const subTitle = document.querySelector('.subtitle')
const feedBack = document.querySelector('.feedback')
const most = document.querySelector('.most')
noOfCount.textContent = countries.length
const graphWrapper = document.querySelector('.graph-wrapper')
const worldDiv = document.querySelector('.world-div')

/*Ten most spoken languages*/ 
const tenSpokenLanguages = (countries) => {
const allLangArrs = countries.map(country => country.languages)
const allLangsArr = [].concat.apply([],allLangArrs)
const langSet = new Set (allLangsArr)
const uniqueLang = Array.from(langSet)
const langCount =[]
for (const lang of uniqueLang) {
    let counter =0
    for (const country of countries) {
        if(country.languages.includes(lang)) {
            counter ++
        }
    }
    langCount.push({language : lang, counts: counter})
}
langCount.sort((a,b) => {
    if (a.counts < b.counts) return 1
    if (a.counts > b.counts) return -1
    return 0
})
const tenLang = langCount.slice(0,10)
return (tenLang)
}
/****************************************************************** */


const tenPopulatedCountries = countries => {
    const populationObj = []
    populationArr = countries.map(country => country.population)
    populationArr.sort((a,b) => a-b)
    populationArr.reverse()
    const tenPopulatedArr = populationArr.slice(0,10)
    for (const population of tenPopulatedArr) {
        for (const country of countries) {
            if(country.population == population) {
                 populationObj.push({country:country.name, population:country.population})
            }
        }
    }
    return populationObj
}

const getTotalPopulation = countries => {
    const popArray = countries.map(country => country.population)
    const sumOfPop = popArray.reduce((accum,current) => accum + current)
    return sumOfPop

}

const getPopWidth = (population) => {
    const totalPopulation = getTotalPopulation(countries)
    const totalWidth = 30
    const width = (population * totalWidth) / totalPopulation
    return width
}
const getLangWidth = number => {

    const totalNumber = 100
    const totalWidth = 30
    const width = (number * totalWidth) / totalNumber
    return width

}

const displayPopulation = () => {
    const populatedArr = tenPopulatedCountries(countries)
    const totalPop = getTotalPopulation(countries)
    //const popArray = populatedArr.map(country => country.population)
    //const sumOfPop = popArray.reduce((accum,current) => accum + current)

    feedBack.style.display = 'block'
    most.textContent = 'populated countries'
    graphWrapper.textContent = ''

    const worldDiv = document.createElement('div')
    const worldDiv1 = document.createElement('div')
    const world = document.createElement('div')
    const worldDiv2 = document.createElement('div')
    worldDiv.setAttribute('class','worldDiv')
    worldDiv1.setAttribute('class','worldDiv1')
    world.setAttribute('class','world')
    worldDiv2.setAttribute('class','worldDiv2')
    worldDiv1.textContent = 'World'
    worldDiv2.textContent = totalPop
    worldDiv.appendChild(worldDiv1)
    worldDiv.appendChild(world)
    worldDiv.appendChild(worldDiv2)
    graphWrapper.appendChild(worldDiv)
    for (const count of populatedArr) {
        
        const mainDiv = document.createElement('div')
        mainDiv.setAttribute('class','mainDiv')
        mainDiv.style.display = 'flex'
        const div1 = document.createElement('div')
        const subDiv = document.createElement('div')
        const div2 = document.createElement('div')
        const div3 = document.createElement('div')
        div1.setAttribute('class','div1')
        subDiv.setAttribute('class','subDiv')
        div2.setAttribute('class','div2')
        div3.setAttribute('class','div3')
        let country= count.country
        let population = count.population
        div3.style.width = getPopWidth(population) + 'rem'
        subDiv.appendChild(div3)
        div1.textContent = country
        div2.textContent = population
        mainDiv.appendChild(div1)
        mainDiv.appendChild(subDiv)
        mainDiv.appendChild(div2)
        graphWrapper.appendChild(mainDiv)
    }
}

const displayLanguages = () => {
    const languageArr = tenSpokenLanguages(countries)
    console.log(languageArr)
    feedBack.style.display = 'block'
    most.textContent = 'spoken languages'
    graphWrapper.textContent = ''

    for (const count of languageArr) {
        
        const mainDiv = document.createElement('div')
        mainDiv.setAttribute('class','mainDiv')
        mainDiv.style.display = 'flex'
        const div1 = document.createElement('div')
        const subDiv = document.createElement('div')
        const div2 = document.createElement('div')
        const div3 = document.createElement('div')
        div1.setAttribute('class','div1')
        subDiv.setAttribute('class','subDiv')
        div2.setAttribute('class','div2')
        div3.setAttribute('class','div3')
        let language= count.language
        let number = count.counts
        div3.style.width = getLangWidth(number) + 'rem'
        subDiv.appendChild(div3)
        div1.textContent = language
        div2.textContent = number
        mainDiv.appendChild(div1)
        mainDiv.appendChild(subDiv)
        mainDiv.appendChild(div2)
        graphWrapper.appendChild(mainDiv)
    }



}

popButton.addEventListener('click', event => {

    displayPopulation()

})

langButton.addEventListener('click', event => {

    displayLanguages()

})