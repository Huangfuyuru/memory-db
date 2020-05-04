const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {userM} = require("../../database/dateMethod");

var info = {};

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击签到
// num , 用户uid
router.post('/',async function(req,res,next){
    console.log(req.body);
    // var num = req.body.num;
    //用户的id
    var uid = req.body.uid;
    //控制台输出 验证
    console.log(req.body);
    // console.log(num);
    console.log(uid);

    var result = await userM.changeNum(uid);
    if(result == 0){
        info = {code:0,msg:"签到成功",data:result}
        res.json(info)
    }else{
        info = {code:1,msg:"签到失败",data:null};
        res.json(info)
    }

})

module.exports = router;