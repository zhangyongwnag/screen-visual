let express = require('express')
let app = express()
let http = require('http')
let https = require('https')
let cheerio = require('cheerio')
let path = require('path')

app.use(express.static(path.resolve(__dirname,'public')))

app.get('/', (req,res) => {
  res.send('init')
})

app.get('/data',(req,res) => {
  // 搜索关键词d
  let word = req.query.word
  // 题库列表，只针对环保知识！！！
  let urlList = [
    'http://127.0.0.1:8888/test.html',
    'http://www.123js.cn/NewsDetail.aspx?id=108167',
    'http://www.southmoney.com/redianxinwen/202004/5572346.html',
    'http://www.southmoney.com/redianxinwen/202004/5572346_2.html',
    'http://www.southmoney.com/redianxinwen/202004/5572346_3.html',
    'http://www.southmoney.com/redianxinwen/202004/5572346_4.html',
    'http://www.mnw.cn/edu/news/2273900.html',
    'https://sbc.seu.edu.cn/2012/0914/c5569a59206/page.htm',
    'https://shouyou.3dmgame.com/gl/183199.html',
    // 'https://www.dyhzdl.cn/k/doc/6b134c265ff7ba0d4a7302768e9951e79a896918.html',
    // 'https://www.dyhzdl.cn/k/doc/bec45615d0f34693daef5ef7ba0d4a7302766cbb.html',
    // 'https://www.dyhzdl.cn/k/doc/c9d5007babea998fcc22bcd126fff705cc175c33.html',
    // 'https://www.dyhzdl.cn/k/doc/eea944c6dc88d0d233d4b14e852458fb770b38c5.html',
    // 'https://www.dyhzdl.cn/k/doc/f47d73a5c0c708a1284ac850ad02de80d4d806dc.html',
    'https://www.thepaper.cn/newsDetail_forward_7635100',
    'https://baidu.com',
    'https://www.gzkp.org.cn/shxcs/29962.html',
    'http://www.laneva.com.cn/news/220756.html',
    'http://www.6688dongdong.cn/zhishi/xitongzhishi/26395.html',
    'http://www.hxnews.com/news/hxjw/jdsg/202004/22/1887187.shtml',
    'http://www.wendangku.net/doc/9b4ff5a1f9c75fbfc77da26925c52cc58bd690f2.html',
    'http://www.wendangku.net/doc/9b4ff5a1f9c75fbfc77da26925c52cc58bd690f2-2.html',
    'http://www.wendangku.net/doc/9b4ff5a1f9c75fbfc77da26925c52cc58bd690f2-3.html',
    'http://www.wendangku.net/doc/9b4ff5a1f9c75fbfc77da26925c52cc58bd690f2-4.html',
    'http://gd.huatu.com/2020/0422/1727229.html',
    'http://gd.huatu.com/2020/0422/1727229_2.html',
    'http://gd.huatu.com/2020/0422/1727229_3.html',
  ]
  let promiseList = []
  let result = []

  let getResult = url => {
    let protocol = url.indexOf('https') != -1 ? https : http
    return new Promise((resolve,reject) => {
      protocol.get(url,response => {
        let chunks = []
        let size = 0
        response.on('data',function (chunk) {
          chunks.push(chunk)
          size += chunk.length
        })
        response.on('end',function () {
          let data = Buffer.concat(chunks,size)
          let html = data.toString()
          // let $ = cheerio.load(html)
          // if ($.innerHTML.indexOf(word) != -1){
          //   result.push(url)
          // }
          if (html.indexOf(word) != -1){
            resolve(url)
          }else {
            resolve('Not Found')
          }
        })
      })
    })
  }

  urlList.map(item => {
    promiseList.push(getResult(item))
  })

  Promise.all(promiseList)
    .then(response => {
      res.send(response.filter(item => item != 'Not Found'))
    })
    .catch(err => {
      res.send('Not Found')
    })
})

let server = app.listen(8888, '127.0.0.1', () => {
  let host = server.address().address
  let port = server.address().port

  console.log(`Server running at http://${host}:${port}`)
})
