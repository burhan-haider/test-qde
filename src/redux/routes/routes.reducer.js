import { 
    SET_MAIN_ROUTE,
    SET_SELECTED_FEATURE,
    SET_SELECTED_SUB_FEATURE,
    ADD_TO_OPEN_TABS,
    REMOVE_FROM_OPEN_TABS,
    ADD_TO_MAP_TRAIL,
    REMOVE_FROM_MAP_TRAIL,
    ADD_TO_OPEN_FEATURES,
    REMOVE_FROM_OPEN_FEATURES,
    ADD_TO_MODULES,
    REMOVE_FROM_MODULES,
    ADD_TO_PINNED_MODULES,
    REMOVE_FROM_PINNED_MODULES,
} from "./routes.types";

const initialState = {
   


};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SET_MAIN_ROUTE:
            return {
                ...state, mainRoute: action.payload,
            };
            // changing the active feature
        case SET_SELECTED_FEATURE:
            return {
                ...state, newFeatures:{...state.newFeatures, featureCode: action.payload},
            };
        case SET_SELECTED_SUB_FEATURE:
            return {
                ...state,
                newFeatures: {...state.newFeatures, features: state.newFeatures.features.map(item=>{
                    if (item.featureCode === action.payload.feature) {
                        return {
                            ...item,
                            selectedModule: action.payload.subFeature,
                        }
                    }
                    return item;
                })},
            };
        
        case ADD_TO_OPEN_TABS:
            return {
                ...state,
                newFeatures: {...state.newFeatures, features: state.newFeatures.features.map(item=>{
                    if (item.featureCode === action.payload.feature) {
                        return {
                            ...item,
                            openTabs: [...item.openTabs, action.payload.subFeature],
                        }
                    }
                    return item;
                })},
            };
        case REMOVE_FROM_OPEN_TABS:
            return {
                ...state,
                newFeatures:{...state.newFeatures, features: state.newFeatures.features.map(item=>{
                    if (item.featureCode === action.payload.feature) {
                        return {
                            ...item,
                            openTabs: [...item.openTabs.filter(item=>item !== action.payload.subFeature)],
                        }
                    }
                    return item;
                })},
            };
        case ADD_TO_MODULES:
            return {
                ...state,
                newFeatures: {...state.newFeatures, features: state.newFeatures.features.map(item=>{
                    if (item.featureCode === action.payload.feature) {
                        return {
                            ...item,
                            modules: [...item.modules, action.payload.subFeature],
                        }
                    }
                    return item;
                })},
            };
        case REMOVE_FROM_MODULES:
            return {
                ...state,
                newFeatures:{...state.newFeatures, features: state.newFeatures.features.map(item=>{
                    if (item.featureCode === action.payload.feature) {
                        return {
                            ...item,
                            modules: [...item.modules.filter(item=>item !== action.payload.subFeature)],
                        }
                    }
                    return item;
                })},
            };
        
        case ADD_TO_MAP_TRAIL:
            return {
                ...state,
                newFeatures: {...state.newFeatures, features: state.newFeatures.features.map(item=>{
                    if (item.featureCode === action.payload.feature) {
                        return {
                            ...item,
                            breadCrumbs: [...item.breadCrumbs, action.payload.subFeature],
                        }
                    }
                    return item;
                })},
            };
        case REMOVE_FROM_MAP_TRAIL:
            return {
                ...state,
                newFeatures:{...state.newFeatures, features: state.newFeatures.features.map(item=>{
                    if (item.featureCode === action.payload.feature) {
                        return {
                            ...item,
                            breadCrumbs: [...item.breadCrumbs.filter(item=>item !== action.payload.subFeature)],
                        }
                    }
                    return item;
                })},
            };
        case ADD_TO_PINNED_MODULES:
            return{
                ...state,
                pinnedModules:[...state.pinnedModules, action.payload],
            }
        case REMOVE_FROM_PINNED_MODULES:
            return{
                ...state,
                pinnedModules:[...state.pinnedModules.filter(item=>item !== action.payload)],
            }
        case ADD_TO_OPEN_FEATURES:
            return {
                ...state,
                newFeatures: {...state.newFeatures, features: [...state.newFeatures.features, action.payload]},
            };
        case REMOVE_FROM_OPEN_FEATURES:
            return {
                ...state,
                openFeatures: [...state.openFeatures.filter(item=>item !== action.payload)],
            };
        default: return state;
    }
}

export default reducer;