import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
let myChart = null

let  guage_option ={
  backgroundColor: '#000',
  tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
      feature: {
          restore: {},
          saveAsImage: {}
      }
  },
  series: [
      // left
      {
          name: 'gauge 0',
          type: 'gauge',
          min: 0,
          max: 40,
          startAngle: -30,
          endAngle: -315,
          splitNumber: 9,
          radius: '65%',
          center: ['25%', '55%'],
          axisLine: {
              lineStyle: {
                  color: [
                      [1, '#AE96A6']
                  ],
              }
          },
          splitLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {},
          pointer: {
              show: false
          },
          detail: {
              show: false
          },
          title: {
              fontSize: 12,
              fontWeight: 800,
              fontFamily: "Arial",
              color: '#fff',
              offsetCenter: [0, '-60%']
          },
          progress: {
              show: true,
              width: 3,
              itemStyle: {
                  color: '#fff'
              }
          },
          data: [{
              value: 20,
              name: 'A'
          }]
      },
      {
          name: 'gauge 1',
          type: 'gauge',
          min: 0,
          max: 40,
          startAngle: -140,
          endAngle: -305,
          splitNumber: 5,
          radius: '65%',
          center: ['25%', '55%'],
          axisLine: {
              lineStyle: {
                  color: [
                      [1, '#AE96A6']
                  ],
              }
          },
          splitLine: {
              distance: -7,
              length: 12,
              lineStyle: {
                  color: '#fff',
                  width: 4
              }
          },
          axisTick: {
              distance: -8,
              length: 8,
              lineStyle: {
                  color: '#fff',
                  width: 2
              }
          },
          axisLabel: {
              distance: 14,
              fontSize: 12,
              fontWeight: 800,
              fontFamily: "Arial",
              color: '#fff'
          },
          anchor: {},
          pointer: {
              icon: 'path://M-36.5,23.9L-41,4.4c-0.1-0.4-0.4-0.7-0.7-0.7c-0.5-0.1-1.1,0.2-1.2,0.7l-4.5,19.5c0,0.1,0,0.1,0,0.2v92.3c0,0.6,0.4,1,1,1h9c0.6,0,1-0.4,1-1V24.1C-36.5,24-36.5,23.9-36.5,23.9z M-39.5,114.6h-5v-85h5V114.6z',
              width: 5,
              length: '40%',
              offsetCenter: [0, '-58%'],
              itemStyle: {
                  color: '#f00',
                  shadowColor: 'rgba(255, 0, 0)',
                  shadowBlur: 5,
                  shadowOffsetY: 2
              }
          },
          title: {
              color: '#fff',
              fontSize: 12,
              fontWeight: 800,
              fontFamily: "Arial",
              offsetCenter: [0, 0]
          },
          detail: {
              show: false
          },
          data: [{
              value: 5,
              name: '当前电流'
          }]
      },
      {
        name: 'gauge 2',
        type: 'gauge',
        min: 0,
        max: 8,
        z: 10,
        splitNumber: 8,
        radius: '40%',
        center: ['25%', '60%'],
        axisLine: {
            lineStyle: {
                width: 14,
                color: [
                    [1, '#000']
                ],
            }
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        anchor: {},
        pointer: {
            show: false
        },
        title: {
            show: false
        },
        detail: {
            offsetCenter: ['0%', '15%'],
            formatter: '{b|当前设定电流:}{a|{value}}',
            rich: {
                a: {
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: "Arial",
                    color: '#fff',
                    align: 'center',
                    padding: [0, 0, 0, 0]
                },
                b: {
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: "Arial",
                    color: '#fff',
                    rotate: 30,
                    padding: [0, 0, 0, 0]
                }
            }
        },
        // value is speed
        data: [{
            value: 5,
            name: ''
        }]
      },
      {
        name: 'gauge 3',
        type: 'gauge',
        min: 0,
        max: 8,
        z: 10,
        splitNumber: 8,
        radius: '40%',
        center: ['25%', '60%'],
        axisLine: {
            lineStyle: {
                width: 14,
                color: [
                    [1, '#000']
                ],
            }
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        anchor: {},
        pointer: {
            show: false
        },
        title: {
            show: false
        },
        detail: {
            offsetCenter: ['0%', '40%'],
            formatter: '{b|最大设定电流:}{a|{value}}',
            rich: {
                a: {
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: "Arial",
                    color: '#fff',
                    align: 'center',
                    padding: [0, 0, 0, 0]
                },
                b: {
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: "Arial",
                    color: '#fff',
                    rotate: 30,
                    padding: [0, 0, 0, 0]
                }
            }
        },
        // value is speed
        data: [{
            value: 5,
            name: ''
        }]
      },
      // middle
      {
          name: 'gauge 4',
          type: 'gauge',
          min: 45,
          max: 65,
          z: 10,
          startAngle: 210,
          endAngle: -30,
          splitNumber: 10,
          radius: '90%',
          center: ['50%', '50%'],
          axisLine: {
              show: true,
              lineStyle: {
                  width: 0,
                  color: [
                      [0.825, '#fff'],
                      [1, '#f00']
                  ]
              }
          },
          splitLine: {
              distance: 20,
              length: 15,
              lineStyle: {
                  color: 'auto',
                  width: 4,
                  shadowColor: 'rgba(255, 255, 255, 0.5)',
                  shadowBlur: 15,
                  shadowOffsetY: -10
              }
          },
          axisTick: {
              distance: 20,
              length: 8,
              lineStyle: {
                  color: 'auto',
                  width: 2,
                  shadowColor: 'rgba(255, 255, 255)',
                  shadowBlur: 10,
                  shadowOffsetY: -10,
              }
          },
          axisLabel: {
              distance: 10,
              fontSize: 14,
              fontWeight: 800,
              fontFamily: "Arial",
              color: '#fff'
          },
          anchor: {},
          pointer: {
              icon: 'path://M-36.5,23.9L-41,4.4c-0.1-0.4-0.4-0.7-0.7-0.7c-0.5-0.1-1.1,0.2-1.2,0.7l-4.5,19.5c0,0.1,0,0.1,0,0.2v92.3c0,0.6,0.4,1,1,1h9c0.6,0,1-0.4,1-1V24.1C-36.5,24-36.5,23.9-36.5,23.9z M-39.5,114.6h-5v-85h5V114.6z',
              width: 10,
              offsetCenter: [0, '-10%'],
              length: '75%',
              itemStyle: {
                  color: '#f00',
                  shadowColor: 'rgba(255, 0, 0)',
                  shadowBlur: 5,
                  shadowOffsetY: 3
              }
          },
          title: {
              color: '#fff',
              fontSize: 12,
              fontWeight: 800,
              fontFamily: "Arial",
              offsetCenter: ['20%', '0%']
          },
          data: [{
              value: 48,
              name: '电池电压'
          }],
          detail: {
              show: false
          }
      },
      {
          name: 'gauge 5',
          type: 'gauge',
          min: 0,
          max: 8,
          z: 10,
          splitNumber: 8,
          radius: '90%',
          axisLine: {
              lineStyle: {
                  width: 14,
                  color: [
                      [1, '#000']
                  ],
              }
          },
          splitLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {},
          pointer: {
              show: false
          },
          title: {
              show: false
          },
          detail: {
              offsetCenter: ['0%', '20%'],
              formatter: '{b|当前设定电压:}{a|{value}}',
              rich: {
                  a: {
                      fontSize: 14,
                      fontWeight: 800,
                      fontFamily: "Arial",
                      color: '#fff',
                      align: 'center',
                      padding: [0, 0, 0, 0]
                  },
                  b: {
                      fontSize: 12,
                      fontWeight: 800,
                      fontFamily: "Arial",
                      color: '#fff',
                      rotate: 30,
                      padding: [0, 0, 0, 0]
                  }
              }
          },
          // value is speed
          data: [{
              value: 2,
              name: ''
          }]
      },
      {
        name: 'gauge 6',
        type: 'gauge',
        min: 0,
        max: 8,
        z: 10,
        splitNumber: 8,
        radius: '90%',
        axisLine: {
            lineStyle: {
                width: 14,
                color: [
                    [1, '#000']
                ],
            }
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        anchor: {},
        pointer: {
            show: false
        },
        title: {
            show: false
        },
        detail: {
            offsetCenter: ['0%', '33%'],
            formatter: '{b|最高设定电压:}{a|{value}}',
            rich: {
                a: {
                    fontSize: 14,
                    fontWeight: 800,
                    fontFamily: "Arial",
                    color: '#fff',
                    align: 'center',
                    padding: [0, 0, 0, 0]
                },
                b: {
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: "Arial",
                    color: '#fff',
                    rotate: 30,
                    padding: [0, 0, 0, 0]
                }
            }
        },
        // value is speed
        data: [{
            value: 2,
            name: ''
        }]
      },
      // right
      {
          name: 'gauge 7',
          type: 'gauge',
          min: 0,
          max: 8,
          startAngle: 135,
          endAngle: -150,
          splitNumber: 8,
          radius: '65%',
          center: ['75%', '55%'],
          axisLine: {
              lineStyle: {
                  color: [
                      [1, '#AE96A6']
                  ],
              }
          },
          splitLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              show: false
          },
          anchor: {},
          pointer: {
              show: false
          },
          title: {},
          detail: {
              offsetCenter: [0, 0],
              formatter: [
                `{a|冲入电量 }{b|${app.charge_info.coulomb} AH}`,
                `{a|        }{b|${app.charge_info.watthour} WH}`,
                  '{a|本次充电时间 }{b| min}',
                  '{a|内部温度 }{b| °C}',
                  '{a|环境温度 }{b| °C}'
              ].join('\n'),
              rich: {
                  a: {
                      fontSize: 12,
                      fontWeight: 800,
                      fontFamily: "Arial",
                      lineHeight: 22,
                      color: '#fff',
                      align: 'left'
                  },
                  b: {
                      fontWeight: 600,
                      fontFamily: "Arial",
                      lineHeight: 22,
                      color: '#fff',
                      align: 'left'
                  }
              }
          },
          progress: {
              show: true,
              width: 3,
              itemStyle: {
                  color: '#fff'
              }
          },
          data: [{
              value: 100,
              name: ''
          }]
      },
      {
          name: 'gauge 8',
          type: 'gauge',
          min: 0,
          max: 1,
          startAngle: 125,
          endAngle: 55,
          splitNumber: 2,
          radius: '65%',
          center: ['75%', '55.3%'],
          axisLine: {
              lineStyle: {
                  width: 9,
                  color: [
                      [0.15, '#f00'],
                      [1, 'rgba(255, 0, 0, 0)']
                  ],
              }
          },
          splitLine: {
              distance: -14,
              length: 16,
              lineStyle: {
                  color: '#fff',
                  width: 4
              }
          },
          axisTick: {
              distance: -14,
              length: 10,
              lineStyle: {
                  color: '#fff',
                  width: 2
              }
          },
          axisLabel: {
              distance: 12,
              fontSize: 12,
              fontWeight: 800,
              fontFamily: "Arial",
              color: '#fff',
              formatter: function(value) {
                  if (value === 0.5) {
                      return '2/4';
                  }
                  if (value === 1) {
                      return '4/4';
                  }
                  return value;
              }
          },
          progress: {
              show: true,
              width: 5,
              itemStyle: {
                  color: '#fff'
              }
          },
          
          pointer: {
              show: false
          },
          title: {},
          detail: {
              offsetCenter: ['10%', '-56%'],
              formatter: '{a|0}{b| %}',
              rich: {
                  a: {
                      fontSize: 12,
                      fontWeight: 800,
                      fontFamily: "Arial",
                      color: '#fff'
                  },
                  b: {
                      fontWeight: 600,
                      fontFamily: "Arial",
                      color: '#fff'
                  }
              }
          },
          data: [{
              value: 0.5,
              name: ''
          }]
      } ,
      // center below :gauge 9 ,
      {
        name: 'gauge 9',
        type: 'gauge',
        min: 0,
        max: 8,
        z: 10,
        splitNumber: 8,
        radius: '90%',
        axisLine: {
            lineStyle: {
                width: 14,
                color: [
                    [1, '#000']
                ],
            }
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        anchor: {},
        pointer: {
            show: false
        },
        title: {
            show: false
        },
        detail: {
            offsetCenter: ['0%', '75%'],
            formatter:  [ 
                `{a|温度补偿 ${app.charge_info.temperature_comp}}{b| mV/°C} {a|线损补偿 ${app.charge_info.circuit_comp}}{b| mΩ}`,
                `{a|预充时间 ${app.charge_info.time_yc}}{b| min} {a|快充时间 ${app.charge_info.time_kc}}{b| 小时}`,
                `{a|标充时间 ${app.charge_info.time_bc}}{b| 小时} {a|维护时间 ${app.charge_info.time_wh}}{b| 分钟}`
             ].join('\n'),
            rich: {
                a: {
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: "Arial",
                    color: '#fff',
                    align: 'center',
                    padding: [0, 0, 0, 0]
                },
                b: {
                    fontSize: 14,
                    fontWeight: 800,
                    fontFamily: "Arial",
                    color: '#fff',
                    rotate: 30,
                    padding: [0, 0, 0, 0]
                }
            }
        },
        // value is speed
        data: [{
            value: 2,
            name: ''
        }]
      },
      //version guage 10
      {
        name: 'gauge 10',
        type: 'gauge',
        min: 0,
        max: 8,
        z: 10,
        splitNumber: 8,
        radius: '90%',
         axisLine: {
            lineStyle: {
                width: 14,
                color: [
                    [1, '#000']
                ],
            }
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        anchor: {},
        pointer: {
            show: false
        },
        title: {
            show: false
        },
        detail: {
            offsetCenter: ['160%', '90%'],
            formatter:  [ 
                `{a|软件版本 ${app.charge_info.soft_ver}}{b|} {a|硬件版本 ${app.charge_info.hard_ver}}{b| }` 
             ].join('\n'),
            rich: {
                a: {
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: "Arial",
                    color: '#fff',
                    align: 'center',
                    padding: [0, 0, 0, 0]
                },
                b: {
                    fontSize: 14,
                    fontWeight: 800,
                    fontFamily: "Arial",
                    color: '#fff',
                    rotate: 30,
                    padding: [0, 0, 0, 0]
                }
            }
        },
        // value is speed
        data: [{
            value: 2,
            name: ''
        }]
      },
             //version guage 11
             {
                name: 'gauge 10',
                type: 'gauge',
                min: 0,
                max: 8,
                z: 10,
                splitNumber: 8,
                radius: '90%', 
                 axisLine: {
                    lineStyle: {
                        width: 14,
                        color: [
                            [1, '#000']
                        ],
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                anchor: {},
                pointer: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    offsetCenter: ['-180%', '-80%'],
                    formatter:  [ 
                        `{a|充电器功率: ${app.charge_info.charger_power} }{b|W} ` ,
                        `{a|电池类型： ${app.charge_info.batterytype} }{b|${app.charge_info.battery_series} 串}   ` 
                     ].join('\n'),
                    rich: {
                        a: {
                            fontSize: 12,
                            fontWeight: 800,
                            fontFamily: "Arial",
                            color: '#fff',
                            align: 'center',
                            padding: [0, 0, 0, 0]
                        },
                        b: {
                            fontSize: 12,
                            fontWeight: 800,
                            fontFamily: "Arial",
                            color: '#fff',
                            rotate: 30,
                            padding: [0, 0, 0, 0]
                        }
                    }
                },
                // value is speed
                data: [{
                    value: 2,
                    name: ''
                }]
              }    
  ]
  }
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  chart.setOption(guage_option, true);
  myChart = chart
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    } 
  },
  onLoad: function(options) {
    let self = this
    setInterval(()=>{

      //current
      /*test
      app.charge_info.currentset = 20
      app.charge_info.maxcurrent = 40
      app.charge_info.currentnow = 20

      app.charge_info.voltageout = 50
      app.charge_info.voltagesetnow = 20;
     app.charge_info.voltageset_bc = 65

      app.charge_info.coulomb = 10
      app.charge_info.temperature_diode = 40
      app.charge_info.temperature_Ambient = 35
      app.charge_info.time_yc = 60
      app.charge_info.temperature_comp = 30
      */
      //
      if (!app.bt.connected){
        wx.navigateBack({
            delta: 1,  //返回的层数
          })
      }
      guage_option.series[0].max=parseInt(app.charge_info.currentset)
      guage_option.series[1].max=parseInt(app.charge_info.currentset)
      guage_option.series[1].data[0].value = app.charge_info.currentnow; 
      guage_option.series[2].data[0].value = parseInt(app.charge_info.currentset); 
      guage_option.series[3].data[0].value = app.charge_info.maxcurrent; 
      //voltage
      guage_option.series[4].data[0].value = app.charge_info.voltageout;
      guage_option.series[5].data[0].value = app.charge_info.voltagesetnow; 
      guage_option.series[6].data[0].value = app.charge_info.voltageset_bc; 
      //others
        guage_option.series[7].detail.formatter= [ 
            `{a|冲入电量 }{b|${app.charge_info.coulomb} AH}`,
            `{a|        }{b|${app.charge_info.watthour} WH}`,
            `{a|本次充电时间 ${app.charge_info.charger_time_now}}{b| min}`,
            `{a|内部温度 ${app.charge_info.temperature_diode}}{b| °C}`,
            `{a|环境温度 ${app.charge_info.temperature_Ambient}}{b| °C}`
        ].join('\n')
        // center bottom
        guage_option.series[9].detail.formatter = [ 
            `{a|温度补偿 ${app.charge_info.temperature_comp}}{b| mV/°C} {a|线损补偿 ${app.charge_info.circuit_comp}}{b| mΩ}`,
            `{a|预充时间 ${app.charge_info.time_yc}}{b| min} {a|快充时间 ${app.charge_info.time_kc}}{b| 小时}`,
            `{a|标充时间 ${app.charge_info.time_bc}}{b| 小时} {a|维护时间 ${app.charge_info.time_wh}}{b| 分钟}`
        ].join('\n')

        guage_option.series[10].detail.formatter=[ 
            `{a|软件版本 ${app.charge_info.soft_ver}}{b|} {a|硬件版本 ${app.charge_info.hard_ver}}{b| }`
         ].join('\n')

        guage_option.series[11].detail.formatter=[ 
            `{a|充电器功率: ${app.charge_info.charger_power} }{b|W} ` ,
            `{a|电池类型： ${app.charge_info.batterytype} }{b|${app.charge_info.battery_series} 串}   `
         ].join('\n')
      if (myChart){
        myChart.setOption(guage_option,true)
      }
   },1000)
 },
  onReady() {
  }
});
