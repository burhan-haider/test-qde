import { combineReducers } from "redux";

import routesReducer from "./routes/routes.reducer";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
    routes: routesReducer,
    auth: authReducer,
});

export default rootReducer;