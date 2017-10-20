/**
 * Created by hale on 2017/7/17.
 */

let express = require('express')
let http = require('http')
let request = require('superagent')

let app = express()
let HOST = 'http://api.douban.com/v2/movie'

/**
 * CORS support.
 */

app.all('*', function (req, res, next) {
  if (!req.get('Origin')) return next()
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET')
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if (req.method === 'OPTIONS') return res.send(200)
  next()
})
/**
 * 正在热映
 */
app.get('/in_theaters', function (req, res) {
  let sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res)
  sreq.on('end', () => {
    console.log('end')
  })
})

/**
 * 即将上映
 */
app.get('/coming_soon', function (req, res) {
  let sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res)
  sreq.on('end', () => {
    console.log('end')
  })
})

/**
 * 电影详情
 */
app.get('/subject/:id', function (req, res) {
  let sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res)
  sreq.on('end', () => {
    console.log('end')
  })
})

/**
 * 电影搜索
 */
app.get('/search', function (req, res) {
  let sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res)
  sreq.on('end', () => {
    console.log('end')
  })
})

/**
 * 影人条目信息
 */
app.get('/celebrity/:id', function (req, ress) {
  request.get(HOST + req.originalUrl)
    .end((err, res) => {
      if (err) {
        ress.send('error')
      }
      ress.send(res.body)
    })
})

app.listen(8081, function () {
  console.log('HTTP Server is running in http://127.0.0.1:8081')
})
