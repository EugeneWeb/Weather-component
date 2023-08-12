import './Weather.css'
import { setWeatherInfo } from './modules/setWeatherInfo'
import { cities } from './modules/cities'

import React, { useEffect } from 'react'
import { useState } from 'react'


// В функциональном стиле сложнее: так как сложно добавить функцию, которая бы отрабатывала п
function Weather() {
    const weatherInfo = {
        city: 'Город',
        temp: '10',
        descClouds: 'Облачно',
        feelLike: '11',
        wind: '1',
        humidity: '1',
        pressure: '750',
    }
    
    const [weather, setWeather] = useState(weatherInfo)
    const timeRef = React.createRef()


    useEffect(() => {
        const timeNow = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        timeRef.current.textContent = timeNow;

        setWeatherInfo(cities.samara.id, setWeather)
    })

    function inputHandler(e) {
        let objID
        Object.values(cities).forEach((city) => {
            if (e.target.value === city.name) objID = city.id;
        });

        setWeatherInfo(objID, setWeather)
    }

    return(
        <div className="weather">
            <div className="weather__select-wrap">
                <select onInput={inputHandler} className="weather__select">
                    <option value="Самара">Самара</option>
                    <option value="Москва">Москва</option>
                    <option value="Санкт-Петербург">Санкт-Петербург</option>
                    <option value="Минск">Минск</option>
                    <option value="Пекин">Пекин</option>
                </select>
            </div>

            <p className="weather__city">{weather.city}</p>
            <p className="weather__now">Сейчас <span ref={timeRef}>13:11</span></p>

            <div className="weather__content">
                <div className="weather__temp">
                    <p className="weather__temp-value">{weather.temp}</p>

                    <div className="weather__temp-icon">
                        <img src="./img/partly_cloudy.svg" alt="Сбой при загрузке картинки погоды" />
                    </div>

                    <div className="weather__desc">
                        <p className="weather__desc-clouds">{weather.descClouds}</p>
                        <p className="weather__feel-like"><span>Ощущается как {weather.feelLike}</span></p>
                    </div>
                </div>
                <div className="weather__info">
                    <p className="weather__info-wind"><span>{weather.wind}</span> м/с</p>
                    <p className="weather__info-humidity"><span>{weather.humidity}</span>%</p>
                    <p className="weather__info-pressure"><span>{weather.pressure}</span> мм. рт. ст.</p>
                </div>
            </div>
        </div>
    )
}


export default Weather