import { combineReducers } from "redux";
import featuresReducer from 'redux/features';
import routesReducer from "./routes/routes.reducer";
import authReducer from "./auth";

const rootReducer = combineReducers({
    features: featuresReducer,
    routes: routesReducer,
    auth: authReducer,
});

export default rootReducer;