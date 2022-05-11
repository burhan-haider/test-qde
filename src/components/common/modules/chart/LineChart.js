import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';

 ChartJS.register(...registerables);

function LineChart(props) {
  function graphClickEvent(dataIndexArray) {
    const parentModule = props.module_Id;
    if (props.hasChildren) {
      let module_Id;
      let modulename;
      let moduleUrl;
      let dataPointClick;
      let presentationCategory;
      if (dataIndexArray.length > 0) {
        module_Id =
          props.moduleChartDetail.module_IdDetailList[
            dataIndexArray[0]["_index"]
          ]["MODULECODE"];
        modulename = props.moduleChartDetail.xaxis[dataIndexArray[0]["_index"]];

        moduleUrl =
          props.moduleChartDetail.module_IdDetailList[
            dataIndexArray[0]["_index"]
          ]["MODULEURL"];
        presentationCategory =
          props.moduleChartDetail.module_IdDetailList[
            dataIndexArray[0]["_index"]
          ]["PRESENTATIONCATEGORY"];
        dataPointClick = true;
      } else {
        module_Id = props.module_Id;
        dataPointClick = false;
      }
      props.chartClickOperation(
        module_Id,
        moduleUrl,
        presentationCategory,
        dataPointClick,
        modulename,
        parentModule
      );
    } else {
      props.chartClickOperation(
        props.module_Id,
        props.moduleURL,
        props.presentationCategory,
        true,
        parentModule
      );
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
