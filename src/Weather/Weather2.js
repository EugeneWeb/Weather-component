import './Weather.css'
import { setWeatherInfo } from './modules/setWeatherInfo'
import { cities } from './modules/cities'
import React from 'react'

class Weather2 extends React.Component {
    constructor() {
        super()

        this.timeRef = React.createRef()

        const weatherInfo = {
            city: 'Город',
            temp: '10',
            descClouds: 'Облачно',
            feelLike: '11',
            wind: '1',
            humidity: '1',
            pressure: '750',
        }

        this.state = {weather: weatherInfo}
    }

    componentDidMount() {
        const timeNow = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        this.timeRef.current.textContent = timeNow;

        this.setWeather(cities.samara.id)

        // this.setter = this.setState
        
        // console.log(setWeatherInfo(cities.samara.id, this))
    }

    async setWeather (id)  {
        const result = await setWeatherInfo(id)
        this.setState({weather: result})
    }

    inputHandler = (e) => {
        let objID
        Object.values(cities).forEach((city) => {
            if (e.target.value === city.name) objID = city.id;
        });

        this.setWeather(objID)
    }

    render() {
        return(
            <div className="weather">
                <div className="weather__select-wrap">
                    <select onInput={this.inputHandler} className="weather__select">
                        <option value="Самара">Самара</option>
                        <option value="Москва">Москва</option>
                        <option value="Санкт-Петербург">Санкт-Петербург</option>
                        <option value="Минск">Минск</option>
                        <option value="Пекин">Пекин</option>
                    </select>
                </div>

                <p className="weather__city">{this.state.weather.city}</p>
                <p className="weather__now">Сейчас <span ref={this.timeRef}>13:11</span></p>

                <div className="weather__content">
                    <div className="weather__temp">
                        <p className="weather__temp-value">{this.state.weather.temp}</p>

                        <div className="weather__temp-icon">
                            <img src="./img/partly_cloudy.svg" alt="Сбой при загрузке картинки погоды" />
                        </div>

                        <div className="weather__desc">
                            <p className="weather__desc-clouds">{this.state.weather.descClouds}</p>
                            <p className="weather__feel-like"><span>Ощущается как {this.state.weather.feelLike}</span></p>
                        </div>
                    </div>
                    <div className="weather__info">
                        <p className="weather__info-wind"><span>{this.state.weather.wind}</span> м/с</p>
                        <p className="weather__info-humidity"><span>{this.state.weather.humidity}</span>%</p>
                        <p className="weather__info-pressure"><span>{this.state.weather.pressure}</span> мм. рт. ст.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Weather2