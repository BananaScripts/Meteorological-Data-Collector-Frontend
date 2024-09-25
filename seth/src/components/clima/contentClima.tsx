import React, { useState } from 'react';
import './weatherMeter.css'; // Arquivo CSS para estilização do componente

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCondition: string;
  rainPercent: number; // Adiciona a propriedade rainPercent
}

const WeatherMeter: React.FC = () => {
  // Estado inicial com placeholders
  const weatherIcons: { [key: string]: string } = {
    Clear: 'iconsClima/sol.png',
    Rain: 'iconsClima/chuva.png',
    Snow: 'iconsClima/neve.png',
    Clouds: 'iconsClima/nublado.png',
  };

  const [weatherData] = useState<WeatherData>({
    temperature: 25,    // Placeholder para temperatura (em graus Celsius)
    humidity: 60,       // Placeholder para umidade (em %)
    windSpeed: 10,      // Placeholder para velocidade do vento (em km/h)
    weatherCondition: "Neve", // Placeholder para condição climática
    rainPercent: 10,    // Placeholder para pressão atmosférica (em hPa)
  });

  return (
    <div className="caixacinza">
      <div className="caixacinzaclaro">
        <div className="weather-container">
          {/* Contêiner do ícone de condição climática */}
          <div className="weather-icon-container">
            <img 
              src={weatherIcons[weatherData.weatherCondition]} 
              alt="Condition Icon" 
              className="condition-icon"
              id={weatherData.weatherCondition.toLowerCase()} // Define o ID com base na condição
            />
          </div>

          {/* Contêiner do medidor de clima */}
          <div className="weather-meter">

            {/* Linha 1: Temperatura e Clima */}
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

            {/* Linha 2: Outras Informações */}
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
  );
};

export default WeatherMeter;
