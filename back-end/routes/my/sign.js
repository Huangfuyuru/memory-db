const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
//引入数据库
const {userM} = require("../../database/dateMethod");

var info = {};
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击签到
//用户uid
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var result = await userM.changeNum(uid);
    console.log(uid);
    if(result == 0){
        var data1 = await userM.findById(uid);
        var message = {code:0,msg:"签到成功",data:data1}
    }else{
        var data1 = await userM.findById(uid);
        var message = {code:1,msg:"签到失败",data:data1};
    }
    res.json(message)
})

module.exports = router;