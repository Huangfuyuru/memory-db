const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
const {userM} = require("../database/dateMethod");//引入数据库
const fs = require('fs');
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/',async function(req,res,next){
   
    var mail = req.body.email;
    var pass = req.body.upass;
    var getUser = await userM.findemail(mail);
    if(getUser == 0){
        var message = {code:1,id:null,msg:"该邮箱未注册，请先注册"}
    }else{
        var data = await userM.login(mail,pass);
        if(data == 1){
            var message = {code:1,id:null,msg:"邮箱或密码有误"}
        }else{
            var username = '用户' + mail.substring(0,6);
            var message = {code:0,data:{"id":data.id,"name":data.name,"gender":data.gender,"imgurl":data.imgurl,"num":data.num},msg:username+',欢迎使用记得'}
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



