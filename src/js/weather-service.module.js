const weatherKey = '9188d00383d18b6da47128794ffda043'

export const fetchWeather = async (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherKey}`
  )
    .then((response) => {
      return response.json()
    })
    .then((weatherData) => {
      if (weatherData.cod === '404') {
        return weatherData
      }

      const weather = {
        temp: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        wind: weatherData.wind.speed,
        city: weatherData.name,
        wStatus: weatherData.weather[0].description,
        wIcon: weatherData.weather[0].icon
      }

      return weather
    })
    .catch((error) => console.warn(error))
}
