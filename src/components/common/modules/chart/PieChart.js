import React, {useRef} from "react";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import {
  setSelectedModule,
  addToBreadcrumbs,
  addToOpenTabs,
} from 'redux/features/features.actions'

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

  const myChart = useRef(null);

  const graphClickEvent = (dataIndex) => {

    const dataIndexArray = getElementAtEvent(myChart.current, dataIndex);

    console.log("FUNCTION OF GRAPHCLICKCALLED", getElementAtEvent(myChart.current, dataIndex));
    console.log("Props:-", props);

    let dataPointClick;
    let modulename;
    let hasMoreChild;

    if(hasChildren===true) {

      if(dataIndexArray.length > 0) {
        parentModule_Id = module_Id;

        parentModuleId = uniqueNo;

        module_Id = props.moduleChartDetail.moduleCodeDetailList[dataIndexArray[0]["index"]]["MODULE_ID"];

        uniqueNo = moduleChartDetail.moduleCodeDetailList[dataIndexArray[0]["index"]]["UNIQUENO"];

        modulename = props.moduleChartDetail.xaxis[dataIndexArray[0]["index"]];

        moduleURL = props.moduleChartDetail.moduleCodeDetailList[dataIndexArray[0]["index"]]["MODULEURL"];
          
        presentationCategory = props.moduleChartDetail.moduleCodeDetailList[ dataIndexArray[0]["index"]]["PRESENTATIONCATEGORY"];

        hasMoreChild = moduleChartDetail.moduleCodeDetailList[dataIndexArray[0]["index"]]["HASCHILDREN"];
      
        dataPointClick = true;

        let moduleMain = {
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
        };
        props.chartClickOperation(moduleMain);
      }
      else{
        let moduleMain = {
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
        };
        props.chartClickOperation(moduleMain);
      }
    }
    else{

      let moduleMain = {
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
      };
      props.chartClickOperation(moduleMain);

    }

  }

  // function graphClickEvent(dataIndex) {


  //   let hasMoreChild;
  //   let modulename;
  //   if (hasChildren) {
  //     if (dataIndexArray.length > 0) {
  //       parentModule_Id = module_Id;
  //       parentModuleId = uniqueNo;
  //       module_Id = props.moduleChartDetail.moduleCodeDetailList[dataIndexArray[0]["index"]]["MODULE_ID"];

  //       uniqueNo = moduleChartDetail.moduleCodeDetailList[dataIndexArray[0]["index"]]["UNIQUENO"];

  //       modulename = props.moduleChartDetail.xaxis[dataIndexArray[0]["index"]];

  //       moduleURL = props.moduleChartDetail.moduleCodeDetailList[dataIndexArray[0]["index"]]["MODULEURL"];
          
  //       presentationCategory = props.moduleChartDetail.moduleCodeDetailList[ dataIndexArray[0]["index"]]["PRESENTATIONCATEGORY"];

  //       hasMoreChild = moduleChartDetail.moduleCodeDetailList[dataIndexArray[0]["index"]]["HASCHILDREN"];
  //       dataPointClick = true;
  //     } else {
  //       module_Id = props.module_Id;
  //       dataPointClick = false;
  //       hasMoreChild = false;

  //     }
  //     let moduleMain = {
  //       module_Id,
  //       moduleURL,
  //       presentationCategory,
  //       dataPointClick,
  //       modulename,
  //       parentModuleId,
  //       parentModule_Id,
  //       hasMoreChild,
  //       uniqueNo,
  //       hasChildren
  //     };
  //     console.log("moduleMainIf:-", moduleMain);
  //     props.chartClickOperation(moduleMain);
  //   } else {
  //     let moduleMain = {
  //       module_Id,
  //       moduleURL,
  //       presentationCategory,
  //       dataPointClick: true,
  //       modulename,
  //       parentModuleId,
  //       parentModule_Id,
  //       hasMoreChild,
  //       uniqueNo,
  //       hasChildren
  //     };
  //     console.log("moduleMainElse:-", moduleMain);
  //     props.chartClickOperation(moduleMain);
  //   }
  // }
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
        // getElementAtEvent={(elms) => graphClickEvent(elms)}
        onClick={elms => graphClickEvent(elms)}
        ref={ myChart }
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
