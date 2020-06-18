let express = require('express')
let app = express()
let http = require('http').Server(app)
let io = require('socket.io')(http)

//设置CORS
// app.all('*',function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Credentials','true');
//   next();
// });

app.get('/', (req, res) => res.send('Hello'))

app.use('/data', require('./router/user'))


io.on('connection', socket => {
  setInterval(() => {
    socket.emit('open', {
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
  }, 1000)

  socket.on('disconnect', () => {
    socket.broadcast.emit('关闭')
  })
})

let server = http.listen(8888, '127.0.0.1', () => {
  let host = server.address().address
  let port = server.address().port

  console.log(`Server running at http://${host}:${port}`)
})


