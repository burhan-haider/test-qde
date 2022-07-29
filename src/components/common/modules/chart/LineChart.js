import React, { useRef, useState } from "react";
import { Line, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'

 ChartJS.register(...registerables);

function LineChart(props) {

  const chartData = [
    props.moduleChartDetail.yaxis,
    props.moduleChartDetail.yaxis_1,
    props.moduleChartDetail.yaxis_2,
    props.moduleChartDetail.yaxis_3,
  ];

  const colors = [
    '#FE6F9B',
    '#4FA3A5',
    '#7D50B9',
    '#FFBB5A',
  ];

  const lightColors = [
    '#FFD6D4',
    '#D2FFD7',
    '#C7C6FF',
    '#FFE0C5',
  ];


  const legend = ["0+%", "30+%", "60+%", "90+%"];

  const [option, setOption] = useState({
    // backgroundColor: "#052a4f",
    // color: '#eee',
    title: {
      text: props.moduleChartDetail.chartName,
      textStyle: {
        // color: '#eee'
      }
    },
    grid: {
      show: false,
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legend,
      icon: 'roundRect'
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ['stack', 'tiled'] },
        saveAsImage: { show: true }
      }
    },
    xAxis: {
      type: 'category',
      show: true,
      name: props.moduleChartDetail.xaxisName,
      boundaryGap: false,
      data: props.moduleChartDetail.xaxis,
      nameTextStyle:{
        padding: 5,
      },
    },
    yAxis: {
      type: 'value',
      show: true,
      name: props.moduleChartDetail.yaxisName,
      boundaryGap: [0, '100%'],
      data: props.moduleChartDetail.yaxis.map((item, index)=>({
          value: item,
          textStyle: {
            color: '#ee6',
            fontSize: 12,
          },
        })
      )
    },
    series: chartData.map((item, index)=>{
      return {
        name: legend[index],
        type: 'line',
        smooth: true,
        data: item,
        symbol: 'emptyCircle',
        symbolSize: 7,
        areaStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colors[index]
            },
            {
              offset: 1,
              color: lightColors[index]
            }
          ]),
        },
        itemStyle: {
          color: colors[index]
        },
        lineStyle: {
          color: colors[index],
          width: 3,
        }
      
      }
    }) 
  });

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

  const onEvents = {
    // 'mouseover': (e) => {
    //   console.log("mouseover", e);
    //   setOption({
    //     ...option,
    //     xAxis: {
    //       ...option.xAxis,
    //       show: true,
    //     },
    //     yAxis: {
    //       ...option.yAxis,
    //       show: true,
    //     }
    //   })
    // },
    // 'mouseout': (e) => {
    //   console.log("mouseout", e);
    //   setOption({
    //     ...option,
    //     xAxis: {
    //       ...option.xAxis,
    //       show: false
    //     },
    //     yAxis: {
    //       ...option.yAxis,
    //       show: false,
    //     }
    //   })
    // }
  }
  // console.log(props);
  
  // console.log(props);
  // console.log(cData)
  return (
    <div 
      // onMouseEnter={()=>onEvents.click()} 
      // onMouseLeave={()=>onEvents.mouseout()} 
      style={{ position: "relative", padding: '10px' }}
      >
      <ReactEcharts option={option} onEvents={onEvents} />
      {/* <Line
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
      /> */}
    </div>
  );
}
export default LineChart;
