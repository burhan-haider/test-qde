import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box'
import { makeStyles } from "@mui/styles";

import LineChart from "components/common/modules/chart/LineChart";
import BarChart from "components/common/modules/chart/BarChart";
import PieChart from "components/common/modules/chart/PieChart";

const useStyles = makeStyles(theme => ({
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
}));

function ModuleChartFrame(props) {
  const { current } = props;

  function chartClickOperation(
    module
  ) {
    console.log("chartClickOperations Triggered")
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
  const classes = useStyles();
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

