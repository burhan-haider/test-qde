import React from "react";
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

export default function BarChart(props) {
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
  const graphClickEvent = (dataIndexArray) => {
    // const parentModule = props.module_Id;
    let hasMoreChild;
    let modulename;
    if (hasChildren) {
      let dataPointClick;
      if (dataIndexArray.length > 0) {
        //for getting details;
        // console.log(moduleChartDetail);
        parentModule_Id = module_Id;
        parentModuleId = uniqueNo;
        module_Id =
          moduleChartDetail.module_IdDetailList[dataIndexArray[0]["_index"]][
            "MODULECODE"
          ];

        uniqueNo =
          moduleChartDetail.module_IdDetailList[dataIndexArray[0]["_index"]][
            "UNIQUENO"
          ];

        modulename = moduleChartDetail.xaxis[dataIndexArray[0]["_index"]];
        moduleURL =
          moduleChartDetail.module_IdDetailList[dataIndexArray[0]["_index"]][
            "MODULEURL"
          ];
        presentationCategory =
          moduleChartDetail.module_IdDetailList[dataIndexArray[0]["_index"]][
            "PRESENTATIONCATEGORY"
          ];

        hasMoreChild =
          moduleChartDetail.module_IdDetailList[dataIndexArray[0]["_index"]][
            "HASCHILDREN"
          ];
        // if (
        //   moduleChartDetail.module_IdDetailList[dataIndexArray[0]["_index"]][
        //     "HASCHILDREN"
        //   ]
        // ) {
        //   dataPointClick = false;
        //   // module_Id = module_Id;
        // } else {
        //   dataPointClick = true;
        // }
        dataPointClick = true;
      } else {
        //for getting chart
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
    labels: moduleChartDetail.xaxis,
    datasets: [
      {
        label: moduleChartDetail.labelName,
        backgroundColor: "#f8fab8",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: moduleChartDetail.yaxis
      }
    ]
  };
  return (
    <div style={{ position: "relative" }}>
      <Bar
        data={cData}
        // getElementAtEvent={elms => graphClickEvent(elms)}
        onClick={elms => graphClickEvent(elms)}
        options={{
          responsive: true,
          title: {
            display: true,
            text: moduleChartDetail.chartName
          },
          legend: {
            display: false
          },
          layout: {
            padding: {
              left: 10,
              right: 15,
              top: 20,
              bottom: 20
            }
          },
          scales: {
            yAxes: [
              {
                //stacked: true,
                gridLines: {
                  display: true,
                  color: "E0E0EB"
                },
                scaleLabel: {
                  display: true,
                  labelString: moduleChartDetail.yaxisName
                },
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: true
                },
                scaleLabel: {
                  display: true,
                  labelString: moduleChartDetail.xaxisName
                },
                //barPercentage: 0.3,
                ticks: {}
              }
            ],
            scaleShowGridLines: true
          }
        }}
      />
    </div>
  );
}
