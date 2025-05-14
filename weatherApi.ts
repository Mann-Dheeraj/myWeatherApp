const API_KEY = '2fd171e692951aa394c06f4aee77b286';

export const getWeatherByCity = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('City not found or API error');
  }

  return response.json();
};
