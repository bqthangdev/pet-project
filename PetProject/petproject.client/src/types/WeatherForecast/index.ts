export interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export interface WeatherForecastState {
    weatherForecast: Array<WeatherForecast>;
    status: string;
}