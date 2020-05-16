const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
//引入数据库
const {userM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//设置页面
router.post('/',async function(req,res,next){
    // var imgurl = req.body.uimage;
    // var uimage = JSON.parse(req.body.uimage);
    var name = req.body.name;
    var pass = req.body.pass;
    var gender = req.body.gender;
    var uid = req.body.uid;
    var result = await userM.changeById({
        name:name,
        pass:pass,
        gender:gender
    },uid);
    console.log(name);
    console.log(pass);
    console.log(gender);
    console.log(uid);
    
    if(result == 0){
        //修改用户成功后需要给前端返回userM的修改后的信息
        var data1 = await userM.findById(uid);
        var message = {code:0,msg:"用户修改成功",data:data1}
    }else{
        var data1 = await userM.findById(uid);
        var message = {code:1,msg:"用户修改失败",data:data1}
    }
    res.json(message);
})

router.get('/password',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var data = await userM.findById(uid);
    if(data == 1){
        var message = {code:1,msg:"传达密码失败",data:null}
    }else{
        var message = {code:0,msg:"传达密码成功",data:data}
    }
    res.json(message);
})



module.exports = router;