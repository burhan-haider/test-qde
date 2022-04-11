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
    modules: [
        {
            moduleCode: 'onlineScanning',
            moduleName: 'Online Scanning',
            moduleDescription: 'Online Scanning',
            linkShown: false,
            orderNo: 0,
            icon: 'onlineScanning',
            moduleChartDetails: null,
            enabled: false,
            subModulesList: [],
            hasChildren: true,
            url: null,
            presentationCategory: null,
            uniqueNo: '62531d92-f087-3ded-8d2e-8ccd16ec7187',
            selected: false,
            parentModuleId: null,
            parentModuleCode: null,
        },
        {
            moduleCode: 'realTimeScanning',
            moduleName: 'RealTime Scanning',
            moduleDescription: 'RealTime Scanning',
            linkShown: false,
            orderNo: 0,
            icon: 'rtScanning',
            moduleChartDetails: null,
            enabled: false,
            subModulesList: [],
            hasChildren: true,
            url: null,
            presentationCategory: null,
            uniqueNo: '8c41285e-21c1-36ff-bbc8-beb1e5ca66e2',
            selected: false,
            parentModuleId: "62531d92-f087-3ded-8d2e-8ccd16ec7187",
            parentModuleCode: 'onlineScanning',
        },
        {
            moduleCode: 'homeLoan',
            moduleName: 'Home Loan',
            moduleDescription: 'Home Loan Dashboard',
            linkShown: false,
            orderNo: 0,
            icon: null,
            moduleChartDetails: {},
            enabled: false,
            subModulesList: [],
            hasChildren: false,
            url: null,
            presentationCategory: null,
            uniqueNo: '1e32bac5-6985-3c4d-8e4a-aecc6bc471ea',
            selected: false,
            parentModuleId: null,
            parentModuleCode: null,
        },
        {
            moduleCode: 'personalLoan',
            moduleName: 'Personal Loan',
            moduleDescription: 'Personal Loan Dashboard',
            linkShown: false,
            orderNo: 0,
            icon: null,
            moduleChartDetails: {},
            enabled: false,
            subModulesList: [],
            hasChildren: false,
            url: null,
            presentationCategory: null,
            uniqueNo: '5066fe4b-20d4-35a0-981d-e5327ec926df',
            selected: false,
            parentModuleId: null,
            parentModuleCode: null,
        },
        {
            moduleCode: 'autoLoan',
            moduleName: 'Auto Loan',
            moduleDescription: 'Auto Loan Dashboard',
            linkShown: false,
            orderNo: 0,
            icon: null,
            moduleChartDetails: {},
            enabled: false,
            subModulesList: [],
            hasChildren: false,
            url: null,
            presentationCategory: null,
            uniqueNo: '64f87f08-4b26-3bf6-b922-8ea5cec9eeda',
            selected: false,
            parentModuleId: null,
            parentModuleCode: null,
        },
        {
            moduleCode: 'oldasLoan',
            moduleName: 'Oldas Loan',
            moduleDescription: 'Oldas Loan Dashboard',
            linkShown: false,
            orderNo: 0,
            icon: null,
            moduleChartDetails: {},
            enabled: false,
            subModulesList: [],
            hasChildren: false,
            url: null,
            presentationCategory: null,
            uniqueNo: '73bc1e7a-9df9-3800-86bb-7a4ada63d563',
            selected: false,
            parentModuleId: null,
            parentModuleCode: null,
        }
    ],

    
    newFeatures: {
        userFeatures: [
            {
                featureCode: 'dashboard',
                featureName: 'Dashboard',
                orderNo: 1,
                icon: 'MdDashboard',
                mainModulesList: ['dashboard', 'homeLoan', 'personalLoan', 'autoLoan', 'oldasLoan',],
            },
            {
                featureCode: 'scanning',
                featureName: 'Scanning',
                orderNo: 2,
                icon: 'MdRadar',
                mainModulesList: ['scanning', 'onlineScanning'],
            },
            {
                featureCode: 'actionManagement',
                featureName: 'Action Management',
                orderNo: 3,
                icon: 'MdAccessTime',
                mainModulesList: [],
            },
            {
                featureCode: 'scenarioManagement',
                featureName: 'Scenario Management',
                orderNo: 3,
                icon: 'MdAssignment',
                mainModulesList: [],
            },
            {
                featureCode: 'reportManagement',
                featureName: 'Reports Management',
                orderNo: 3,
                icon: 'MdDescription',
                mainModulesList: [],
            },
            {
                featureCode: 'labelsManagement',
                featureName: 'Labels',
                orderNo: 4,
                icon: 'MdLabel',
                mainModulesList: [],
            },
            {
                featureCode: 'userAccessManagement',
                featureName: 'User Access',
                orderNo: 4,
                icon: 'MdLock',
                mainModulesList: [],
            },
            {
                featureCode: 'featuresManagement',
                featureName: 'Features',
                orderNo: 5,
                icon: 'MdTab',
                mainModulesList: [],
            },
        ],
        featureCode: 'dashboard',
        features: [
            {
                featureCode: 'dashboard',
                modules: [
                    {
                        moduleCode: 'homeLoan',
                        moduleName: 'Home Loan',
                        moduleDescription: 'Home Loan Dashboard',
                        linkShown: false,
                        orderNo: 0,
                        icon: null,
                        moduleChartDetails: {},
                        enabled: false,
                        subModulesList: [],
                        hasChildren: false,
                        url: null,
                        presentationCategory: null,
                        uniqueNo: '1e32bac5-6985-3c4d-8e4a-aecc6bc471ea',
                        selected: false,
                        parentModuleId: null,
                        parentModuleCode: null,
                    },
                    {
                        moduleCode: 'personalLoan',
                        moduleName: 'Personal Loan',
                        moduleDescription: 'Personal Loan Dashboard',
                        linkShown: false,
                        orderNo: 0,
                        icon: null,
                        moduleChartDetails: {},
                        enabled: false,
                        subModulesList: [],
                        hasChildren: false,
                        url: null,
                        presentationCategory: null,
                        uniqueNo: '5066fe4b-20d4-35a0-981d-e5327ec926df',
                        selected: false,
                        parentModuleId: null,
                        parentModuleCode: null,
                    },
                    {
                        moduleCode: 'autoLoan',
                        moduleName: 'Auto Loan',
                        moduleDescription: 'Auto Loan Dashboard',
                        linkShown: false,
                        orderNo: 0,
                        icon: null,
                        moduleChartDetails: {},
                        enabled: false,
                        subModulesList: [],
                        hasChildren: false,
                        url: null,
                        presentationCategory: null,
                        uniqueNo: '64f87f08-4b26-3bf6-b922-8ea5cec9eeda',
                        selected: false,
                        parentModuleId: null,
                        parentModuleCode: null,
                    },
                    {
                        moduleCode: 'oldasLoan',
                        moduleName: 'Oldas Loan',
                        moduleDescription: 'Oldas Loan Dashboard',
                        linkShown: false,
                        orderNo: 0,
                        icon: null,
                        moduleChartDetails: {},
                        enabled: false,
                        subModulesList: [],
                        hasChildren: false,
                        url: null,
                        presentationCategory: null,
                        uniqueNo: '73bc1e7a-9df9-3800-86bb-7a4ada63d563',
                        selected: false,
                        parentModuleId: null,
                        parentModuleCode: null,
                    }
                ],
                openTabs: [],
                breadCrumbs: [{id: 'dashboard', label: 'Dashboard', level: 0}],
                selectedModule: 'dashboard',
            },
        ],
    },
    mainFeatures: {
        userFeatures: [
            {
                featureCode: 'dashboard',
                featureName: 'Dashboard',
                orderNo: 1,
                icon: 'dashboard',
                mainModulesList: null,
                
            },
            {
                featureCode: 'scanning',
                featureName: 'Scanning',
                orderNo: 2,
                icon: 'scanner',
                mainModulesList: null,
            },
        ],
        features: [
            {
                featureCode: 'dashboard',
                modules: [
                    {
                        moduleCode: 'homeLoan',
                        moduleName: 'Home Loan',
                        moduleDescription: 'Home Loan Dashboard',
                        linkShown: false,
                        orderNo: 0,
                        icon: null,
                        moduleChartDetails: {},
                        enabled: false,
                        subModulesList: [],
                        hasChildren: false,
                        url: null,
                        presentationCategory: null,
                        uniqueNo: '1e32bac5-6985-3c4d-8e4a-aecc6bc471ea',
                        selected: false,
                        parentModuleId: null,
                        parentModuleCode: null,
                    },
                    {
                        moduleCode: 'personalLoan',
                        moduleName: 'Personal Loan',
                        moduleDescription: 'Personal Loan Dashboard',
                        linkShown: false,
                        orderNo: 0,
                        icon: null,
                        moduleChartDetails: {},
                        enabled: false,
                        subModulesList: [],
                        hasChildren: false,
                        url: null,
                        presentationCategory: null,
                        uniqueNo: '5066fe4b-20d4-35a0-981d-e5327ec926df',
                        selected: false,
                        parentModuleId: null,
                        parentModuleCode: null,
                    },
                ],
                showRoot: false,
                showModule: null,

            },
            {
                featureCode: 'scanning',
                modules: [
                    {
                        moduleCode: 'onlineScanning',
                        moduleName: 'Online Scanning',
                        moduleDescription: 'Online Scanning',
                        linkShown: false,
                        orderNo: 0,
                        icon: 'onlineScanning',
                        moduleChartDetails: null,
                        enabled: false,
                        subModulesList: [],
                        hasChildren: true,
                        url: null,
                        presentationCategory: null,
                        uniqueNo: '62531d92-f087-3ded-8d2e-8ccd16ec7187',
                        selected: false,
                        parentModuleId: null,
                        parentModuleCode: null,
                    },
                    {
                        moduleCode: 'realTimeScanning',
                        moduleName: 'RealTime Scanning',
                        moduleDescription: 'RealTime Scanning',
                        linkShown: false,
                        orderNo: 0,
                        icon: 'rtScanning',
                        moduleChartDetails: null,
                        enabled: false,
                        subModulesList: [],
                        hasChildren: true,
                        url: null,
                        presentationCategory: null,
                        uniqueNo: '8c41285e-21c1-36ff-bbc8-beb1e5ca66e2',
                        selected: false,
                        parentModuleId: "62531d92-f087-3ded-8d2e-8ccd16ec7187",
                        parentModuleCode: 'onlineScanning',
                    },
                ],
                showRoot: false,
                showModule: '62531d92-f087-3ded-8d2e-8ccd16ec7187',
            }
        ],
        featureCode: 'dashboard',
        tabBarFeatures: [
            {
                featureCode: 'dashboard',
                modulesTrail: [
                    {
                        root: true,
                        code: 'dashboard',
                        label: 'Dashboard',
                        id: 'dashboard',
                    },
                ],
                lastSelected: null,
                lastDeleted: [],
            },
            {
                featureCode: 'scanning',
                modulesTrail: [
                    {
                        root: true,
                        code: 'scanning',
                        label: 'Scanning',
                        id: 'scanning',
                    },
                    {
                        root: false,
                        code: 'onlineScanning',
                        label: 'Online Scanning',
                        id: '62531d92-f087-3ded-8d2e-8ccd16ec7187'
                    }
                ],
                lastSelected: '62531d92-f087-3ded-8d2e-8ccd16ec7187',
                lastDeleted: []
            }
        ],
        breadCrumsModules: [
            {
                root: true,
                code: 'scanning',
                label: 'Scanning',
                id: 'scanning',
            },
            {
                root: false,
                code: 'onlineScanning',
                label: 'Online Scanning',
                id: '62531d92-f087-3ded-8d2e-8ccd16ec7187'
            }
        ],
        success: true,
        pinnedModules: [
            {
                moduleCode: 'realTimeScanning',
                moduleName: 'RealTIme Scanning',
                uniqueNo: '8c41285e-21c1-36ff-bbc8-beb1e5ca66e2',
                featureCode: 'scanning',
                parentList: [
                    {
                        moduleCode: 'onlineScanning',
                        moduleName: 'Online Scanning',
                        uniqueNo: '62531d92-f087-3ded-8d2e-8ccd16ec7187',
                        root: false,
                        hasChildren: true,
                        url: null,
                        presentationCategory: null,
                        selected: false,
                        parentModuleId: null,
                    },
                    {
                        moduleCode: 'realTimeScanning',
                        moduleName: 'RealTime Scanning',
                        uniqueNo: '8c41285e-21c1-36ff-bbc8-beb1e5ca66e2',
                        root: false,
                        hasChildren: false,
                        url: '/api/scanning/rtScanning',
                        presentationCategory: 'rtScanning',
                        selected: false,
                        parentModuleId: '62531d92-f087-3ded-8d2e-8ccd16ec7187',
                    }
                ]
            },
            {
                moduleCode: 'offlineAlerts',
                moduleName: 'Offline Alerts',
                uniqueNo: '71b8e8b6-e6d3-3662-aa45-f4c59c9a5668',
                featureCode: 'scenarioManagement',
                parentList: [
                    {
                        moduleCode: 'scenarios',
                        moduleName: 'Scenarios',
                        uniqueNo: '29f1f50a-b117-3150-a26f-56d9bc43b0ee',
                        root: false,
                        hasChildren: true,
                        url: null,
                        presentationCategory: null,
                        selected: false,
                        parentModuleId: null,
                    },
                    {
                        moduleCode: 'offlineAlerts',
                        moduleName: 'Offline Alerts',
                        uniqueNo: '71b8e8b6-e6d3-3662-aa45-f4c59c9a5668',
                        root: false,
                        hasChildren: false,
                        url: '/api/scenario/OfflineAlerts',
                        presentationCategory: 'allScenarios',
                        selected: false,
                        parentModuleId: '29f1f50a-b117-3150-a26f-56d9bc43b0ee'
                    }
                ]
            }
        ],
        refreshModule: null,
    },
    selectedFeature: 'dashboard',
    openFeatures: [],
    pinnedModules: [],
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