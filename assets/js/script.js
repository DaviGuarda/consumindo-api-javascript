const key = 'b08ee7cbec5c78130b12e73014382d4d';
const cityInput = document.querySelector('.input-city');
const city = cityInput.value

const divContainerMedium = document.querySelector('.container-medium')
const divContainerSmaller = document.querySelector('.container-smaller')

function createP() {
  const p = document.createElement('p')
  return p
}

function createH2() {
  const h2 = document.createElement('h2')
  return h2
}

function createImg() {
  const img = document.createElement('img')
  return img
}

function formattedData(data) {

  //Creating h2 tag, to send the data on the screen
  const h2 = createH2()
  divContainerMedium.innerHTML = ''
  h2.innerHTML = `Time in ${data.name}`
  h2.classList.add('city')
  divContainerMedium.appendChild(h2)

  //Creating p tag, to send the data on the screen
  const pTemperature = createP()
  pTemperature.innerHTML = `${Math.ceil(data.main.temp)}°C`
  pTemperature.classList.add('temperature')
  divContainerMedium.appendChild(pTemperature)

  //Creating img tag, to send the data on the screen
  while (divContainerSmaller.firstChild) {
    divContainerSmaller.removeChild(divContainerSmaller.firstChild);
  }
  divContainerMedium.appendChild(divContainerSmaller)
  const imgForecast = createImg()
  imgForecast.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  imgForecast.classList.add('img-forecast-of-time')
  divContainerSmaller.appendChild(imgForecast)

  //Creating p tag, to send the data on the screen
  const pTextForecast = createP()
  pTextForecast.innerHTML = `${data.weather[0].description}`
  pTextForecast.classList.add('text-forecast')
  divContainerSmaller.appendChild(pTextForecast)

  //Creating p tag, to send the data on the screen
  const pMoisture = createP()
  pMoisture.innerHTML = `Moisture: ${data.main.humidity}%`
  pMoisture.classList.add('moisture')
  divContainerMedium.appendChild(pMoisture)
}

async function searchCity(city) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${key}&lang=pt_br&units=metric`
  ).then((response) => response.json());
  console.log(data)
  formattedData(data)
}

document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('submit')) {
    (function () {
      searchCity(city);
    })()
  }
})

cityInput.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    searchCity(city);
  }
})