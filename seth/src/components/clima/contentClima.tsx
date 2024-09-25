import React, { useState } from 'react';
import './weatherMeter.css';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCondition: string;
  rainPercent: number;
}

const WeatherMeter: React.FC = () => {
  const weatherIcons: { [key: string]: string } = {
    Clear: 'iconsClima/sol.png',
    Rain: 'iconsClima/chuva.png',
    Snow: 'iconsClima/neve.png',
    Clouds: 'iconsClima/nublado.png',
  };

  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 25,
    humidity: 60,
    windSpeed: 10,
    weatherCondition: "Neve",
    rainPercent: 10,
  });

  return (
    <div>
      <div className="caixacinza">
        <div className="caixacinzaclaro">
          <div className="weather-container">
            <div className="weather-icon-container">
              <img 
                src={weatherIcons[weatherData.weatherCondition]} 
                alt="Condition Icon" 
                className="condition-icon"
                id={weatherData.weatherCondition.toLowerCase()}
              />
            </div>
            <div className="weather-meter">
              <div className="weather-row">
                <div className="weather-item">
                  <img src="" alt="Temperature Icon" className="temperature-icon" />
                  <p className="weather-data">
                    <span>{weatherData.temperature}°C</span>
                    <span>Temperatura</span>
                  </p>
                </div>
                <div className="weather-item">
                  <p className="weather-data">
                    <span>{weatherData.weatherCondition}</span>
                    <span>Condição</span>
                  </p>
                </div>
              </div>
              <div className="weather-row">
                <div className="weather-item">
                  <img src="" alt="Humidity Icon" className="humidity-icon" />
                  <p className="weather-data">
                    <span>{weatherData.humidity}%</span>
                    <span>Umidade</span>
                  </p>
                </div>
                <div className="weather-item">
                  <img src="" alt="Wind Speed Icon" className="wind-speed-icon" />
                  <p className="weather-data">
                    <span>{weatherData.windSpeed} km/h</span>
                    <span>Vento</span>
                  </p>
                </div>
                <div className="weather-item">
                  <img src="" alt="Rain Percentage Icon" className="rain-percentage-icon" />
                  <p className="weather-data">
                    <span>{weatherData.rainPercent} %</span>
                    <span>Chance de Chuva</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fundinho">.</div>
    </div>
  );
};

export default WeatherMeter;
