const API_KEY = '';

export const fetchWeather = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&unit=metric&appid=${API_KEY}&lang=pt_br`);
    const data = await response.json();
    return data;
    console.log(data);
  } catch (error) {
    console.error('Erro ao obter os dados do clima:', error);
  }
};

