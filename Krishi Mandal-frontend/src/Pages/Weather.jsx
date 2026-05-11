import React, { useState } from 'react';
import {
    Cloud,
    Droplets,
    Wind,
    Sun,
    Thermometer,
    CloudRain,
    CloudSnow,
    CloudLightning,
    CloudFog,
    Compass,
    Eye,
    Gauge
} from 'lucide-react';

const Weather = () => {
    const [city, setCity] = useState('Bhopal');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const WEATHER_API_KEY = import.meta.env.VITE_TOMORROW_API_KEY;

    const getWeatherCondition = (code) => {
        const conditions = {
            0: { text: "Unknown", icon: Cloud },
            1000: { text: "Clear", icon: Sun },
            1100: { text: "Mostly Clear", icon: Sun },
            1101: { text: "Partly Cloudy", icon: Cloud },
            1102: { text: "Mostly Cloudy", icon: Cloud },
            1001: { text: "Cloudy", icon: Cloud },
            2000: { text: "Fog", icon: CloudFog },
            2100: { text: "Light Fog", icon: CloudFog },
            4000: { text: "Drizzle", icon: CloudRain },
            4001: { text: "Rain", icon: CloudRain },
            4200: { text: "Light Rain", icon: CloudRain },
            4201: { text: "Heavy Rain", icon: CloudRain },
            5000: { text: "Snow", icon: CloudSnow },
            5001: { text: "Flurries", icon: CloudSnow },
            5100: { text: "Light Snow", icon: CloudSnow },
            5101: { text: "Heavy Snow", icon: CloudSnow },
            6000: { text: "Freezing Drizzle", icon: CloudSnow },
            6001: { text: "Freezing Rain", icon: CloudSnow },
            6200: { text: "Light Freezing Rain", icon: CloudSnow },
            6201: { text: "Heavy Freezing Rain", icon: CloudSnow },
            7000: { text: "Ice Pellets", icon: CloudSnow },
            7101: { text: "Heavy Ice Pellets", icon: CloudSnow },
            7102: { text: "Light Ice Pellets", icon: CloudSnow },
            8000: { text: "Thunderstorm", icon: CloudLightning }
        };
        return conditions[code] || conditions[0];
    };

    const formatTime = (isoString) => {
        if (!isoString) return 'N/A';
        return new Date(isoString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDate = (isoString) => {
        if (!isoString) return 'N/A';
        return new Date(isoString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const getWindDirection = (degrees) => {
        // Convert to number first
        const numDegrees = Number(degrees);

        // Check if the input is a valid number
        if (isNaN(numDegrees)) return 'N/A';

        // Normalize the degrees to be between 0 and 360
        const normalizedDegrees = ((numDegrees % 360) + 360) % 360;

        // Divide the circle into 16 sectors of 22.5 degrees each
        const directions = [
            'N', 'NNE', 'NE', 'ENE',
            'E', 'ESE', 'SE', 'SSE',
            'S', 'SSW', 'SW', 'WSW',
            'W', 'WNW', 'NW', 'NNW'
        ];

        // Calculate the index of the direction
        const index = Math.round(normalizedDegrees / 22.5) % 16;

        return directions[index];
    };

    const fetchWeather = async () => {
        if (!city.trim()) {
            setError('Please enter a location');
            return;
        }
        if (!WEATHER_API_KEY) {
            setError('Missing weather API key configuration');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const response = await fetch(
                `https://api.tomorrow.io/v4/weather/forecast?location=${encodeURIComponent(city)}&apikey=${WEATHER_API_KEY}&timesteps=1d`
            );
            if (!response.ok) {
                throw new Error('Location not found');
            }
            const data = await response.json();
            if (!data?.timelines?.daily?.length) {
                throw new Error('No weather data available');
            }
            setWeather(data);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentWeather = () => {
        return weather?.timelines?.daily?.[0] || null;
    };

    const getValue = (obj, path, defaultValue = 'N/A') => {
        const value = path.split('.').reduce((acc, key) => acc?.[key], obj);
        if (typeof value === 'number') {
            return value.toFixed(1);
        }
        return value ?? defaultValue;
    };

    const currentWeather = getCurrentWeather();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-500 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                {/* Search Section */}
                <div className="mb-8 max-w-md mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Weather Forecast</h1>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter location"
                            className="flex-1 p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                            onClick={fetchWeather}
                            disabled={loading}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                    {loading && <p className="text-center mt-2 text-gray-600">Loading weather data...</p>}
                    {error && <p className="text-center mt-2 text-red-500">{error}</p>}
                </div>

                {currentWeather && (
                    <div className="space-y-8">
                        {/* Current Weather */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">{weather.location.name}</h2>
                                    <div className="flex items-center">
                                        {React.createElement(
                                            getWeatherCondition(currentWeather.values?.weatherCodeMax ??
                                                currentWeather.values?.weatherCode ??
                                                0
                                            ).icon,
                                            { size: 32, className: "mr-2" }
                                        )}
                                        <span className="text-xl">
                                            {getWeatherCondition(currentWeather.values?.weatherCodeMax ??
                                                currentWeather.values?.weatherCode ??
                                                0
                                            ).text}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-5xl font-bold mb-2">
                                        {getValue(currentWeather, 'values.temperatureAvg')}°C
                                    </p>
                                    <p className="text-xl">
                                        H: {getValue(currentWeather, 'values.temperatureMax')}°C
                                        L: {getValue(currentWeather, 'values.temperatureMin')}°C
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Weather Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Sun className="text-blue-600" size={24} />
                                    <span className="font-semibold text-gray-700">Sunrise / Sunset</span>
                                </div>
                                <p className="text-lg text-gray-800">
                                    ↑ {formatTime(getValue(currentWeather, 'values.sunriseTime'))}
                                </p>
                                <p className="text-lg text-gray-800">
                                    ↓ {formatTime(getValue(currentWeather, 'values.sunsetTime'))}
                                </p>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Thermometer className="text-blue-600" size={24} />
                                    <span className="font-semibold text-gray-700">Temperature</span>
                                </div>
                                <p className="text-lg text-gray-800">
                                    Max: {getValue(currentWeather, 'values.temperatureMax')}°C
                                </p>
                                <p className="text-lg text-gray-800">
                                    Min: {getValue(currentWeather, 'values.temperatureMin')}°C
                                </p>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Droplets className="text-blue-600" size={24} />
                                    <span className="font-semibold text-gray-700">Humidity</span>
                                </div>
                                <p className="text-lg text-gray-800">
                                    {getValue(currentWeather, 'values.humidityAvg')}%
                                </p>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Gauge className="text-blue-600" size={24} />
                                    <span className="font-semibold text-gray-700">Pressure</span>
                                </div>
                                <p className="text-lg text-gray-800">
                                    {getValue(currentWeather, 'values.pressureSurfaceLevelAvg')} hPa
                                </p>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Wind className="text-blue-600" size={24} />
                                    <span className="font-semibold text-gray-700">Wind Speed</span>
                                </div>
                                <p className="text-lg text-gray-800">
                                    {getValue(currentWeather, 'values.windSpeedAvg')} m/s
                                </p>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Compass className="text-blue-600" size={24} />
                                    <span className="font-semibold text-gray-700">Wind Direction</span>
                                </div>
                                <p className="text-lg text-gray-800">
                                    {getWindDirection(getValue(currentWeather, 'values.windDirectionAvg'))}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {getValue(currentWeather, 'values.windDirectionAvg')}°
                                </p>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Eye className="text-blue-600" size={24} />
                                    <span className="font-semibold text-gray-700">Visibility</span>
                                </div>
                                <p className="text-lg text-gray-800">
                                    {getValue(currentWeather, 'values.visibilityAvg')} km
                                </p>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    {React.createElement(
                                        getWeatherCondition(currentWeather.values?.weatherCodeMax ??
                                            currentWeather.values?.weatherCode ??
                                            0
                                        ).icon,
                                        { size: 32, className: "text-blue-600" }
                                    )}
                                    <span className="font-semibold text-gray-700">Weather</span>
                                </div>
                                <p className="text-lg text-gray-800">
                                    {getWeatherCondition(currentWeather.values?.weatherCodeMax ??
                                        currentWeather.values?.weatherCode ??
                                        0
                                    ).text}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 5-Day Weather Forecast */}
                {weather && weather.timelines && weather.timelines.daily && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">5-Day Weather Forecast</h2>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {weather.timelines.daily.slice(0, 5).map((day, index) => (
                                <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                                    <p className="text-lg font-bold text-gray-800 mb-2">{formatDate(day.time)}</p>
                                    {React.createElement(
                                        getWeatherCondition(day.values?.weatherCodeMax ?? day.values?.weatherCode ?? 0).icon,
                                        { size: 32, className: "mx-auto text-blue-600" }
                                    )}
                                    <p className="text-lg text-gray-800 mt-2">
                                        {getWeatherCondition(day.values?.weatherCodeMax ?? day.values?.weatherCode ?? 0).text}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        H: {getValue(day, 'values.temperatureMax')}°C L: {getValue(day, 'values.temperatureMin')}°C
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
