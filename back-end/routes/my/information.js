const express = require('express'),
      router = express.Router(),
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
    var uname = req.body.uname;
    var pass = req.body.pass;
    var uid = req.body.uid;
    var gender = req.body.gender;
    var id = req.body.id;
    console.log(id);
    console.log("uid",uid);
    var result = await userM.changeById(uid,{
        name:uname,
        pass:pass,
        gender:gender
    })
    console.log(result);
    if(result === 0){
        //修改用户成功后需要给前端返回userM的修改后的信息
        var data1 = await userM.findById(uid);
        var message = {code:0,msg:"用户修改成功",data:data1}
    }else{
        var message = {code:1,msg:"用户修改失败",data:null}
    }
    res.json(message);
})


module.exports = router;