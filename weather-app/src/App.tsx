import { useEffect, useState } from "react";
import { fetchWeather } from "./services/weather.service";
import { WeatherData } from "./types/weather.type";
import getWeatherUrl from "./utils/getWeatherUrl";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleFetchWeather = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("Введите название города");
      return;
    }
    try {
      const cityData = await fetchWeather.fetchWeatherByCity(inputValue);
      setWeatherData(cityData);
    } catch (error) {
      console.error("Ошибка при получении данных о погоде:", error);
    }
  };
  useEffect(() => {
    const defaultFetchWeather = async () => {
      try {
        const cityData = await fetchWeather.fetchDefaultWeather();
        setWeatherData(cityData);
      } catch (error) {
        console.error("Ошибка при получении данных о погоде:", error);
      }
    };

    defaultFetchWeather();
  }, []);

  return (
    <main className="container">
      <div className="wrapper">
        <form className="wrapper__form" onSubmit={handleFetchWeather}>
          <input
            type="text"
            placeholder="Введите название города"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Узнать погоду</button>
        </form>

        {weatherData && (
          <section className="weather">
            <div className="weather__title">
              <h2>Погода для города {weatherData.name}</h2>
            </div>
            <div className="weather__data">
              <div className="weather__main">
                <img
                  src={getWeatherUrl(weatherData.weather[0].icon)}
                  alt="WeatherIcon"
                />
                <h3>
                  Температура: {Math.floor(weatherData.main.temp - 273.15)}
                  &deg;C
                </h3>
              </div>
              <div className="weather__info">
                <p>Описание: {weatherData.weather[0].description}</p>
                <p>
                  Ощущается как:{" "}
                  {Math.floor(weatherData.main.feels_like - 273.15)}&deg;C
                </p>
                <p>Давление: {weatherData.main.pressure} мм рт. ст.</p>
                <p>Влажность: {weatherData.main.humidity} %</p>
                <p>Скорость ветра: {Math.floor(weatherData.wind.speed)} м/с</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
