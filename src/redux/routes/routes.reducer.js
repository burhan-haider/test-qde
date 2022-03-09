import { 
    ADD_ROUTE, 
    REMOVE_ROUTE, 
    SET_MAIN_ROUTE,
    SET_SELECTED_FEATURE,
    SET_SELECTED_SUB_FEATURE,
    ADD_TO_OPEN_TABS,
    REMOVE_FROM_OPEN_TABS,
    ADD_TO_MAP_TRAIL,
    REMOVE_FROM_MAP_TRAIL,
    ADD_TO_OPEN_FEATURES,
    REMOVE_FROM_OPEN_FEATURES,
} from "./routes.types";

const initialState = {
    postRoutes: [
        {name: 'Page One', url: '/page-one'},
    ],
    mainRoute: 0,
    features: [
        {
            id: 1,
            name: 'Feature One',
            subFeatures: [
                {
                    id: 1,
                    name: 'Sub Feature One',
                },
                {
                    id: 2,
                    name: 'Sub Feature Two',
                }
            ],
            mapTrail: ['Sub Feature One',],
            openTabs: [{id: 1, name: 'Sub Feature One'},],
            selectedTab: 1,
        },
        {
            id: 2,
            name: 'Feature Two',
            subFeatures: [
                {
                    id: 1,
                    name: 'Sub Feature One',
                },
                {
                    id: 2,
                    name: 'Sub Feature Two',
                }
            ],
            mapTrail: [],
            openTabs: [],
            selectedTab: 1,
        },
    ],
    selectedFeature: '',
    openFeatures: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ROUTE:
            return {
                ...state, postRoutes: [...state.postRoutes, action.payload],
            };
        case REMOVE_ROUTE:
            return {
                postRoutes: [
                    ...state.postRoutes.filter(item=>item.name !== action.payload.name)
                ],
            };
        case SET_MAIN_ROUTE:
            return {
                ...state, mainRoute: action.payload,
            };
        case SET_SELECTED_FEATURE:
            return {
                ...state, selectedFeature: action.payload,
            };
        case SET_SELECTED_SUB_FEATURE:
            return {
                ...state,
                features: state.features.map(item=>{
                    if (item.id === action.payload.feature) {
                        return {
                            ...item,
                            selectedTab: action.payload.subFeature,
                        }
                    }
                    return item;
                }),
            };
        case ADD_TO_OPEN_TABS:
            return {
                ...state,
                features: state.features.map(item=>{
                    if (item.id === action.payload.feature) {
                        return {
                            ...item,
                            openTabs: [...item.openTabs, action.payload.subFeature],
                        }
                    }
                    return item;
                }),
            };
        case REMOVE_FROM_OPEN_TABS:
            return {
                ...state,
                features: state.features.map(item=>{
                    if (item.id === action.payload.feature) {
                        return {
                            ...item,
                            openTabs: [...item.openTabs.filter(item=>item !== action.payload.subFeature)],
                        }
                    }
                    return item;
                }),
            };
        case ADD_TO_MAP_TRAIL:
            return {
                ...state,
                features: state.features.map(item=>{
                    if (item.id === action.payload.feature) {
                        return {
                            ...item,
                            mapTrail: [...item.mapTrail, action.payload.subFeature],
                        }
                    }
                    return item;
                }),
            };
        case REMOVE_FROM_MAP_TRAIL:
            return {
                ...state,
                features: state.features.map(item=>{
                    if (item.id === action.payload.feature) {
                        return {
                            ...item,
                            mapTrail: [...item.mapTrail.filter(item=>item !== action.payload.subFeature)],
                        }
                    }
                    return item;
                }),
            };
        case ADD_TO_OPEN_FEATURES:
            return {
                ...state,
                openFeatures: [...state.openFeatures, action.payload],
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