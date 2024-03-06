import axios from "axios";
import { WeatherData } from "../types/weather.type";

class FetchWeather {
  private BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  private API_KEY = "0ad3df4030a233c298c8cf93b05395a7";

  async fetchDefaultWeather(): Promise<WeatherData> {
    const { data } = await axios.get(
      `${this.BASE_URL}?q=Ivanovo&appid=${this.API_KEY}&lang=ru`
    );
    return data;
  }
  async fetchWeatherByCity(city: string): Promise<WeatherData> {
    const { data } = await axios.get(
      `${this.BASE_URL}?q=${city}&appid=${this.API_KEY}&lang=ru`
    );
    return data;
  }
}

export const fetchWeather = new FetchWeather();
