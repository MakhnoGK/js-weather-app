import {
  toggleSearch,
  renderWeather,
  cityName,
  setSearchActive
} from './ui.module'
import { fetchWeather } from './weather-service.module'
import '../scss/main.scss'

const state = {
  currentCity: localStorage.getItem('weatherAppCityName')
}

const updateInterval = 1000 * 60 * 5 // 5 min

// Display current city name in search input
cityName.value = state.currentCity

// Get weather data on app starts and the update it
// every @updateInterval time units
;(function updateWeather () {
  fetchWeather(state.currentCity).then((weather) => renderWeather(weather))
  setTimeout(updateWeather, updateInterval)
})()

document
  .getElementById('btn-show-search-form')
  .addEventListener('click', () => {
    toggleSearch()
  })

document.getElementById('form-search').addEventListener('submit', async (e) => {
  e.preventDefault()

  setSearchActive(false)

  const searchFormData = new FormData(e.target)
  const currentCity = searchFormData.get('city-name')

  fetchWeather(currentCity).then((weather) => {
    if (!weather.cod) localStorage.setItem('weatherAppCityName', currentCity)
    setSearchActive(true)
    renderWeather(weather)
    toggleSearch()
  })
})
