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

router.get('/',async function(req,res,next){
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