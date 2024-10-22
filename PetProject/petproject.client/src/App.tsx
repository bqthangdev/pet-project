import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import "./App.css";
import Player from "./Player";
import weatherForecastApi from "api/WeatherForecast/weatherForecastApi";
import { useAppSelector, useAppDispatch } from "app/hooks";
import {
    getWeatherForecastList,
    selectWeatherForecast,
} from "features/weatherForecast/weatherForecastSlice";

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

const lngs = {
    vi: { nativeName: "Tiếng Việt" },
    en: { nativeName: "English" },
};

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();

    const dispatch = useAppDispatch();
    const weatherForecastList = useAppSelector(selectWeatherForecast);

    const { t, i18n } = useTranslation();

    useEffect(() => {
        populateWeatherData();

        dispatch(getWeatherForecastList());
    }, [dispatch]);

    const contents =
        forecasts === undefined ? (
            <p>
                <em>
                    Loading... Please refresh once the ASP.NET backend has
                    started. See{" "}
                    <a href="https://aka.ms/jspsintegrationreact">
                        https://aka.ms/jspsintegrationreact
                    </a>{" "}
                    for more details.
                </em>
            </p>
        ) : (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {weatherForecastList.weatherForecast.map((forecast) => (
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <div>
                {Object.keys(lngs).map((lng) => (
                    <button
                        key={lng}
                        style={{
                            fontWeight:
                                i18n.resolvedLanguage === lng
                                    ? "bold"
                                    : "normal",
                        }}
                        type="submit"
                        onClick={() => i18n.changeLanguage(lng)}
                    >
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </div>
            <Trans i18nKey="description.part1">
                Edit <code>src/App.js</code> and save to reload.
            </Trans>
            {t("description.part2")}
            <Player />
        </div>
    );

    async function populateWeatherData() {
        const response = await weatherForecastApi.getWeatherForecast();
        const data = response.data;
        setForecasts(data);
    }
}

export default App;
