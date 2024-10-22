import axiosClient from "api/axiosClient";

const weatherForecastApi = {
    getWeatherForecast() {
        const url = "/weather-forecast/get-weather-forecast";
        return axiosClient.get(url);
    }
}

export default weatherForecastApi;