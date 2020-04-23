const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {reportM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//消息反馈
router.post('/',async function(req,res,next){
    var uid = req.body.uid;
    var content = req.body.content;
    var result = await reportM.addReport({
        uid:uid,
        content:content
    })
    if(result !== 1){
        var message = {code:0,msg:"消息反馈成功"}
    }else{
        var message = {code:1,msg:"消息反馈失败"}
    }
    res.json(message)
    
})


module.exports = router;

