const citySearchButton = document.querySelector('.city__search > button')
const cityInfo = document.querySelector('.city__info')
const search = document.querySelector('.search')

const btnSubmitSearch = document.querySelector('#btn-submit-search')
const btnCheck = btnSubmitSearch.querySelector('#check')
const btnSpinner = btnSubmitSearch.querySelector('#spinner')

const errorContainer = document.getElementById('search-error')

export const cityName = document.getElementById('city-name')

export const showSearchError = (message, showTime = 3000) => {
  errorContainer.style.display = 'block'
  errorContainer.querySelector('.notification__text').innerHTML = message

  // Hide error message after some time
  setTimeout(() => {
    errorContainer.style.display = 'none'
  }, showTime)
}

export const toggleSearch = () => {
  citySearchButton.classList.toggle('hidden')
  cityInfo.classList.toggle('hidden')
  search.classList.toggle('hidden')
}

export const setSearchActive = (active = false) => {
  btnSubmitSearch.disabled = !active
}

export const renderWeather = (weather) => {
  if ('cod' in weather && weather.cod) {
    showSearchError(weather.message)
    return
  }

  setData(weather, 'temp', (temp) => {
    temp = Math.round(temp)
    document.querySelector('[data-temp]').innerHTML = `${temp}&deg;`
  })

  setData(weather, 'humidity', (humidity) => {
    document.querySelector('[data-humidity]').innerHTML = `${humidity}%`
  })

  setData(weather, 'wind', (wind) => {
    document.querySelector('[data-wind]').innerHTML = `${wind} m/s`
  })

  setData(weather, 'city', (city) => {
    document.querySelector('[data-city]').innerHTML = city
  })

  setData(weather, 'wStatus', (wStatus) => {
    wStatus =
      wStatus.split('')[0].toUpperCase() + wStatus.slice(1, wStatus.length)
    document.querySelector('[data-wStatus]').innerHTML = wStatus
  })

  setData(weather, 'wIcon', (wIcon) => {
    const url = `http://openweathermap.org/img/wn/${wIcon}@4x.png`
    document.querySelector('[data-wIcon]').src = url
  })
}

const setData = (obj, property, callback) => {
  if (property in obj) {
    callback(obj[property])
  } else {
    console.warn(`Object ${obj} doesn't have property ${property}`)
  }
}
