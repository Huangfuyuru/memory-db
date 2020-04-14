const express = require('express'),
    fs= require('fs');
var app =new express();
var login = require('./routes/login');
var register =require('./routes/register');
var img = require('./routes/img.js');
var imgs= require('./routes/imgs')
var voice = require('./routes/voice.js');
var lover = require('./routes/lover');



app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


// //若url中输入的不存在会进入'/'下面的（及index）里面找
// app.use('/',index);

app.get('/resign/email',function(req,res,next){
    var html=fs.readFileSync('./testing-yxd/yangxindi.html').toString('utf8');
    res.writeHead(200,{
        'Content-Type':'text/html;charset=UTF8',
        'Content-Length':'Buffer.byteLength(html)'
    });
    res.end(html);
});

app.get('/resign/message',function(req,res,next){
    var html=fs.readFileSync('./testing-yxd/message.html').toString('utf8');
    res.writeHead(200,{
        'Content-Type':'text/html;charset=UTF8',
        'Content-Length':'Buffer.byteLength(html)'
    });
    res.end(html);
});



app.get('/lover/loveList/list',function(req,res,next){
    var html=fs.readFileSync('./testing-yxd/loveDinary.html').toString('utf8');
    res.writeHead(200,{
        'Content-Type':'text/html;charset=UTF8',
        'Content-Length':'Buffer.byteLength(html)'
    });
    res.end(html);
})


//登录
app.use('/login',login);

//注册 
app.use('/resign',register);

//单张头像上传
app.use('/img',img);

//多张图片上传
app.use('/imgs',imgs)

//音频上传
app.use('/voice',voice);

//语音记事
app.use('/lover',lover);

app.listen(3002);
