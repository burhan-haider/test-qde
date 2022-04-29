import { combineReducers } from "redux";
import featuresReducer from 'redux/features';
import routesReducer from "./routes/routes.reducer";
import authReducer from "./auth";
import message from "./message";
import caseWorkflow from "./caseWorkflow";
import actionMaster from './actionManagement';

const rootReducer = combineReducers({
    features: featuresReducer,
    routes: routesReducer,
    auth: authReducer,
    message: message,
    caseWorkflow: caseWorkflow,
    actionMaster: actionMaster,
});

export default rootReducer;