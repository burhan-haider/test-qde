import {
    SET_MAIN_ROUTE,
    SET_SELECTED_FEATURE,
    ADD_TO_OPEN_TABS,
    REMOVE_FROM_OPEN_TABS,
    ADD_TO_MAP_TRAIL,
    REMOVE_FROM_MAP_TRAIL,
    ADD_TO_OPEN_FEATURES,
    REMOVE_FROM_OPEN_FEATURES,
    SET_SELECTED_SUB_FEATURE,
} from "./routes.types";

export const setMainRoute = (route) => {
    return {
        type: SET_MAIN_ROUTE,
        payload: route,
    }
};

export const setSelectedFeature = (feature) => {
    return {
        type: SET_SELECTED_FEATURE,
        payload: feature,
    }
};

export const setSelectedSubFeature = (feature, subFeature) => {
    return {
        type: SET_SELECTED_SUB_FEATURE,
        payload: {
            feature,
            subFeature,
        },
    }
};

export const addToOpenTabs = (feature, subFeature) => {
    return {
        type: ADD_TO_OPEN_TABS,
        payload: {
            feature,
            subFeature,
        },
    }
};

export const removeFromOpenTabs = (feature, subFeature) => {
    return {
        type: REMOVE_FROM_OPEN_TABS,
        payload: {
            feature,
            subFeature,
        },
    }
};

export const addToMapTrail = (feature, subFeature) => {
    return {
        type: ADD_TO_MAP_TRAIL,
        payload: {
            feature,
            subFeature,
        },
    }
};

export const removeFromMapTrail = (feature, subFeature) => {
    return {
        type: REMOVE_FROM_MAP_TRAIL,
        payload: {
            feature,
            subFeature,
        },
    }
};

export const addToOpenFeatures = (feature) => {
    return {
        type: ADD_TO_OPEN_FEATURES,
        payload: feature,
    }
};

export const removeFromOpenFeatures = (feature) => {
    return {
        type: REMOVE_FROM_OPEN_FEATURES,
        payload: feature,
    }
};
