import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";

import {
  fetchModuleDetails,
  selectSpecificModule,
  putTabBarFeatures,
  putMapClickedDataInFeatures,
  removeModuleFromDeleted,
  putBreadCrumsModules,
  deleteTabFromTabBar
} from "redux/actions/features/features.actions";
import ModuleChartFrame from "./ModuleChartFrame";
import ModuleDataContainer from "../moduleDataContainer/ModuleDataContainer";
import { useClasses } from "@application";

const styles = theme => ({
  mainContentContainer: {
    minHeight: "100%",
    // minHeight: "450px",
    //minHeight: "540px",
    borderRadius: "12px",
    textAlign: "center",
    paddingBottom: "5px",
    marginBottom: "1px"
    // whiteSpace: "nowrap",
    // overflowY: "auto"
  },
  root: {
    flexGrow: 1,
    padding: "0px"
  },
  appBar: {
    backgroundColor: "red"
  },
  menuButton: {
    width: 20,
    marginRight: theme.spacing(2)
  },
  title: {
    // flexGrow: 1
    borderRadius: "8px"
  },

  buttonStyle: {
    width: "16px",
    outline: "none"
  }
});
function MainModulesFrame() {
  const dispatch = useDispatch();
  const classes = useClasses(styles);

  const [selectedUserFeature, setSelectedUserFeature] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [modules, setModules] = useState([]);
  const [currentDisplayedModules, setCurrentDisplayedModules] = useState([]);
  const [trail, setTrail] = useState([]);
  const [chartDisplayed, setChartDisplayed] = useState(true);
  const [module_Id, setModule_Id] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [moduleURL, setModuleURL] = useState("");
  const [featureCode, setFeatureCode] = useState("");
  const [finalModule, setFinalModule] = useState(null);
  const [presentationCategory, setPresentationCategory] = useState("");
  const [dataContainerArray, setdataContainerArray] = useState([]);
  const [moduleClick, setModuleClick] = useState(false);

  const features = useSelector(module => module.features.features);

  useEffect(() => {
    // useEFFECT 1
    if (features.featureCode && features.featureCode !== null) {
      const searchedFeatures = features.features.filter(f => {
        return f.featureCode === features.featureCode;
      });
      if (searchedFeatures.length === 1) {
        
        setSelectedFeature(searchedFeatures[0]);
        setModules(searchedFeatures[0].modules);
        // setChartDisplayed(true);
      } else {
        setSelectedFeature(null);
      }
    } else {
      setSelectedFeature(null);
      setFinalModule(null);
    }
  }, [features]);

  useEffect(() => {
    // useEFFECT 2

    if (features.featureCode && features.featureCode !== null) {
      const searchedUserFeatures = features.userFeatures.filter(
        f => f.featureMapping_Id === features.featureCode
      );

      if (searchedUserFeatures.length === 1) {
        setSelectedUserFeature(searchedUserFeatures[0]);
      } else {
        setSelectedUserFeature(null);
      }
    } else {
      setSelectedUserFeature(null);
    }
  }, [features]);

  useEffect(() => {
    // useEFFECT 3
    if (selectedFeature !== null && selectedFeature.modules) {
      if (selectedFeature.showRoot) {
        setCurrentDisplayedModules(
          selectedFeature.modules.filter(m => m.parentModuleId === null)
        );
      } else {
        const showModule = selectedFeature.showModule;

        if (
          selectedFeature.modules.filter(m => m.parentModuleId === showModule)
            .length !== 0
        ) {
          // console.log("idhar mat ana");

          setModule_Id(null);
          setModuleId(null);
          setModuleURL(null);
          setPresentationCategory(null);
          setFinalModule(null);
          setCurrentDisplayedModules(
            selectedFeature.modules.filter(m => m.parentModuleId === showModule)
          );
        } else {
          setFinalModule(
            selectedFeature.modules.filter(x => x.uniqueNo === showModule)[0]
          );
          setCurrentDisplayedModules(null);
        }
      }
    }
  }, [features, selectedFeature]);

  useEffect(() => {
    // useEFFECT 4
    // this useEffect for constructing trail
    var trailData = [];
    var moduleArray = [];

    if (selectedUserFeature !== null) {
      trailData.push({
        root: true,
        code: selectedUserFeature.featureMapping_Id,
        label: selectedUserFeature.featureName,
        id: selectedUserFeature.featureMapping_Id
      });
    }
    
    if (selectedFeature !== null && !selectedFeature.showRoot) {
      let positionModule = null;
      let showModules = selectedFeature.showModule;
      setFeatureCode(selectedFeature.featureCode);
      var selectedModule = selectedFeature.modules.filter(
        m => m.uniqueNo === showModules
      );
      if (selectedModule.length > 0) {
        positionModule = selectedModule[0];
      }
      while (positionModule) {
        if (positionModule) {
          moduleArray.push({
            root: false,
            code: positionModule.module_Id,
            label: positionModule.moduleName,
            id: positionModule.uniqueNo
          });
        }
        const parentModuleId = positionModule.parentModuleId;
        const prevModule = selectedFeature.modules.filter(
          m => m.uniqueNo === parentModuleId
        );
        positionModule = prevModule[0];
      }
      trailData.push(...moduleArray.reverse());
    }

    setTrail(trailData);
    if (selectedFeature !== null && trailData.length) {
      dispatch(putBreadCrumsModules(trailData));
      dispatch(
        putTabBarFeatures(
          trailData,
          selectedModule && selectedModule.length
            ? selectedModule[0].module_Id
            : null,
          selectedFeature.featureCode,
          selectedModule && selectedModule.length
            ? selectedModule[0].uniqueNo
            : null
        )
      );
      document.title = "Cognifi | " + trailData[trailData.length - 1].label;
    }
  }, [selectedFeature, selectedUserFeature, modules, dispatch]);

  useEffect(() => {
    // useEFFECT 5

    if (finalModule && finalModule !== null && !finalModule.hasChildren) {
      setModule_Id(finalModule.module_Id);
      setModuleId(finalModule.uniqueNo);
      setModuleURL(finalModule.moduleURL);
      setPresentationCategory(finalModule.presentationCategory);
      setModuleClick(true);
      setFinalModule(null);
    } 
  }, [finalModule]);
  //=========function call for making persisted tabs =========//
  const openModuleDataContainer = useCallback(
    (module_Id, presentationCategory, moduleURL, featureCode, moduleId) => {
      let containerArray = dataContainerArray;
      let filteredContainers = containerArray.filter(cont => cont !== null);
         if (
        !dataContainerArray.filter(
          module => module !== null && module.moduleId === moduleId
        ).length > 0
      ) {
        // for setting max number of tabs
        if (filteredContainers.length >= 10) {
          dispatch(
            deleteTabFromTabBar(
              filteredContainers[0].moduleId,
              filteredContainers[0].featureCode
            )
          );

          containerArray.map(mod =>
            mod !== null && mod.moduleId === filteredContainers[0].moduleId
              ? mod === null
              : mod
          );
        }
        //---------------------------------
        containerArray.push({
          module_Id: module_Id,
          featureCode: featureCode,
          moduleId: moduleId,
          container: (
            <ModuleDataContainer
              data={{
                module_Id,
                presentationCategory,
                moduleURL,
                featureCode,
                moduleId
              }}
            />
          )
        });
      }
      setdataContainerArray(containerArray);
      setModuleClick(false);
    },
    [dataContainerArray, dispatch]
  );

  useEffect(() => {
    // useEFFECT 6
    if (
      moduleURL &&
      presentationCategory &&
      moduleURL !== null &&
      presentationCategory !== null &&
      moduleClick === true
    ) {
      setdataContainerArray([]);
      // for persisted data containers
      openModuleDataContainer(
        module_Id,
        presentationCategory,
        moduleURL,
        featureCode,
        moduleId
      );
    }
  }, [
    featureCode,
    moduleClick,
    module_Id,
    moduleId,
    moduleURL,
    openModuleDataContainer,
    presentationCategory
  ]);

  useEffect(() => {
    // useEFFECT 7
    if (dataContainerArray.length) {
      let arrayOfpersisted = dataContainerArray;
      let filteredModules = features.tabBarFeatures.filter(
        mod => mod.featureCode === featureCode
      )[0];
      filteredModules.lastDeleted.length &&
        arrayOfpersisted.map(persisted => {
          if (
            filteredModules.lastDeleted.includes(
              persisted !== null && persisted.moduleId
            ) === true
          ) {
            // after Deletion
            var moduleListAfterClosing = arrayOfpersisted.map(mod =>
              mod !== null && mod.moduleId === persisted.moduleId ? null : mod
            );
            setdataContainerArray(moduleListAfterClosing);
            // return persisted.module_Id;
          }
        });
    }
  }, [dataContainerArray, featureCode, features.tabBarFeatures]);

  //for construction of URL
  var url = selectedFeature
    ? `/common/feature/${selectedFeature.featureCode}`
    : null;

  const makeApiCallUrl = (uniqueNo, module_Id, parentModule_Id) => {
    return new Promise((resolve, reject) => {
      if (trail && trail.filter(mod => mod.id === uniqueNo).length === 0) {
        var mainUrl = "";

        let prevModules = trail
          .filter(x => x.id !== features.featureCode && x.id !== uniqueNo)
          .map(code => code.code);

        if (parentModule_Id !== undefined && parentModule_Id !== null) {
          prevModules.push(parentModule_Id);
          prevModules = [...new Set(prevModules)];
        }
        prevModules.push(module_Id);
        const finalUrl = url + prevModules.map(x => `~~~${x}`);
        mainUrl = finalUrl.replace(",", "");
        mainUrl = mainUrl.replaceAll(",", "");
        // makes url for first jump / not chart click
        //============================================================
      } else {
        const trailIndex = trail.findIndex(x => x.code === module_Id);
        if (trail.slice(1, trailIndex).length > 0) {
          const finalUrl = `~~~${trail.slice(1, trailIndex)[0].code}`;
          mainUrl = `${url}${finalUrl.replace(
            ",",
            ""
          )}~~~${parentModule_Id}~~~${module_Id}`;
          mainUrl.replace(",", "");
        } else {
          const finalUrl = `~~~${module_Id}`;
          mainUrl = `${url}${finalUrl.replace(",", "")}`;
          mainUrl.replaceAll(",", "");
        }
      }

      resolve(mainUrl);
    });
  };

  function getModuleChartData(module) {
    const { uniqueNo, module_Id, parentModule_Id, dataPointClick } = module;
    let moduleDataArray = [];
    moduleDataArray.push({
      uniqueNo: module.uniqueNo,
      module_Id: module.module_Id,
      moduleName: module.moduleName,
      parentModule_Id: module.parentModule_Id,
      parentModuleId: module.parentModuleId,
      url: module.moduleURL,
      presentationCategory: module.presentationCategory,
      dataPointClick: module.dataPointClick,
      hasChildren: module.hasMoreChild
    });

    //==========================================================
    if (
      modules.filter(x => x.uniqueNo === uniqueNo).length > 0 &&
      modules.filter(x => x.uniqueNo === uniqueNo)[0].selected
    ) {
      dispatch(removeModuleFromDeleted(uniqueNo));
      dispatch(selectSpecificModule(false, uniqueNo));
    } else {
      dispatch(removeModuleFromDeleted(uniqueNo));
      if (dataPointClick !== undefined && dataPointClick === true) {
        dispatch(putMapClickedDataInFeatures(moduleDataArray));
      }
      makeApiCallUrl(uniqueNo, module_Id, parentModule_Id).then(res => {
      
        dispatch(
          fetchModuleDetails(
            res,
            module_Id,
            uniqueNo,
            selectedFeature.featureCode
          )
        );
      });
    }
  }

  // function for getting modulesdetails i.e. last heirarchy
  const getmoduleDetails = module => {
    setModuleClick(true);
    if (
      module.dataPointClick === true &&
      module.parentModuleId !== null &&
      modules.length &&
      modules.filter(x => x.uniqueNo === module.parentModuleId)[0].selected ===
        false
    ) {
      setModule_Id(null);
      setModuleId(null);
      setModuleURL(null);
      setPresentationCategory(null);
      let moduleDataArray = [];
      moduleDataArray.push({
        uniqueNo: module.uniqueNo,
        module_Id: module.module_Id,
        moduleName: module.moduleName,
        parentModule_Id: module.parentModule_Id,
        parentModuleId: module.parentModuleId,
        url: module.url,
        presentationCategory: module.presentationCategory,
        dataPointClick: module.dataPointClick,
        hasChildren: module.hasMoreChild
      });
      dispatch(removeModuleFromDeleted(module.uniqueNo));
      dispatch(putMapClickedDataInFeatures(moduleDataArray));
    } else {
      dispatch(removeModuleFromDeleted(module.uniqueNo));
      dispatch(selectSpecificModule(false, module.uniqueNo));
      setModule_Id(module.module_Id);
      setModuleId(module.uniqueNo);
      setModuleURL(module.url);
      setPresentationCategory(module.presentationCategory);
      setChartDisplayed(false);
    }
  };

  return (
    <Paper className={classes.mainContentContainer} elevation={3}>
      <div className={classes.root}>
        {/* {console.log("currentDispalayed modules", currentDisplayedModules)} */}
        {currentDisplayedModules !== null && (
          <ModuleChartFrame
            current={
              currentDisplayedModules &&
              currentDisplayedModules !== null &&
              currentDisplayedModules.length
                ? currentDisplayedModules
                : []
            }
            getModuleChartData={getModuleChartData}
            getmoduleDetails={getmoduleDetails}
          />
        )}
        {dataContainerArray.map((module, i) => {
          return (
            <div
              key={i}
              style={{
                display:
                  module !== null &&
                  module.moduleId ===
                    (selectedFeature !== null && selectedFeature.showModule)
                    ? true
                    : "none"
              }}
            >
              {module !== null && module.container}
            </div>
          );
        })}
      </div>
    </Paper>
  );
}
export default MainModulesFrame;
