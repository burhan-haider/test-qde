import { ADD_ROUTE, REMOVE_ROUTE } from "./routes.types";

export const addRoute = (route) => {
    return {
        type: ADD_ROUTE,
        payload: route,
    }
};

export const removeRoute = (route) => {
    return {
        type: REMOVE_ROUTE,
        payload: route,
    }
}

