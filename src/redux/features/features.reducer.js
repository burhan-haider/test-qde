import {
    FETCH_USER_FEATURES_SUCCESS,
    FETCH_USER_FEATURES_ERROR,
    SET_SELECTED_FEATURE,
    FETCH_FEATURE_MODULES_ERROR,
    FETCH_FEATURE_MODULES_SUCCESS,
    FETCH_MODULE_DATA_ERROR,
    FETCH_MODULE_DATA_SUCCESS,
    SET_SELECTED_MODULE
} from 'redux/features/features.types';
import _ from "lodash";

const initialState = {
    userFeatures: [],
    featureCode: null,
    features: [],
    openFeatures: [],
    pinnedModules: [],
    success: true,
    refreshModule: true,
}

const features = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USER_FEATURES_SUCCESS: 
            return {
                ...state,
                userFeatures: action.payload,
            };

        case FETCH_USER_FEATURES_ERROR:
            return {
                ...state,
                success: false,
            };

        case SET_SELECTED_FEATURE:
            return {
                ...state,
                featureCode: action.payload,
            }

        case FETCH_FEATURE_MODULES_SUCCESS: {
            const { data, featureCode } = action.payload;

            const moduleData = data.map(item => ({
                ...item,
                parentModuleId: null,
            }))

            var stateData = state.features;

            const featureName = state.userFeatures.filter(item => item.featureMapping_Id === featureCode)[0].featureName;
            

            if(state.features.filter(item => item.featureCode === featureCode).length > 0){
                stateData = state.features.map(item => {

                    if(item.featureCode === featureCode){

                        let allModules = [...moduleData, ...item.modules];
                        
                        item.modules = _.unionBy(allModules, "uniqueNo");
                        item.modules = _.uniqBy(allModules, "uniqueNo");

                        item.showRoot = true;
                        item.showModule = featureCode;

                    }
                    return item;
                    
                });
            }
            else{
                stateData = [
                    ...state.features,
                    {
                        featureCode: featureCode,
                        modules: [...moduleData],
                        breadCrumbs:[{
                            id: featureCode, 
                            label: featureName,
                            level: 0,
                        }],
                        openTabs:[],
                        showRoot: true,
                        showModule: featureCode,
                    }
                ]
            }
            return {...state, features: stateData};
        }

        case FETCH_FEATURE_MODULES_ERROR: {
            return{
                ...state,
                success: false,
            }
        }

        case FETCH_MODULE_DATA_SUCCESS: {
            const { data, module_Id, uniqueNo, featureCode } = action.payload;
            const moduleData = data.map(d => ({
                ...d,
                parentModuleId: uniqueNo,
                parentModule_Id: module_Id
            }));
            const showData = state.features.map(f => {
                if (f.featureCode === featureCode) {
                f.showModule = uniqueNo;
                f.showRoot = false;
        
                f.modules.map(z =>
                    z.uniqueNo === uniqueNo ? (z.selected = true) : z.selected
                );
        
                var mergeObj = f.modules.map(
                    obj => moduleData.find(o => o.uniqueNo === obj.uniqueNo) || obj
                );
        
                let finalObjList = [...mergeObj, ...moduleData];
                f.modules = _.unionWith(finalObjList, _.isEqual);
        
                f.modules = _.uniqBy(finalObjList, "uniqueNo");
                }
        
                return f;
            });
        
            return { ...state, features: showData };
        }
        case FETCH_MODULE_DATA_ERROR: 
            return {
                ...state,
                error: action.payload
            };
        
        case SET_SELECTED_MODULE: 
            return {
                ...state,
                features: state.features.map(item => {
                    if (item.featureCode === action.payload.featureCode) {
                        return {
                            ...item,
                            showModule: action.payload.uniqueNo,
                            showRoot: false,
                        }

                    }
                    return item;
                })
            }
        
        default:
            return state;
    }
}

export default features;