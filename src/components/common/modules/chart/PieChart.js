import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

export default function PieChart(props) {
  // console.log(props);
  let {
    module_Id,
    moduleURL,
    presentationCategory,
    moduleChartDetail,
    hasChildren,
    parentModuleId,
    parentModule_Id,
    uniqueNo
  } = props;
  function graphClickEvent(dataIndexArray) {
    // console.log("FUNCTION OF GRAPHCLICKCALLED", dataIndexArray);
    let hasMoreChild;
    let modulename;
    if (hasChildren) {
      let dataPointClick;
      if (dataIndexArray.length > 0) {
        parentModule_Id = module_Id;
        parentModuleId = uniqueNo;
        module_Id =
          props.moduleChartDetail.module_IdDetailList[
            dataIndexArray[0]["_index"]
          ]["MODULECODE"];
        uniqueNo =
          moduleChartDetail.module_IdDetailList[dataIndexArray[0]["_index"]][
            "UNIQUENO"
          ];
        modulename = props.moduleChartDetail.xaxis[dataIndexArray[0]["_index"]];
        moduleURL =
          props.moduleChartDetail.module_IdDetailList[
            dataIndexArray[0]["_index"]
          ]["MODULEURL"];
        presentationCategory =
          props.moduleChartDetail.module_IdDetailList[
            dataIndexArray[0]["_index"]
          ]["PRESENTATIONCATEGORY"];

        hasMoreChild =
          moduleChartDetail.module_IdDetailList[dataIndexArray[0]["_index"]][
            "HASCHILDREN"
          ];
        dataPointClick = true;
      } else {
        module_Id = props.module_Id;
        dataPointClick = false;
      }
      props.chartClickOperation(
        module_Id,
        moduleURL,
        presentationCategory,
        dataPointClick,
        modulename,
        parentModuleId,
        parentModule_Id,
        hasMoreChild,
        uniqueNo,
        hasChildren
      );
    } else {
      props.chartClickOperation(
        module_Id,
        moduleURL,
        presentationCategory,
        true,
        modulename,
        parentModuleId,
        parentModule_Id,
        hasMoreChild,
        uniqueNo,
        hasChildren
      );
    }
  }
  const cData = {
    labels: props.moduleChartDetail.xaxis,
    datasets: [
      {
        data: props.moduleChartDetail.yaxis,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };

  return (
    <div style={{ position: "relative"}}>
      <Pie
        data={cData}
        getElementAtEvent={elms => graphClickEvent(elms)}
        onClick={elms => graphClickEvent(elms)}
        options={{
          responsive: true,
          title: {
            display: true,
            text: props.moduleChartDetail.chartName
          },
          aspectRatio: 2,
          legend: {
            display: true
          },
          layout: {
            padding: {
              left: 10,
              right: 15,
              top: 20,
              bottom: 20
            },
          }
        }}
      />
    </div>
  );
}
