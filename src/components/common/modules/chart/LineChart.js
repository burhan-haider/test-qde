import React, { useRef } from "react";
import { Line, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';

 ChartJS.register(...registerables);

function LineChart(props) {

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

  const isClickable = !hasChildren&&!presentationCategory?false:true;

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
  // console.log(props);
  const cData = {
    labels: props.moduleChartDetail && props.moduleChartDetail.xaxis,
    datasets: [
      {
        label: "0+%", //props.moduleChartDetail.labelName,
        backgroundColor: "#0074D9",
        borderColor: "#0074D9",
        fill: false,
        lineTension: 0,
        radius: 5,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: props.moduleChartDetail && props.moduleChartDetail.yaxis,
        xAxisID: 'xAxes',
        yAxisID: 'yAxes',
      },
      {
        label: "30+%",
        backgroundColor: "#FF4136",
        borderColor: "#FF4136",
        fill: false,
        lineTension: 0,
        radius: 5,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: props.moduleChartDetail && props.moduleChartDetail.yaxis_1,
        xAxisID: 'xAxes',
        yAxisID: 'yAxes',
      },
      {
        label: "60+%",
        backgroundColor: "#2ECC40",
        borderColor: "#2ECC40",
        fill: false,
        lineTension: 0,
        radius: 5,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: props.moduleChartDetail && props.moduleChartDetail.yaxis_2,
        xAxisID: 'xAxes',
        yAxisID: 'yAxes',
      },
      {
        label: "90+%",
        backgroundColor: "#FF851B",
        borderColor: "#FF851B",
        fill: false,
        lineTension: 0,
        radius: 5,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: props.moduleChartDetail && props.moduleChartDetail.yaxis_3,
        xAxisID: 'xAxes',
        yAxisID: 'yAxes',
      }
    ]
  };
  // console.log(props);
  // console.log(cData)
  return (
    <div style={{ position: "relative", padding: '10px' }}>
      <Line
        data={cData}
        // getElementAtEvent={elms => graphClickEvent(elms)}
        onClick={(elms) => isClickable?graphClickEvent(elms):null}
        ref={myChart}
        options={{
          responsive: true,
          title: {
            display: true,
            text: props.moduleChartDetail && props.moduleChartDetail.chartName
          },
          legend: {
            display: true
          },
          layout: {
            padding: {
              left: 10,
              right: 15,
              top: 0,
              bottom: 20
            }
          },
          scales: {
            yAxes: {
                //stacked: true,
                grid: {
                  display: true,
                  color: "#e0e0e0"
                },
                scaleLabel: {
                  display: true,
                  labelString:
                    props.moduleChartDetail && props.moduleChartDetail.yaxisName
                },
                ticks: {
                  beginAtZero: true
                }
            },
            xAxes: {
                grid: {
                  display: true,
                  color: "#e0e0e0"
                },
                scaleLabel: {
                  display: true,
                  labelString:
                    props.moduleChartDetail && props.moduleChartDetail.xaxisName
                },
                ticks: {}
            },
          }
        }}
      />
    </div>
  );
}
export default LineChart;
