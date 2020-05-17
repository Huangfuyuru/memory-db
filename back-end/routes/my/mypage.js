const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
//引入数据库
const {userM,friendsM} = require("../../database/dateMethod");

var info = {}
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//修改头像
router.post('/',async function(req,res,next){
    var uid = req.body.uid;
    var imgurl = req.body.imgurl;
    var data = await userM.changeImgById(uid,imgurl)
    console.log("uid",uid);
    console.log("imgurl",imgurl);
    if(data == 1){
        var message={code:1,msg:"修改头像失败",data:null};
    }else{
        var data1 = await userM.findById(uid);
        var message={code:0,msg:"修改头像成功",data:data1};
    }
    res.json(message);
})

//关注
//根据用户uid 根据friend_id 确定关注人数
router.get('/focus',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.user_id));
    var data = await friendsM.findByUser(uid);
    console.log(uid);
    console.log(data);
    if(data == 1){
        var message={code:1,msg:"返回信息失败",data:null};
    }else{
        var message={code:0,msg:"返回信息成功",data:data};
    }
    res.json(message);
})



//粉丝
//
router.get('/fans',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.user_id);
    var data = await friendsM.findByPerson(uid);
    console.log(uid);
    console.log(data);
    if(data == 1){
        var message={code:1,msg:"返回信息失败",data:null};
    }else{
        var message={code:0,msg:"返回信息成功",data:data};
    }
    res.json(message);
})

router.get('/friendmsg',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.friend_id));
    var data = await userM.findById(uid);
    console.log(uid);
    console.log(data);
    if(data == 1){
        var message={code:1,msg:"获取好友信息失败",data:null};
    }else{
        var message={code:0,msg:"获取好友信息成功",data:data};
    }
    res.json(message);
})




module.exports = router;