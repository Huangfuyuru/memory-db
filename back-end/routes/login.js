const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
const {userM} = require("../database/dateMethod");//引入数据库
const fs = require('fs');
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/',async function(req,res,next){
    console.log('hello')
    var tel = req.body.utel;
    var pass = req.body.pass;
    var getUser = await userM.findTel(tel);
    if(getUser == 0){
        var message = {code:1,id:null,msg:"该手机号没有注册"}
    }else{
        var data = await userM.login(tel,pass);
        if(data == 1){
            var message = {code:1,id:null,msg:"手机号或密码有误"}
        }else{
            var getId = data.id;
            var data1 = await userM.findById(getId)
            var message = {code:0,id:getId,msg:"登陆成功",data:data1}
        }
    }
    res.json(message)
})

//测试
// router.get('/',function(req,res,next){ 
//     var fileContent = fs.readFileSync(`E:\\fight_blink\\wechat-group\\back-end\\app-hf.html`);
//     res.writeHead(200, {"Content-Type":"text/html"});
//     res.end(fileContent);
// })

module.exports = router;



