import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
// import { createAppSlice } from "features/index";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "app/store";
import weatherForecastApi from "api/WeatherForecast/weatherForecastApi";
import type {
    WeatherForecast,
    WeatherForecastState,
} from "types/WeatherForecast/index";


export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
    weatherForecast: [],
    status: "idle",
} satisfies WeatherForecastState as WeatherForecastState;

export const weatherForecastSlice = createAppSlice({
    name: "weatherForecast",
    initialState,
    reducers: (create: any) => ({
        addWeatherForecast: (
            state: WeatherForecastState,
            action: PayloadAction<WeatherForecast>
        ) => {
            state.weatherForecast.push(action.payload);
        },
        getWeatherForecastList: create.asyncThunk(
            async () => {
                const response = await weatherForecastApi.getWeatherForecast();
                return response.data;
            },
            {
                pending: (state: WeatherForecastState) => {
                    state.status = "loading";
                },
                rejected: (state: WeatherForecastState) => {
                    state.status = "error";
                },
                fulfilled: (
                    state: WeatherForecastState,
                    action: PayloadAction<WeatherForecast[]>
                ) => {
                    state.status = "idle";
                    console.log("set")
                    // state.weatherForecast = [state.weatherForecast, ...action.payload]
                    state.weatherForecast = action.payload;
                },
            }
        ),
    }),
});

const { actions, reducer } = weatherForecastSlice;
export const { addWeatherForecast, getWeatherForecastList } = actions;
export const selectWeatherForecast = (state: RootState) =>
    state.default.weatherForecast;
export default reducer;
