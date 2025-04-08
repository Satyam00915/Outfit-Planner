import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, CloudRain, Snowflake, Zap, Cloud } from "lucide-react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [city, setCity] = useState("London");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d4df89909ed32e56b356c75f00abc8d&units=metric`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      fetchOutfits(data.weather[0].main);
    } catch (error) {
      console.error("Error fetching weather data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOutfits = (weather) => {
    const outfitSuggestions = {
      Clear: ["T-shirt", "Shorts", "Sunglasses"],
      Clouds: ["Sweater", "Jeans"],
      Rain: ["Raincoat", "Boots", "Umbrella"],
      Snow: ["Winter Coat", "Gloves", "Scarf"],
      Thunderstorm: ["Jacket", "Boots", "Rain Pants"],
    };
    setOutfits(outfitSuggestions[weather] || ["Casual Outfit"]);
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return <Sun className="text-yellow-300 w-8 h-8" />;
      case "Clouds":
        return <Cloud className="text-gray-300 w-8 h-8" />;
      case "Rain":
        return <CloudRain className="text-blue-400 w-8 h-8" />;
      case "Snow":
        return <Snowflake className="text-cyan-200 w-8 h-8" />;
      case "Thunderstorm":
        return <Zap className="text-purple-400 w-8 h-8" />;
      default:
        return <Cloud className="text-gray-400 w-8 h-8" />;
    }
  };

  return (
    <div className="App bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen flex flex-col items-center p-6 font-sans text-white">
      <motion.h1
        className="text-5xl font-extrabold mb-10 text-center text-indigo-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🧥 Outfit Planner
      </motion.h1>

      <motion.div
        className="flex mb-6 gap-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          className="p-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-64 shadow-lg placeholder-gray-400 text-white"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button
          onClick={getWeather}
          className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition shadow-md"
        >
          Get Weather
        </button>
      </motion.div>

      {loading && (
        <p className="text-xl text-indigo-400 animate-pulse">
          Fetching the fashion vibes...
        </p>
      )}

      {weatherData && !loading && (
        <motion.div
          className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              {weatherData.name}
            </h2>
            {getWeatherIcon(weatherData.weather[0].main)}
          </div>
          <p className="text-gray-300 capitalize">
            {weatherData.weather[0].description}
          </p>
          <p className="text-gray-400 mt-2">
            🌡️ Temp: {weatherData.main.temp}°C
          </p>
          <p className="text-gray-400">
            💧 Humidity: {weatherData.main.humidity}%
          </p>

          <h3 className="mt-6 text-lg font-semibold text-indigo-400">
            Suggested Outfits:
          </h3>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            {outfits.map((item, index) => (
              <li key={index} className="text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <footer className="mt-10 text-gray-500 text-lg">
        👤 Bhupendra Sirvi | Reg No: 12306033
      </footer>
    </div>
  );
}

export default App;
