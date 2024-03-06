import { useState } from "react";
import { fetchWeather } from "./services/weather.service";
import { WeatherData } from "./types/weather.type";

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
          <div>
            <h2>Погода для города {weatherData.name}:</h2>
            <pre>Температура: {weatherData.main.temp}</pre>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
