import featureService from "../../../services/features/featureService";

import commonService from "../../../services/common/commonService";
export const FETCH_FEATURE_MODULES_SUCCESS = "FETCH_FEATURE_MODULES_SUCCESS";
export const FETCH_FEATURE_MODULES_ERROR = "FETCH_FEATURE_MODULES_ERROR";
export const SELECT_SPECIFIC_MODULE = "SELECT_SPECIFIC_MODULE";
export const SHOW_SELECTED_FEATURE = "SHOW_SELECTED_FEATURE";
export const FETCH_MODULE_DATA_SUCCESS = "FETCH_MODULE_DATA_SUCCESS";
export const FETCH_MODULE_DATA_ERROR = "FETCH_MODULE_DATA_ERROR";
export const FETCH_USER_FEATURES_SUCCESS = "FETCH_USER_FEATURES_SUCCESS";
export const FETCH_USER_FEATURES_ERROR = "FETCH_USER_FEATURES_ERROR";
export const PUT_TABBAR_FEATURES = "PUT_TABBAR_FEATURES";
export const SET_LAST_MODULECODE_SUCCESS = "SET_LAST_MODULECODE_SUCCESS";
export const DELETE_TAB_FROM_TABBAR = "DELETE_TAB_FROM_TABBAR";
export const PUT_MAP_CLICK_DATA_IN_FEATURES = "PUT_MAP_CLICK_DATA_IN_FEATURES";
export const SELECT_MODULE_AS_PINNED = "SELECT_MODULE_AS_PINNED";
export const REMOVE_MODULE_AS_PINNED = "REMOVE_MODULE_AS_PINNED";
export const REMOVE_MODULE_FROM_DELETED = "REMOVE_MODULE_FROM_DELETED";
// export const RESET_STATE_AFTER_LOGOUT = "RESET_STATE_AFTER_LOGOUT";
export const PUT_BREADCRUMS_MODULES = "PUT_BREADCRUMS_MODULES";
export const ONCLICK_REFRESH_MODULE = "ONCLICK_REFRESH_MODULE";
export const REMOVE_REFRESH_MODULE = "REMOVE_REFRESH_MODULE";
export const SHOW_DIRECT_FINAL_MODULE = "SHOW_DIRECT_FINAL_MODULE";
export const CLEAR_PINNED_MODULES = "CLEAR_PINNED_MODULES";

export const fetchUserFeature = user => {
  return dispatch => {
    commonService
      .fetchUserFeatures(user)
      .then(data => {
        return dispatch({
          type: FETCH_USER_FEATURES_SUCCESS,
          payload: data
        });
      })
      .catch(err => {
        return dispatch({
          type: FETCH_USER_FEATURES_ERROR
        });
      });
  };
};

export const fetchFeatureModules = featureCode => {
  return dispatch => {
    featureService
      .fetchFeaturesmodulesList(featureCode)
      .then(data => {
        return dispatch({
          type: FETCH_FEATURE_MODULES_SUCCESS,
          payload: { data, featureCode }
        });
      })
      .catch(error => {
        return dispatch({
          type: FETCH_FEATURE_MODULES_ERROR,
          payload: error
        });
      });
  };
};

export const selectSpecificModule = (root, code) => {
  return dispatch => {
    return dispatch({
      type: SELECT_SPECIFIC_MODULE,
      payload: { root, code }
    });
  };
};

export const showSelectedFeaturesModeules = data => {
  return {
    type: SHOW_SELECTED_FEATURE,
    payload: data
  };
};

export const setLastSelectedModule = data => {
  return {
    type: SET_LAST_MODULECODE_SUCCESS,
    payload: { data }
  };
};

export const removeModuleFromDeleted = code => {
  return {
    type: REMOVE_MODULE_FROM_DELETED,
    payload: { code }
  };
};

export const fetchModuleDetails = (url, module_Id, uniqueNo, featureCode) => {
  return dispatch => {
    featureService
      .fetchModuleData(url)
      .then(data => {
        return dispatch({
          type: FETCH_MODULE_DATA_SUCCESS,
          payload: { data, module_Id, uniqueNo, featureCode }
        });
      })
      .catch(err => {
        return dispatch({
          type: FETCH_MODULE_DATA_ERROR,
          payload: err
        });
      });
  };
};

export const putTabBarFeatures = (
  moduleTrail,
  module_Id,
  featureCode,
  uniqueNo
) => {
  return {
    type: PUT_TABBAR_FEATURES,
    payload: { moduleTrail, module_Id, featureCode, uniqueNo }
  };
};

export const putBreadCrumsModules = moduleTrail => {
  return {
    type: PUT_BREADCRUMS_MODULES,
    payload: moduleTrail
  };
};

export const deleteTabFromTabBar = (tabCode, featureCode, tabId) => {
  return dispatch => {
    // dispatch(removeStateFromPersistedStates(module_Id));
    return dispatch({
      type: DELETE_TAB_FROM_TABBAR,
      payload: { tabCode, featureCode, tabId }
    });
  };
};

export const putMapClickedDataInFeatures = data => {
  return {
    type: PUT_MAP_CLICK_DATA_IN_FEATURES,
    payload: data
  };
};
export const selectModuleAsPinned = wholeResponse => {
  return {
    type: SELECT_MODULE_AS_PINNED,
    payload: { wholeResponse }
  };
};
export const removeModuleAsPinned = module => {
  return {
    type: REMOVE_MODULE_AS_PINNED,
    payload: module
  };
};

export const refreshModule = module_Id => {
  return {
    type: ONCLICK_REFRESH_MODULE,
    payload: module_Id
  };
};

export const removerFromRefreshModule = () => {
  return {
    type: REMOVE_REFRESH_MODULE
  };
};

//for mega jump of pinned module or hover modules
export const showDirectFinalModule = (moduledata, featureCode) => {
  return {
    type: SHOW_DIRECT_FINAL_MODULE,
    payload: { moduledata, featureCode }
  };
};

export const clearPinnedModules = () => {
  return {
    type: CLEAR_PINNED_MODULES
  };
};
