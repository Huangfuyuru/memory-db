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
    if(result == 0){
        var info = {code:0,msg:"签到成功",data:result}
    }else{
        var info = {code:1,msg:"签到失败",data:null};
    }
    res.json(info)
})

module.exports = router;