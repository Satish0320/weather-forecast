'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function WeatherPage() {
  const { data: session } = useSession();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

  useEffect(() => {
    if (session) {
      fetch('/api/preferences')
        .then(async (res) => {
          if (!res.ok) throw new Error('Failed to fetch preferences');
          return res.json();
        })
        .then((data) => setFavoriteCities(data.preferences?.favoriteCities || []))
        .catch((error) => console.error('Error fetching preferences:', error));
    }
  }, [session]);

  const fetchWeather = async () => {
    try {
      const res = await fetch(`/api/weather?city=${city}`);
      if (!res.ok) throw new Error('Weather API request failed');
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const savePreferences = async () => {
    await fetch('/api/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favoriteCities: [...favoriteCities, city] }),
    });
    setFavoriteCities([...favoriteCities, city]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Weather Forecast</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border rounded"
      />
      <button onClick={fetchWeather} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Get Weather
      </button>

      {weather && (
        <div className="mt-4">
          <h2 className="text-xl">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <button onClick={savePreferences} className="mt-2 p-2 bg-green-500 text-white rounded">
            Save to Favorites
          </button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl">Favorite Cities</h2>
        <ul>
          {favoriteCities.map((city, index) => (
            <li key={index}>{city}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}