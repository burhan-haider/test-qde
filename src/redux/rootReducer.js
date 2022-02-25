import { combineReducers } from "redux";

import routesReducer from "./routes/routes.reducer";

const rootReducer = combineReducers({
    routes: routesReducer,
});

export default rootReducer;