const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {childM} = require("../../database/dateMethod");

var info = {};

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击增加亲子
//亲子name，出生日期birthday，性别gender，用户uid
router.post('/',async function(req,res,next){
    console.log(req.body);
    var name = req.body.name;
    var birthday = req.body.birthday;
    var gender = req.body.gender;
    var uid = req.body.uid;
    console.log(req.body)
    console.log(birthday);
    console.log(name)
    var result = await childM.addChild({
        name:name,
        birthday:birthday,
        gender:gender,
        uid:uid
    })
    if(result == 0){
        info = {code:0,msg:"添加成功",data:result}
        res.json(info)
    }else{
        info = {code:1,msg:"添加失败",data:null};
        res.json(info)
    }
    
})

module.exports = router;