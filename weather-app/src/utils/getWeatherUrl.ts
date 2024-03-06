const getWeatherUrl = (icon: string) => {
  return `http://openweathermap.org/img/w/${icon}.png`;
};

export default getWeatherUrl;
