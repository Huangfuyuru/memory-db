//注册后台
var express = require('express');
var router = express.Router();
var qs =require('querystring');
var url = require('url');
var bodyParser = require("body-parser");
var user =require('../database/dateMethod');
var createCode = require('./nodemailer/tools');
var nodemail = require('./nodemailer/nodemailer')
var info={code:1,msg:"请输入验证码"} //后端返回给前端的信息
var tcode = "";
var time = "";

//此中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
router.use(bodyParser.urlencoded({extended:true}));
//判断请求体的格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
router.use(bodyParser.json());


//发送验证码

router.post('/email',async function(req,res,next){
        
    //console.log('body111',req.body);   
    var code = await createCode();
    console.log('code',code);
    //查看是否注册过，可注册：0；不可：1
    var result =await user.userM.findemail(req.body.email);
    if(result === 0 ){
     info={
        code:0,
        msg:'验证码已发送'   
        }   
      var mail={
            from:'18630129728@163.com',
            //主题
            subject:'记得APP验证码',
            //收件人
            to:req.body.email,
            text:'【记得】验证码: '+code+',您当前正在注册记得,十分钟内有效，请勿泄露给他人。'
        }
        tcode = code;
        console.log('tcode',tcode)
        time = (new Date()).getTime();
        await nodemail(mail);
        console.log('验证码已发送')

    }else{
        info={
            code:1,
            msg:'该邮箱已注册过'           
        }
    }
    res.json(info);
})

//点击注册
router.post('/message', async function(req,res,next){
    var name = req.body.name,
        mail = req.body.email,
        confirm = req.body.confirm,//验证码
        pass = req.body.pass;

    var result =await user.userM.findemail(mail);
    // console.log('result',result);
    if(result === 0){
        var now = (new Date()).getTime();
        if(confirm == tcode && now - time <= 600000 ){
            var person={
                email:mail,
                pass:pass,
                name:name
            };
            var add = await user.userM.addUser(person);
            if(add === 0 ){
                info={
                    code:0,
                    msg:"注册成功"
                }       
            }
        }else{
            if(pass != tcode){
                info={
                    code:1,
                    msg:"验证码错误"
                }
            }else if( now - time > 60000 ){
                info ={
                    code:2,
                    msg:"验证码已失效"
                }
            }
        }
    }else{
        info={
            code:3,
            msg:'该邮箱已注册过'    
        }
    }
  
    res.json(info);
    
});


module.exports = router;
