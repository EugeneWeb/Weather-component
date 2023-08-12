import { getMathSign } from "./getMathSign.js";


async function setWeatherInfo(id) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?id=${id}&lang=ru&units=metric&APPID=c6e360ac45133d2870055247aaa53ce3`
        );

        if (!response.ok) {
            throw new Error(
                `Error: request status: ${response.status} request text:${response.text}`
            );
        }

        const weather = await response.json();

        const temp = Math.round(weather.main.temp)
        const tempFeelLike = Math.round(weather.main.feels_like)

        const descClouds = weather.weather[0].description

        const weatherInfo = {
            city: weather.name,
            temp: `${getMathSign(temp)}${temp}°`,
            descClouds: `${descClouds[0].toUpperCase()}${descClouds.substring(1)}`,
            feelLike: `${getMathSign(tempFeelLike)}${tempFeelLike}°`,
            wind: Math.round(weather.wind.speed),
            humidity: weather.main.humidity,
            pressure: Math.round(+weather.main.pressure * 0.75),
        }

        return weatherInfo

        // setWeather(weather)
    } catch (error) {
        console.log(error);
    }
}

export {setWeatherInfo};
