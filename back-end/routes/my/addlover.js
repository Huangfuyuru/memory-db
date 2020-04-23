const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {loverM} = require("../../database/dateMethod");

var info ={};//返回给前端的数据

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击增加爱人
// 爱人name，关系确认日期ldate，性别gender，用户uid
router.post('/',async function(req,res,next){
    console.log(req.body);
    var name = req.body.name;
    var ldate = req.body.ldate;
    var gender = req.body.gender;
    var uid = req.body.uid;
    console.log(req.body)
    console.log(ldate);
    console.log(name)
    var result = await loverM.addLover({
        name:name,
        ldate:ldate,
        gender:gender,
        uid:uid
    })
    if(result === 0){
        info = {code:0,msg:"添加成功"}
        res.json(info)
    }else{
        info = {code:1,msg:"添加失败"}
        res.json(info)
    }
    
})

module.exports = router;
