import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
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
  const { current, getModuleChartData, getmoduleDetails } = props;

  function chartClickOperation(
    module_Id,
    url,
    presentationCategory,
    dataPointClick,
    moduleName,
    parentModuleId,
    parentModule_Id,
    hasMoreChild,
    uniqueNo,
    hasChildren
  ) {
    if (dataPointClick) {
      if (hasMoreChild) {
        // getModuleChartData(module_Id, parentModule);

        getModuleChartData({
          module_Id,
          url,
          presentationCategory,
          dataPointClick,
          moduleName,
          parentModuleId,
          parentModule_Id,
          uniqueNo,
          hasChildren,
          hasMoreChild
        });
      } else {
        props.getmoduleDetails({
          module_Id,
          url,
          presentationCategory,
          dataPointClick,
          moduleName,
          parentModuleId,
          parentModule_Id,
          uniqueNo,
          hasChildren,
          hasMoreChild
        });
      }
    } else {
      getModuleChartData({
        module_Id,
        uniqueNo,
        parentModuleId,
        parentModule_Id,
        dataPointClick,
        hasChildren
      });
    }
  }

  function selectSpecificChart(
    moduleChartDetails,
    module_Id,
    moduleURL,
    hasChildren,
    presentationCategory,
    parentModuleId,
    parentModule_Id,
    uniqueNo
  ) {
    let chartType = moduleChartDetails && moduleChartDetails.chartType;
    switch (chartType) {
      case "LINE":
        return (
          <LineChart
            moduleChartDetail={moduleChartDetails}
            module_Id={module_Id}
            moduleURL={moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={hasChildren}
            presentationCategory={presentationCategory}
            parentModuleId={parentModuleId}
            parentModule_Id={parentModule_Id}
            uniqueNo={uniqueNo}
          ></LineChart>
        );
      case "BAR":
        return (
          <BarChart
            moduleChartDetail={moduleChartDetails}
            module_Id={module_Id}
            moduleURL={moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={hasChildren}
            presentationCategory={presentationCategory}
            parentModuleId={parentModuleId}
            parentModule_Id={parentModule_Id}
            uniqueNo={uniqueNo}
          ></BarChart>
        );
      case "PIE":
        return (
          <PieChart
            moduleChartDetail={moduleChartDetails}
            module_Id={module_Id}
            moduleURL={moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={hasChildren}
            presentationCategory={presentationCategory}
            parentModuleId={parentModuleId}
            parentModule_Id={parentModule_Id}
            uniqueNo={uniqueNo}
          ></PieChart>
        );
      default:
        return (
          <LineChart
            moduleChartDetail={moduleChartDetails}
            module_Id={module_Id}
            moduleURL={moduleURL}
            chartClickOperation={chartClickOperation}
            hasChildren={hasChildren}
            presentationCategory={presentationCategory}
            parentModuleId={parentModuleId}
            parentModule_Id={parentModule_Id}
            uniqueNo={uniqueNo}
          ></LineChart>
        );
    }
  }
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.chartContentContainer}>
      {current && current !== null && Array.isArray(current)
        ? current.map((module, index) =>
            module.moduleChartDetails !== null ? (
              <Grid item md={4} lg={6} key={module.module_Id}>
                <Paper elevation={3}>
                  {selectSpecificChart(
                    module.moduleChartDetails,
                    module.module_Id,
                    module.url,
                    module.hasChildren,
                    module.presentationCategory,
                    module.parentModuleId,
                    module.parentModule_Id,
                    module.uniqueNo
                  )}
                </Paper>
              </Grid>
            ) : (
              <Grid item md={4} lg={6} key={module.module_Id}>
                <Paper
                  elevation={3}
                  onClick={() => {
                    module.hasChildren
                      ? getModuleChartData(module)
                      : getmoduleDetails(module);
                  }}
                >
                  {module.module_Id}
                </Paper>
              </Grid>
            )
          )
        : null}
    </Grid>
  );
}
export default ModuleChartFrame;
