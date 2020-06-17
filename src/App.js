import React, {Component} from 'react';
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import Header from './components/Header'
import Table from "./components/Table";
// import CountUp from 'react-countup'
import Loading from './components/Loading'
import 'wowjs/css/libs/animate.css'
import ReactWOW from 'react-wow'

let socket = require('socket.io-client')('http://127.0.0.1:8888')

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      echartsList: new Map(), // echarts绘制的结果
      tableList: [],
      translateY: 0,
    }
  }

  componentDidMount() {
    // 监听窗口变化
    window.addEventListener('resize', this.resizeEcharts)

    /***********************socket方式，需要启动node服务器*****************************/

    // socket.on('open', data => {
    //   console.log(data)
    //   if (this.state.loading) {
    //     this.setState({
    //       loading: false
    //     }, () => {
    //       this.actionRender(data)
    //     })
    //   }else {
    //     this.actionRender(data)
    //   }
    // })

    /***********************模式方式*****************************/
    setTimeout(() => {
      this.setState({
        loading: false
      }, () => {
        this.actionRender({
          scrollData: {
            province: '北京',
            type: '5G',
            cover: parseInt(Math.random() * 100) + '%',
            time: new Date().toLocaleString()
          },
          circleInfo: [
            {
              name: '省覆盖率',
              value: parseInt(Math.random() * 100),
              per: parseInt(Math.random() * 100) + '%',
            },
            {
              name: '市覆盖率',
              value: parseInt(Math.random() * 100),
              per: parseInt(Math.random() * 100) + '%',
            },
            {
              name: '区覆盖率',
              value: parseInt(Math.random() * 100),
              per: parseInt(Math.random() * 100) + '%',
            },
            {
              name: '县覆盖率',
              value: parseInt(Math.random() * 100),
              per: parseInt(Math.random() * 100) + '%',
            }
          ],
          cityUserInfo: {
            xData: ['北京', '天津', '上海', '深圳'],
            province: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)],
            city: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)]
          },
          useUserInfo: [
            {
              name: '北京',
              value: parseInt(Math.random() * 100)
            },
            {
              name: '上海',
              value: parseInt(Math.random() * 100)
            },
            {
              name: '深圳',
              value: parseInt(Math.random() * 100)
            },
            {
              name: '安徽',
              value: parseInt(Math.random() * 100)
            },
            {
              name: '天津',
              value: parseInt(Math.random() * 100)
            },
            {
              name: '包头',
              value: parseInt(Math.random() * 100)
            },
            {
              name: '呼市',
              value: parseInt(Math.random() * 100)
            },
            {
              name: '石家庄',
              value: parseInt(Math.random() * 100)
            },
            {
              name: '杭州',
              value: parseInt(Math.random() * 100)
            },
            {
              name: '太原',
              value: parseInt(Math.random() * 100)
            },
          ],
          mapInfo: [
            {name: "南海诸岛", value: 0},
            {name: '北京', value: parseInt(Math.random() * 1000)},
            {name: '天津', value: parseInt(Math.random() * 1000)},
            {name: '上海', value: parseInt(Math.random() * 1000)},
            {name: '重庆', value: parseInt(Math.random() * 1000)},
            {name: '河北', value: parseInt(Math.random() * 1000)},
            {name: '河南', value: parseInt(Math.random() * 1000)},
            {name: '云南', value: parseInt(Math.random() * 1000)},
            {name: '辽宁', value: parseInt(Math.random() * 1000)},
            {name: '黑龙江', value: parseInt(Math.random() * 1000)},
            {name: '湖南', value: parseInt(Math.random() * 1000)},
            {name: '安徽', value: parseInt(Math.random() * 1000)},
            {name: '山东', value: parseInt(Math.random() * 1000)},
            {name: '新疆', value: parseInt(Math.random() * 1000)},
            {name: '江苏', value: parseInt(Math.random() * 1000)},
            {name: '浙江', value: parseInt(Math.random() * 1000)},
            {name: '江西', value: parseInt(Math.random() * 1000)},
            {name: '湖北', value: parseInt(Math.random() * 1000)},
            {name: '广西', value: parseInt(Math.random() * 1000)},
            {name: '甘肃', value: parseInt(Math.random() * 1000)},
            {name: '山西', value: parseInt(Math.random() * 1000)},
            {name: '内蒙古', value: parseInt(Math.random() * 1000)},
            {name: '陕西', value: parseInt(Math.random() * 1000)},
            {name: '吉林', value: parseInt(Math.random() * 1000)},
            {name: '福建', value: parseInt(Math.random() * 1000)},
            {name: '贵州', value: parseInt(Math.random() * 1000)},
            {name: '广东', value: parseInt(Math.random() * 1000)},
            {name: '青海', value: parseInt(Math.random() * 1000)},
            {name: '西藏', value: parseInt(Math.random() * 1000)},
            {name: '四川', value: parseInt(Math.random() * 1000)},
            {name: '宁夏', value: parseInt(Math.random() * 1000)},
            {name: '海南', value: parseInt(Math.random() * 1000)},
            {name: '台湾', value: parseInt(Math.random() * 1000)},
            {name: '香港', value: parseInt(Math.random() * 1000)},
            {name: '澳门', value: parseInt(Math.random() * 1000)}
          ],
          coverRate: {
            province: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)],
            city: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)]
          },
          data2: {
            province: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)],
            city: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)]
          },
          data3: [
            {value: parseInt(Math.random() * 600), name: '北京'},
            {value: parseInt(Math.random() * 600), name: '上海'},
            {value: parseInt(Math.random() * 600), name: '天津'},
            {value: parseInt(Math.random() * 600), name: '深圳'},
            {value: parseInt(Math.random() * 600), name: '杭州'}
          ]
        })
        setInterval(() => {
          this.actionRender({
            scrollData: {
              province: '北京',
              type: '5G',
              cover: parseInt(Math.random() * 100) + '%',
              time: new Date().toLocaleString()
            },
            circleInfo: [
              {
                name: '省覆盖率',
                value: parseInt(Math.random() * 100),
                per: parseInt(Math.random() * 100) + '%',
              },
              {
                name: '市覆盖率',
                value: parseInt(Math.random() * 100),
                per: parseInt(Math.random() * 100) + '%',
              },
              {
                name: '区覆盖率',
                value: parseInt(Math.random() * 100),
                per: parseInt(Math.random() * 100) + '%',
              },
              {
                name: '县覆盖率',
                value: parseInt(Math.random() * 100),
                per: parseInt(Math.random() * 100) + '%',
              }
            ],
            cityUserInfo: {
              xData: ['北京', '天津', '上海', '深圳'],
              province: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)],
              city: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)]
            },
            useUserInfo: [
              {
                name: '北京',
                value: parseInt(Math.random() * 100)
              },
              {
                name: '上海',
                value: parseInt(Math.random() * 100)
              },
              {
                name: '深圳',
                value: parseInt(Math.random() * 100)
              },
              {
                name: '安徽',
                value: parseInt(Math.random() * 100)
              },
              {
                name: '天津',
                value: parseInt(Math.random() * 100)
              },
              {
                name: '包头',
                value: parseInt(Math.random() * 100)
              },
              {
                name: '呼市',
                value: parseInt(Math.random() * 100)
              },
              {
                name: '石家庄',
                value: parseInt(Math.random() * 100)
              },
              {
                name: '杭州',
                value: parseInt(Math.random() * 100)
              },
              {
                name: '太原',
                value: parseInt(Math.random() * 100)
              },
            ],
            mapInfo: [
              {name: "南海诸岛", value: 0},
              {name: '北京', value: parseInt(Math.random() * 1000)},
              {name: '天津', value: parseInt(Math.random() * 1000)},
              {name: '上海', value: parseInt(Math.random() * 1000)},
              {name: '重庆', value: parseInt(Math.random() * 1000)},
              {name: '河北', value: parseInt(Math.random() * 1000)},
              {name: '河南', value: parseInt(Math.random() * 1000)},
              {name: '云南', value: parseInt(Math.random() * 1000)},
              {name: '辽宁', value: parseInt(Math.random() * 1000)},
              {name: '黑龙江', value: parseInt(Math.random() * 1000)},
              {name: '湖南', value: parseInt(Math.random() * 1000)},
              {name: '安徽', value: parseInt(Math.random() * 1000)},
              {name: '山东', value: parseInt(Math.random() * 1000)},
              {name: '新疆', value: parseInt(Math.random() * 1000)},
              {name: '江苏', value: parseInt(Math.random() * 1000)},
              {name: '浙江', value: parseInt(Math.random() * 1000)},
              {name: '江西', value: parseInt(Math.random() * 1000)},
              {name: '湖北', value: parseInt(Math.random() * 1000)},
              {name: '广西', value: parseInt(Math.random() * 1000)},
              {name: '甘肃', value: parseInt(Math.random() * 1000)},
              {name: '山西', value: parseInt(Math.random() * 1000)},
              {name: '内蒙古', value: parseInt(Math.random() * 1000)},
              {name: '陕西', value: parseInt(Math.random() * 1000)},
              {name: '吉林', value: parseInt(Math.random() * 1000)},
              {name: '福建', value: parseInt(Math.random() * 1000)},
              {name: '贵州', value: parseInt(Math.random() * 1000)},
              {name: '广东', value: parseInt(Math.random() * 1000)},
              {name: '青海', value: parseInt(Math.random() * 1000)},
              {name: '西藏', value: parseInt(Math.random() * 1000)},
              {name: '四川', value: parseInt(Math.random() * 1000)},
              {name: '宁夏', value: parseInt(Math.random() * 1000)},
              {name: '海南', value: parseInt(Math.random() * 1000)},
              {name: '台湾', value: parseInt(Math.random() * 1000)},
              {name: '香港', value: parseInt(Math.random() * 1000)},
              {name: '澳门', value: parseInt(Math.random() * 1000)}
            ],
            coverRate: {
              province: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)],
              city: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)]
            },
            data2: {
              province: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)],
              city: [parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000), parseInt(Math.random() * 1000)]
            },
            data3: [
              {value: parseInt(Math.random() * 600), name: '北京'},
              {value: parseInt(Math.random() * 600), name: '上海'},
              {value: parseInt(Math.random() * 600), name: '天津'},
              {value: parseInt(Math.random() * 600), name: '深圳'},
              {value: parseInt(Math.random() * 600), name: '杭州'}
            ]
          })
        }, 2000)
      })
    }, 1000)
  }

  actionRender = data => {
    let list = [...this.state.tableList,data.scrollData]
    this.setState({
      translateY: list.length > 5 ? this.state.translateY += 20 : this.state.translateY = 0,
      tableList: list
    })

    // 渲染省市区县覆盖率
    this.renderCircleInfo(data.circleInfo)
    // 渲染市区使用人数排行
    this.renderCityUserInfo(data.cityUserInfo)
    // 渲染使用人数数量
    this.renderUserInfo(data.useUserInfo)
    // 渲染地图覆盖率
    this.renderMapInfo(data.mapInfo)
    // 渲染5G覆盖率
    this.renderCoverRate(data.coverRate)

    this.render1()

    this.render2(data.data2)

    this.render3(data.data3)
  }

  // 渲染省市区县覆盖率数据
  renderCircleInfo = data => {
    let eCharts
    if (this.state.echartsList.has('renderCircleInfo')) {
      eCharts = this.state.echartsList.get('renderCircleInfo')
    } else {
      let dom = document.getElementById('circle_info')
      eCharts = echarts.init(dom)
    }
    let option = {
      color: ['#eb6161', '#facf22', '#41ddeb', '#6d69fa'],
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return `${params.marker} ${params.data.name}<br>数量 : ${params.data.value}<br>占比 : ${params.data.per || 0}`
        }
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        icon: 'circle',
        itemWidth: 13,
        itemHeight: 13,
        textStyle: {
          color: '#a1b4c4',
          fontSize: 13,
        },
        data: data
      },
      series: [
        {
          radius: ['50%', '70%'],
          type: 'pie',
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return `${params.name}\n\n${params.value}\n\n${params.data.per}`
              },
              textStyle: {
                fontSize: 12
              },
              position: 'outside'
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 20,
              length2: 40
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            borderWidth: 5,
            borderColor: '#072a5b'
          },
          name: '风险类型分布',
          data: data
        },
        {
          name: '外边框',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          center: ['50%', '50%'],
          radius: ['75%', '75%'],
          label: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 0,
              name: '外边框',
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  borderColor: '#0e5e8b'
                }
              }
            }
          ]
        },
        {
          name: '内边框',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false,
          center: ['50%', '50%'],
          radius: ['35%', '35%'],
          label: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 0,
              name: '内边框',
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  borderColor: '#0e5e8b'
                }
              }
            }
          ]
        },
      ]
    }
    eCharts.setOption(option, true)
    this.setState(state => {
      state.echartsList.set('renderCircleInfo', eCharts)
      return state
    })
  }

  // 渲染5G市区使用人数排行
  renderCityUserInfo = data => {
    let eCharts
    if (this.state.echartsList.has('renderCityUserInfo')) {
      eCharts = this.state.echartsList.get('renderCityUserInfo')
    } else {
      let dom = document.getElementById('city_user_info')
      eCharts = echarts.init(dom)
    }
    let option = {
      grid: {
        width: 'auto',
        top: 46,
        bottom: 18,
        left: 30,
        right: 0,
      },
      legend: {
        data: ['省', '市'],
        textStyle: {
          color: '#b0becc'
        },
        top: '1%',
        itemGap: 100
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          return `地区：${params[0].name}<br>数量 : ${params[0].value} 个`
        }
      },
      xAxis: {
        data: data.xData,
        axisTick: {
          show: true
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#0f6290'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#b0becc'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#0f6290', '#0f6290']
          }
        },
      },
      yAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: '#0f6290'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#b0becc'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#0f6290', '#0f6290']
          }
        },
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          name: '省',
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#188df0'}
              ]
            )
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#2378f7'},
                  {offset: 0.7, color: '#2378f7'},
                  {offset: 1, color: '#83bff6'}
                ]
              )
            }
          },
          data: data.province
        },
        {
          name: '市',
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#188df0'}
              ]
            )
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#2378f7'},
                  {offset: 0.7, color: '#2378f7'},
                  {offset: 1, color: '#83bff6'}
                ]
              )
            }
          },
          data: data.city
        },
      ]
    };
    eCharts.setOption(option, true)
    this.setState(state => {
      state.echartsList.set('renderCityUserInfo', eCharts)
      return state
    })
  }

  // 渲染5G地区使用人数数量
  renderUserInfo = data => {
    let eCharts
    if (this.state.echartsList.has('renderUserInfo')) {
      eCharts = this.state.echartsList.get('renderUserInfo')
    } else {
      let dom = document.getElementById('user_info')
      eCharts = echarts.init(dom)
    }
    let color = ['#EB6161', '#FACF22', '#F3EB23', '#41DDEB', '#00E17D', '#6D69FA', '#3564A9', '#41DDEB', '#70B7EE', '#3892E6']
    let option = {
      grid: {
        width: 'auto',
        top: 20,
        bottom: 50,
        left: 10,
        right: 10,
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          return `${params[0].marker}${params[0].name}<br>数量 : ${params[0].value}个`
        }
      },
      xAxis: {
        show: true,
        type: 'value',
        axisTick: {
          show: true
        },
        axisLabel: {
          show: true,
          color: 'rgba(121,121,121,0.9)',
          // formatter: function (params) {
          //   return '12'
          // },
          textStyle: {
            color: 'rgba(121,121,121,0.9)'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#0f6290'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#0f6290', '#0f6290']
          }
        },
      },
      yAxis: {
        type: 'category',
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#0f6290'
          }
        },
        data: data.map(item => item.name)
      },
      series: [
        {
          id: 'bar',
          type: 'bar',
          barWidth: '16',
          label: {
            normal: {
              show: true,
              position: 'right'
            }
          },
          itemStyle: {
            color: function (params) {
              return color[params.dataIndex]
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}%',
            },
            shadowBlur: 16,
            shadowColor: 'rgba(40,40,40,0.5)'
          },
          data: data.map(item => item.value)
        }
      ]
    }
    eCharts.setOption(option, true)
    this.setState(state => {
      state.echartsList.set('renderUserInfo', eCharts)
      return state
    })
  }

  // 渲染地图覆盖率
  renderMapInfo = data => {
    let eCharts
    if (this.state.echartsList.has('renderMapInfo')) {
      eCharts = this.state.echartsList.get('renderMapInfo')
    } else {
      let dom = document.getElementById('map_info')
      eCharts = echarts.init(dom)
    }
    let option = {
      tooltip: {
        formatter: function (params, ticket, callback) {
          return params.seriesName + '<br />' + params.name + '：' + params.value
        }
      },
      grid: {
        width: 'auto',
        top: 20,
        bottom: 50,
        left: 10,
        right: 10,
      },
      visualMap: {
        type: 'piecewise',
        min: 0,
        max: 1500,
        top: 5,
        left: 10,
        text: ['高', '低'],
        inRange: {
          color: ['#e0ffff', '#006edd']
        },
        textStyle: {
          color: '#b0becc'
        },
        show: true
      },
      geo: {
        map: 'china',
        roam: false,
        zoom: 1.22,
        label: {
          normal: {
            show: true,
            fontSize: '10',
            color: 'rgba(0,0,0,0.7)'
          }
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(0, 0, 0, 0.2)',
          },
          emphasis: {
            areaColor: '#F3B329',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
      series: [
        {
          name: '覆盖率',
          type: 'map',
          geoIndex: 0,
          data: data
        }
      ]
    }
    eCharts.setOption(option, true)
    this.setState(state => {
      state.echartsList.set('renderMapInfo', eCharts)
      return state
    })
  }

  // 渲染5G覆盖率折线图
  renderCoverRate = data => {
    let eCharts
    if (this.state.echartsList.has('renderCoverRate')) {
      eCharts = this.state.echartsList.get('renderCoverRate')
    } else {
      let dom = document.getElementById('area_conver_rate')
      eCharts = echarts.init(dom)
    }
    var colors = ['#5793f3', '#d14a61', '#675bba'];

    let option = {
      color: colors,

      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['省覆盖率', '市覆盖率'],
        textStyle: {
          color: '#b0becc'
        },
        top: 6,
        right: 20,
        itemMap: 20
      },
      grid: {
        top: 70,
        bottom: 18,
        left: 30,
        right: 0
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#b0becc'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['#0f6290', '#0f6290']
            }
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#0f6290'
            },
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return '降水量  ' + params.value
                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
              }
            }
          },
          data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
        },
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[0]
            }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return '降水量  ' + params.value
                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
              }
            }
          },
          data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#b0becc'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#0f6290'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#0f6290', '#0f6290']
            }
          },
        }
      ],
      series: [
        {
          name: '省覆盖率',
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          data: data.province
        },
        {
          name: '市覆盖率',
          type: 'line',
          smooth: true,
          data: data.city
        }
      ]
    };
    eCharts.setOption(option, true)
    this.setState(state => {
      state.echartsList.set('renderCoverRate', eCharts)
      return state
    })
  }

  render1 = data => {
    let eCharts
    if (this.state.echartsList.has('render1')) {
      eCharts = this.state.echartsList.get('render1')
    } else {
      let dom = document.getElementById('data1')
      eCharts = echarts.init(dom)
    }
    let option = {
      visualMap: {
        show: false,
        top: 'middle',
        right: 10,
        color: ['red', 'yellow'],
        calculable: true
      },
      radar: {
        indicator: [
          {text: 'IE9+', max: 400},
          {text: 'Safari', max: 400},
          {text: 'Firefox', max: 400},
          {text: 'Chrome', max: 400}
        ]
      },
      series: (function () {
        var series = [];
        for (var i = 1; i <= parseInt(Math.random() * 100); i++) {
          series.push({
            name: '浏览器（数据纯属虚构）',
            type: 'radar',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            emphasis: {
              areaStyle: {
                color: 'rgba(0,250,0,0.3)'
              }
            },
            data: [{
              value: [
                (40 - i) * 10,
                (38 - i) * 4 + 60,
                i * 5 + 40,
                i * 12,
                i * i
              ],
              name: i + 2000 + ''
            }]
          });
        }
        return series;
      })()
    };

    eCharts.setOption(option, true)
    this.setState(state => {
      state.echartsList.set('render1', eCharts)
      return state
    })
  }

  render2 = data => {
    let eCharts
    if (this.state.echartsList.has('render2')) {
      eCharts = this.state.echartsList.get('render2')
    } else {
      let dom = document.getElementById('data2')
      eCharts = echarts.init(dom)
    }
    let option = {
      color: ['#3892E6'],
      grid: {
        top: 0,
        bottom: 1,
        left: 0,
        right: 1
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#0f6290', '#0f6290']
          }
        },
        axisLine: {
          onZero: true,
          lineStyle: {
            color: '#0f6290'
          },
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#0f6290', '#0f6290']
          }
        },
        axisLine: {
          onZero: true,
          lineStyle: {
            color: '#0f6290'
          },
        },
      },
      series: [
        {
          data: data.province,
          type: 'line',
          smooth: true,
        },
        {
          data: data.city,
          type: 'line',
          smooth: true,
        },
      ]
    };

    eCharts.setOption(option, true)
    this.setState(state => {
      state.echartsList.set('render2', eCharts)
      return state
    })
  }

  render3 = data => {
    let eCharts
    if (this.state.echartsList.has('render3')) {
      eCharts = this.state.echartsList.get('render3')
    } else {
      let dom = document.getElementById('data3')
      eCharts = echarts.init(dom)
    }
    let option = {

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          data: data.sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: '#b0becc'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };


    eCharts.setOption(option, true)
    this.setState(state => {
      state.echartsList.set('render3', eCharts)
      return state
    })
  }

  // 重拍重绘echarts图表
  resizeEcharts = () => {
    this.state.echartsList.forEach(item => {
      // item.resize()
      setTimeout(() => {
        item.resize()
      }, 200)
    })
  }

  render() {
    let {loading} = this.state
    if (loading) {
      return (
        <Loading/>
      )
    } else {
      return (
        <div className='wrap'>
          <div className='section_side'>
            <ReactWOW animation='fadeInLeftBig'>
              <section style={{width: '100%', height: '50%', marginBottom: '2%'}}>
                <Header title='5G省市区县覆盖率'/>
                <div id='circle_info' style={{width: '80%', height: '93%', margin: '-20px 0 0 10%'}}></div>
              </section>
            </ReactWOW>
            <ReactWOW animation='bounceInLeft'>
              <section style={{width: '100%', height: '50%'}}>
                <div id='city_user_info' style={{width: '100%', height: '100%'}}></div>
              </section>
            </ReactWOW>
          </div>
          <div className='section_middle'>
            <ReactWOW animation='flash'>
              <section style={{height: '10%', marginBottom: '1.3%', display: 'flex'}}>
                <div className='section_middle_count'>
                  <div style={{color: '#eb6161', fontSize: '24px'}} start={0} end={parseInt(Math.random() * 10000)}
                           suffix=' 个'
                           duration={4} separator=','/>
                  <div>总人数</div>
                </div>
                <div className='section_middle_count'>
                  <div style={{color: '#facf22', fontSize: '24px'}} start={0} end={parseInt(Math.random() * 100)}
                           suffix=' %' duration={4}
                           separator=','/>
                  <div>覆盖率</div>
                </div>
                <div className='section_middle_count'>
                  <div style={{color: '#facf22', fontSize: '24px'}} start={0} end={parseInt(Math.random() * 1000)}
                           suffix=' 个' duration={4}
                           separator=','/>
                  <div>市数量</div>
                </div>
                <div className='section_middle_count'>
                  <div style={{color: '#facf22', fontSize: '24px'}} start={0} end={parseInt(Math.random() * 100)}
                           suffix=' dB' duration={4}
                           separator=','/>
                  <div>信号强度</div>
                </div>
              </section>
            </ReactWOW>
            <ReactWOW animation='bounceIn'>
              <section style={{width: '100%', marginBottom: '1.3%', height: '50%'}}>
                <div id='map_info' style={{width: '100%', height: '100%'}}></div>
              </section>
            </ReactWOW>
            <ReactWOW animation='fadeInUpBig'>
              <section style={{width: '100%', marginBottom: '1.3%', height: '38.9%', padding: 0}}>
                <Table tableList={this.state.tableList} translateY={this.state.translateY}/>
              </section>
            </ReactWOW>
          </div>
          <div className='section_side' style={{width: '36%'}}>
            <div style={{width: '100%', height: '61%', marginBottom: '1.3%', display: 'flex'}}>
              <ReactWOW animation='bounceInDown'>
                <section style={{width: '56%', height: '100%'}}>
                  <Header title='5G地区人数排行TOP10'/>
                  <div id='user_info' style={{width: '100%', height: '100%'}}></div>
                </section>
              </ReactWOW>
              <div style={{width: '44%', height: '100%', marginLeft: '1.3%'}} className='three_echarts'>
                <ReactWOW animation='flipInX'>
                  <section style={{width: '100%%', height: '32.1%', marginBottom: '3.6%'}}>
                    <div id='data1' style={{width: '100%', height: '100%'}}></div>
                  </section>
                </ReactWOW>
                <ReactWOW animation='rotateIn'>
                  <section style={{width: '100%', height: '32.1%', marginBottom: '3.6%'}}>
                    <div id='data2' style={{width: '100%', height: '100%'}}></div>
                  </section>
                </ReactWOW>
                <ReactWOW animation='lightSpeedIn'>
                  <section style={{width: '100%', height: '32.1%'}}>
                    <div id='data3' style={{width: '100%', height: '100%'}}></div>
                  </section>
                </ReactWOW>
              </div>
            </div>
            <ReactWOW animation='rotateInUpLeft'>
              <section style={{width: '100%', marginBottom: '1.3%', height: '39%'}}>
                <Header title='5G地区覆盖率'/>
                <div id='area_conver_rate' style={{width: '100%', height: '100%', marginTop: '-35px'}}></div>
              </section>
            </ReactWOW>
          </div>
        </div>
      );
    }
  }
}
