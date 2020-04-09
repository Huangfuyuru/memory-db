//注册后台
var express = require('express');
var router = express.Router();
var qs =require('querystring');
var bodyParser = require("body-parser");
var user =require('../database/dateMethod');
var info={code:1,msg:"请输入验证码"} //后端返回给前端的信息

//此中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
router.use(bodyParser.urlencoded({extended:true}));
//判断请求体的格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
router.use(bodyParser.json());


router.post('/confirm',async function(req,res,next){
    // console.log('req.body',req.body);
    // const data =await user.userM.findAll();
    // console.log(data);

    //可以注册返回0，不存在数据库中   
    var eTel = await user.userM.findTel(req.body.utel);
    console.log('eTel',eTel);
 
    //判断用户电话是否在DB中，若在不让注册，不在可以
    if(eTel === 0){ 
        //触发发送短信接口发送验证码
        //由于现在尚不能短信接口，则验证码输入什么都对
        info={
            code:0,
            msg:'验证码以成功发送，2分钟内有效'
        }
    }else{
        info={
            code:1,
            msg:'该手机号已注册过'
        }
    }
    res.json(info);

});


router.post('/', async function(req,res,next){
  
    // console.log('resign body',req.body);
    if(info.code == 1){
        console.log(info)
        res.json(info);
    }else{
        // console.log('code =0了');
        // console.log(info);
        // console.log('body2',req.body);

        if(req.body.confirm !== '' && req.body.passwd===req.body.pass){
            info={
                code:0,
                msg:'注册成功！'
            }
            // 插入数据
            var person ={
                pass:req.body.passwd,
                tel:req.body.utel
            }
            await user.userM.addUser(person);
            console.log(await user.userM.findAll());
            res.json(info);
        }else if(req.body.confirm ===''){
            info={
                code:1,
                msg:'验证码错误'
            }
            res.json(info);

        }else if(req.body.pass !== req.body.passwd){
            info={
                code:2,
                msg:'两次密码不一致'
            }
            res.json(info);
        }
    }

});


module.exports = router;
