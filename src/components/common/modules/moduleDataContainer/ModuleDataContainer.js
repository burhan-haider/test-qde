import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ModuleComponentConfig from "components/common/modules/moduleDataContainer/ModuleComponentConfig";
import CommonService from "services/common/commonService";
import LinearLoading from "components/common/dataLoading/LinearLoading";
import Error from "components/common/errorPages/Error";

import { removerFromRefreshModule } from "redux/features/features.actions";

export default function ModuleDataContainer(props) {
  const { moduleCode, moduleURL, presentationCategory, moduleId, feature } = props;
  const [indexPageData, setindexPageData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState();
  const [refreshModule, setRefreshModule] = useState(false);
  const [prevModule, setPrevModule] = useState();

  const dispatch = useDispatch();
  //for refreshing current module....
  const moduleToBeRefresh = useSelector(
    module => module.features.features.refreshModule
  );
  useEffect(() => {
    if (moduleToBeRefresh === moduleId) {
      setRefreshModule(true);
      dispatch(removerFromRefreshModule());
    } else {
      setRefreshModule(false);
    }
  }, [dispatch, moduleCode, moduleId, moduleToBeRefresh]);

  function refreshCurrentModule() {
    setRefreshModule(true);
  }
  if (prevModule !== moduleCode) {
    setindexPageData(null);
    setPrevModule(moduleCode);
    setDataLoading(true);
  }

  useEffect(() => {
    // document.title = moduleCode;

    let errorDetails = {};

    if(moduleURL && moduleId === feature.showModule){
      CommonService.fetchIndexPageData(moduleURL)
        .then(data => {
          setindexPageData(data);
          setDataLoading(false);
        })
        .catch(err => {
          if (err.response) {
            errorDetails["STATUS"] = err.response.status;
            errorDetails["MESSAGE"] = err.response.data.message;
            errorDetails["ERROR"] = err.response.data.error;
          } else if (err.request) {
            errorDetails["Error"] = JSON.stringify(err.request);
          } else {
            errorDetails["Error"] = err.message;
          }
          setError(errorDetails);
          setDataLoading(false);
        });
    }
      
    return () => {
      setindexPageData(null);
    };
  }, [moduleCode, moduleURL, refreshModule, feature]);

  let PageComponent = ModuleComponentConfig[presentationCategory]
    ? ModuleComponentConfig[presentationCategory]
    : ModuleComponentConfig["Error_404"];
  // console.log("module :", ModuleComponentConfig[presentationCategory]);
  return (
    <div>
      {dataLoading ? (
        <LinearLoading />
      ) : indexPageData ? (
        <PageComponent
          moduleCode={moduleCode}
          indexPageData={indexPageData}
          refreshCurrentModule={refreshCurrentModule}
        ></PageComponent>
      ) : (
        <Error error={error}></Error>
      )}
    </div>
  );
}
