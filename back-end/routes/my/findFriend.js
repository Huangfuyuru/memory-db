const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {userM} = require("../../database/dateMethod");

var info = {};

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//查找用户（已知用户的email，根据email查找）
//（一个输入框，一个搜索按钮，输入框输入用户email，点击搜索进行对好友的查找）
router.post('/',async function(req,res,next){
    console.log(req.body);
    var email = req.body.email;
    console.log(email);
    //根据email查找用户id
    var data = await userM.findIdByemail(email);
    //根据id查找用户
    var findResult = await userM.findById(data);
    if(findResult == 0){
        // info = {code:0,msg:"查找成功"}
        // res.json(info)
        //输出所查找到的好友信息
        res.json(findResult);
    }else{
        info = {code:1,msg:"查找失败"};
        res.json(info);
    }
})

//点击找到的用户信息来添加好友   相当于二级页面
router.get('/addfriend',async function(req,res,next){
    
})


module.exports = router;