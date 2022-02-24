import { configureStore } from '@reduxjs/toolkit';
import routeReducer from './actions/storeRoute';

export default configureStore({
    reducer: {
        routes: routeReducer,
    }
})