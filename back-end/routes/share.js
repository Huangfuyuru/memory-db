const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      qs = require('querystring'),
      url = require('url');
      bodyParser = require("body-parser");
var method = require('../database/dateMethod');

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


const article = require('./share/article'),
      classify= require('./share/classify'),
      comment = require('./share/comment'),
      num = require('./share/num'),
      praise = require('./share/praise');


//点击社区
router.get('/',async function(req,res,next){
    console.log('点击社区模块');
    var data = await method.articleM.findAll();
    var article = new Array();
    for(var i=0;i<data.length;i++){
        if(data[i].tag == true){
            console.log(i)
            var infor = await method.userM.findById(data[i].uid);
            data[i].uname = infor.name,
            data[i].pic = infor.imgurl
            article.push(data[i]);
        }
    }
    // console.log(data);
    if(data===1){
        var info={code:1,msg:'请求失败',data:null};
    }else{
        var info = {code:0,msg:'请求成功',data:article};
    }
    res.json(info);
})

/* /share/num(praise) */
router.use('/article',article);
router.use('/classify',classify);
router.use('/comment',comment);
router.use('/num',num);
// router.use('/praise',praise);



module.exports = router;