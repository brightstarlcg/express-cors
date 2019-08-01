const express=require('express')
const app=express();
const path = require('path');



// 引入users.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const bodyParser = require('body-parser');



// 这里设置跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //控制options请求在xxx秒内不再发送
    res.header('Access-Control-Max-Age', '10000');
    //Access-Control-Allow-Headers ,可根据自定义请求头添加信息 mmd就是我添加自定义请求头
    res.header('Access-Control-Allow-Headers', 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, mmd');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE ,OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Access-Control-Allow-Credentials','true');

  //设置资源缓存

    res.header('Content-Type', 'text/css; charset=UTF-8');
    // res.header("Expires","Thu, 01 Aug 2019 09:07:10 GMT")
    res.header("Cache-Control","max-age=10,privite")
    // res.header("Last-Modified","Thu, 01 Aug 2019 04:56:22 GMT")
    // res.header("ETag","123e")
    if (req.method === 'OPTIONS') {
        //options请求先返回204 再发送get请求
      return  res.sendStatus(204);  
        next()     
    }
    next();
  });
  // 使用body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
console.log(path.join(__dirname, 'public'))


//路由
app.use('/api/users', users);
app.use('/api/profiles', profiles);
//ap是替代的别名
app.use('/ap/',express.static(path.join(__dirname, 'public')));

let port=process.env.PORT || 5000;

app.get('/',(req,res)=>{
   
   
   return res.send('我是服务端dddfff')
})

app.listen(port,()=>{
    console.log(`服务port${port}启动了`)
})