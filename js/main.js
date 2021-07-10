const total = document.querySelector('.total')
const population = document.querySelector('.population')
const languages = document.querySelector('.languages')
const btn = document.querySelector('.btn')
const message = document.querySelector('.message')
const displayGrid = document.querySelector('.display-grid')

total.textContent = countries.length
populationGraph(countries, population, languages, message, '10 Most Populated Countries In The World')

population.addEventListener('click', e => {
  e.preventDefault()
  displayGrid.innerHTML = ''
  populationGraph(countries)
})

languages.addEventListener('click', e => {
  e.preventDefault()
  displayGrid.innerHTML = ''
  createStyle(languages, population, message, '10 Most Spoken Languages In The World')
  const countriesObj = [...countries]
  const langs = []
  const languageObj = []
  for (const country of countriesObj) {
    for (const language of country.languages) {
      langs.push(language)
    }
  }
  const langSet = new Set(langs)
  const allLangs = Array.from(langSet)
  for (const language of allLangs) {
    let count = 0
    for (const country of countriesObj) {
      if (country.languages.includes(language)) {
        count++
      }
    }
    languageObj.push({
      language,
      count
    })
  }
  languageObj.sort((a, b) => {
    if (a.count < b.count) return 1
    if (a.count > b.count) return -1
  })
  const tenLangs = languageObj.splice(0, 10)
  for (const lang of tenLangs) {
    let width = (lang.count / 100) * 100
    createGraph(displayGrid, lang.language, lang.count, width)
  }
})