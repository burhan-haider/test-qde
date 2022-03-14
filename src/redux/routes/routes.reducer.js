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
} from "./routes.types";

const initialState = {
    mainRoute: '111',
    features: [
        {
            id: '111',
            name: 'Home',
            icon: 'MdHome',
            subFeatures: [
                {
                    id: '111a',
                    name: 'Home Module One',
                },
                {
                    id: '111b',
                    name: 'Home Module Two',
                }
            ],
            mapTrail: [{id: '111', name: 'Home'},],
            openTabs: [{id: '111', name: 'Home'},],
            selectedTab: '111',
        },
        {
            id: '222',
            name: 'Screening',
            icon: 'MdSettings',
            subFeatures: [
                {
                    id: '222a',
                    name: 'Screening Module One',
                },
                {
                    id: '222b',
                    name: 'Screening Module Two',
                }
            ],
            mapTrail: [{id: '222', name: 'Screening'}],
            openTabs: [{id: '222', name: 'Screening'}],
            selectedTab: '222',
        },
        {
            id: '333',
            name: 'Utilities',
            icon: 'MdSettings',
            subFeatures: [
                {
                    id: '333a',
                    name: 'Utilities Module One',
                },
                {
                    id: '333b',
                    name: 'Utilities Module Two',
                }
            ],
            mapTrail: [{id: '333', name: 'Utilities'}],
            openTabs: [{id: '333', name: 'Utilities'}],
            selectedTab: '333',
        },
    ],
    selectedFeature: '',
    openFeatures: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
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