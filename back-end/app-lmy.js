// const express = require('express');

// // 引入模块
// const login = require('./routes/login');
// // const childGrow = require('./routes/childGrow');


// const app = new express();

// app.use('/login',login);
// app.use('/child/cgrowup',childGrow);

// app.listen(3000);
const express = require('express'),
    fs = require('fs'),
      app = new express(),
      login = require('./routes/login'), //登陆
      register =require('./routes/register'),  //注册
      child = require('./routes/child'),  //亲子
      img = require('./routes/img'),      //单张图片
      imgs = require('./routes/imgs'),    //多张图片
      voice = require('./routes/voice'),  //语音
      lover = require('./routes/lover'),
      share = require('./routes/share'),
      my = require('./routes/my'); //我的
      


//解决跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/my/child/delchild',function(req,res,next){
    var html=fs.readFileSync('./liumingying.html').toString('utf8');
    res.writeHead(200,{
        'Content-Type':'text/html;charset=UTF8',
        'Content-Length':'Buffer.byteLength(html)'
    });
    res.end(html);
})

//路由模块
app.use('/login',login);
app.use('/resign',register);
app.use('/child',child);
app.use('/img',img);
app.use('/imgs',imgs);
app.use('/voice',voice);
app.use('/lover',lover);

app.use('/share',share);
app.use('/my',my);

app.listen(3001);


    

