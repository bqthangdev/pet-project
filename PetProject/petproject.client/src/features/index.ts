import { combineReducers } from '@reduxjs/toolkit';

import weatherForecastReducer from 'features/weatherForecast/weatherForecastSlice';



export default combineReducers({
    weatherForecast: weatherForecastReducer
})