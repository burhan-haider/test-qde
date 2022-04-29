import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box'
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from 'react-redux'

import LineChart from "components/common/modules/chart/LineChart";
import BarChart from "components/common/modules/chart/BarChart";
import PieChart from "components/common/modules/chart/PieChart";
import { useClasses } from "@application";
import {
  setSelectedModule,
  addToBreadcrumbs,
  addToOpenTabs,
} from 'redux/features/features.actions'

const styles = theme => ({
  chartContentContainer: {
    width: "100%",
    margin: 0,
    overflow: "auto"
  },
  root: {
    flexGrow: 1,
    padding: "20px"
    // borderRadius: "8px"
    // backgroundColor: "gray"
  }
});

function ModuleChartFrame(props) {

  const { current, getModuleChartData, feature } = props;

  const dispatch = useDispatch();

  const chartClickOperation = (module) => {

    console.log("chartClickOperations Triggered")
    console.log("Module Element Name:",module)
    console.log("Module Data:",current)
    console.log("Chart Feature:", feature)
    console.log('Feature BreadCrumbs:-',feature.breadCrumbs)

    if(current.module_Id == module){

      if(current.hasChildren == true){
        dispatch(setSelectedModule(feature.featureCode, current.uniqueNo))
        getModuleChartData(current);
      }
      else{
        dispatch(setSelectedModule(feature.featureCode, current.uniqueNo))
      }

      const lastCrumbLevel = feature.breadCrumbs[feature.breadCrumbs.length-1].level;

      
      // feature.breadCrumbs.map(crumb=>{
      //     if(crumb.level===lastCrumbLevel+1 && crumb.id!==current.uniqueNo){
      //         dispatch(removeFromBreadcrumbs(feature.featureCode, crumb));
      //         return crumb
      //     }
      //     return crumb;
      // })
      if(feature.openTabs.filter(e=>e.id===current.uniqueNo).length<1){
        dispatch(addToOpenTabs(feature.featureCode, {id: current.uniqueNo, label: current.moduleName, level: lastCrumbLevel+1}));
      }
      // if(feature.breadCrumbs.filter(e=>e.id===current.uniqeNo).length<1){
      //   dispatch(addToBreadcrumbs(feature.featureCode, {id: current.uniqueNo, label: current.moduleName, level: lastCrumbLevel+1}));
      // }

        feature.breadCrumbs.map(crumb=>{
          if(feature.breadCrumbs.filter(e=>e.id===current.uniqueNo).length<1){
            if(crumb.id === current.parentModuleId){
              dispatch(addToBreadcrumbs(feature.featureCode, {
                id: current.uniqueNo,
                label: current.moduleName,
                level: crumb.level+1
              }))
            }
          }
        })

        if(feature.breadCrumbs.length<2){
          if(feature.breadCrumbs.filter(e=>e.id===current.uniqueNo).length<1){
            dispatch(addToBreadcrumbs(feature.featureCode, {
              id: current.uniqueNo,
              label: current.moduleName,
              level: 1
            }))
          }
        }

      // feature.breadCrumbs.map(crumb=>{
      //   if(current.parentModuleId === crumb.id){
      //     console.log("Module Parent Matches Crumb")
      //     dispatch(addToBreadcrumbs(feature.featureCode, {
      //       id: current.uniqueNo, 
      //       label: current.moduleName, 
      //       level: crumb.level + 1,
      //     }))
      //     if(feature.openTabs.filter(e=>e.id===current.uniqueNo).length<1){
      //       dispatch(addToOpenTabs(feature.featureCode, {
      //           id: current.uniqueNo, 
      //           label: current.moduleName,
      //           level: crumb.level + 1,
      //       }))
      //     }
      //   }
      // })
      // dispatch(setSelectedModule(feature.featureCode, current.uniqueNo))
    }
    
    // if (dataPointClick) {
    //   if (hasMoreChild) {
    //     // getModuleChartData(module_Id, parentModule);

    //     getModuleChartData({
    //       module_Id: module.module_Id,
    //       url: module.url,
    //       presentationCategory: module.presentationCategory,
    //       dataPointClick:module.dataPointClick,
    //       moduleName:module.moduleName,
    //       parentModuleId:module.parentModuleId,
    //       parentModule_Id:module.parentModule_Id,
    //       uniqueNo:module.uniqueNo,
    //       hasChildren:module.hasChildren,
    //       hasMoreChild: module.hasMoreChild,
    //     });
    //   } else {
    //     props.getmoduleDetails({
    //       module_Id:module.module_Id,
    //       url:module.url,
    //       presentationCategory:module.presentationCategory,
    //       dataPointClick:module.dataPointClick,
    //       moduleName:module.moduleName,
    //       parentModuleId:module.parentModuleId,
    //       parentModule_Id:module.parentModule_Id,
    //       uniqueNo:module.uniqueNo,
    //       hasChildren:module.hasChildren,
    //       hasMoreChild: module.hasMoreChild,
    //     });
    //   }
    // } else {
    //   getModuleChartData({
    //     module_Id:module.module_Id,
    //     uniqueNo:module.uniqueNo,
    //     parentModuleId:module.parentModuleId,
    //     parentModule_Id:module.parentModule_Id,
    //     dataPointClick:module.dataPointClick,
    //     hasChildren:module.hasChildren
    //   });
    // }
  }

  function selectSpecificChart(
    module
  ) {
    let chartType = module.moduleChartDetails && module.moduleChartDetails.chartType;
    switch (chartType) {
      case "LINE":
        return (
          <LineChart
            moduleChartDetail={module.moduleChartDetails}
            module_Id={module.module_Id}
            moduleURL={module.moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={module.hasChildren}
            presentationCategory={module.presentationCategory}
            parentModuleId={module.parentModuleId}
            parentModule_Id={module.parentModule_Id}
            uniqueNo={module.uniqueNo}
          ></LineChart>
        );
      case "BAR":
        return (
          <BarChart
            moduleChartDetail={module.moduleChartDetails}
            module_Id={module.module_Id}
            moduleURL={module.moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={module.hasChildren}
            presentationCategory={module.presentationCategory}
            parentModuleId={module.parentModuleId}
            parentModule_Id={module.parentModule_Id}
            uniqueNo={module.uniqueNo}
          ></BarChart>
        );
      case "PIE":
        return (
          <PieChart
            moduleChartDetail={module.moduleChartDetails}
            module_Id={module.module_Id}
            moduleURL={module.moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={module.hasChildren}
            presentationCategory={module.presentationCategory}
            parentModuleId={module.parentModuleId}
            parentModule_Id={module.parentModule_Id}
            uniqueNo={module.uniqueNo}
          ></PieChart>
        );
      default:
        return (
          <LineChart
            moduleChartDetail={module.moduleChartDetails}
            module_Id={module.module_Id}
            moduleURL={module.moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={module.hasChildren}
            presentationCategory={module.presentationCategory}
            parentModuleId={module.parentModuleId}
            parentModule_Id={module.parentModule_Id}
            uniqueNo={module.uniqueNo}
          ></LineChart>
        );
    }
  }
  const classes = useClasses(styles);
  return (
    <Box className={classes.chartContentContainer}>
      {
            current.moduleChartDetails !== null ? (
                <Paper elevation={3}>
                  {selectSpecificChart(current)}
                </Paper>
            ) : (
              <Grid item md={4} lg={6} key={current.module_Id}>
                {/* <Paper
                  elevation={3}
                  onClick={() => {
                    current.hasChildren
                      ? getModuleChartData(current)
                      : getmoduleDetails(current);
                  }}
                >
                  {current.module_Id}
                </Paper> */}
              </Grid>
            )
          }
    </Box>
  );
}
export default ModuleChartFrame;

