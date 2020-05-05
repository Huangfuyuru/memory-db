const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      qs = require('querystring'),
      url = require('url');
      bodyParser = require("body-parser");
var userM = require('../database/dateMethod')

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


const num = require('./share/num'),
      praise = require('./share/praise');

//点击社区
router.get('/',async function(req,res,next){
    console.log('点击社区模块');
    var uid = Number(req.query.uid);
    var data = await userM.articleM.findAll();
    if(data===1){
        var info={code:1,msg:null};
    }else{
        var info = {code:0,msg:data};
    }
    res.json(info);
})

/* /share/num(praise) */
router.use('/num',num);
// router.use('/praise',praise);


module.exports = router;