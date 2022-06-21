import React, {useRef} from "react";
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar, getElementAtEvent } from "react-chartjs-2";

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
        ref={myChart}
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
            yAxes: {
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
              },
            xAxes: 
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
              },
            // scaleShowGridLines: true
          }
        }}
      />
    </div>
  );
}
