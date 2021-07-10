const createStyle = (primary, secondary, message, msg) => {
  primary.style.background = '#5bbc7a'
  secondary.style.background = '#f2a93b'
  message.textContent = msg
}

const createGraph = (displayGrid, text, population, width) => {
  const worldDiv = document.createElement('div')
  worldDiv.className = 'population-div'
  worldDiv.textContent = text
  const mainDiv = document.createElement('div')
  mainDiv.className = 'main-bar'
  const subDiv = document.createElement('div')
  subDiv.className = 'sub-bar'
  subDiv.style.width = `${width}%`
  mainDiv.appendChild(subDiv)
  const totalDiv = document.createElement('div')
  totalDiv.textContent = population
  totalDiv.className = 'population-div'
  displayGrid.appendChild(worldDiv)
  displayGrid.appendChild(mainDiv)
  displayGrid.appendChild(totalDiv)
}

const populationGraph = (countries) => {
  createStyle(population, languages, message, '10 Most Populated Countries In The World')
  const countriesObj = [...countries]
  const allPopulation = countriesObj.map(country => country.population)
  const totalPopulation = allPopulation.reduce((acc, curr) => acc + curr)
  countriesObj.sort((a, b) => {
    if (a.population < b.population) return 1
    if (a.population > b.population) return -1
  })
  createGraph(displayGrid, 'World', totalPopulation, 100)
  const sortedCountries = countriesObj.splice(0, 10)
  for (const country of sortedCountries) {
    let countryName = country.name
    if (country.name == 'United States of America') {
      countryName = 'USA'
    }
    if (country.name == 'Russian Federation') {
      countryName = 'Russia'
    }
    let width = (country.population / totalPopulation) * 100
    createGraph(displayGrid, countryName, country.population, width)
  }
}