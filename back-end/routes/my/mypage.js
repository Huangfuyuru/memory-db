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
    console.log("关注",uid);
    console.log("关注",data);
    if(data == 1){
        var message={code:1,msg:"用户暂无关注",data:0};
    }else{
        var message={code:0,msg:"返回关注信息",data:data};
    }
    res.json(message);
})



//粉丝
//
router.get('/fans',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.user_id);
    var data = await friendsM.findByPerson(uid);
    console.log("粉丝",uid);
    console.log("粉丝",data);
    if(data == 1){
        var message={code:1,msg:"用户暂无粉丝",data:0};
    }else{
        var message={code:0,msg:"返回粉丝信息",data:data};
    }
    res.json(message);
})

router.get('/focusmsg',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.user_id));
    var focuslist = await friendsM.findByUser(uid);
    var datas = new Array(500);
    for(var i = 0 ;i< focuslist.length;i++){
        datas[i] = await userM.findById(focuslist[i].friend_id);
    }
    console.log("关注id",uid);
    console.log(focuslist);
    console.log("关注数据",datas);
    if(focuslist == 1){
        var message={code:1,msg:"暂无关注信息",data:null};
    }else{
        var message={code:0,msg:"获取关注信息成功",data:datas};
    }
    res.json(message);
})

router.get('/fansmsg',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.user_id);
    var fanslist = await friendsM.findByPerson(uid);
    var data = new Array(500);
    for(var i = 0 ;i< fanslist.length;i++){
        data[i] = await userM.findById(fanslist[i].user_id);
    }
    console.log("粉丝id",uid);
    console.log(fanslist);
    console.log("粉丝数据",data);
    if(fanslist == 1){
        var message={code:1,msg:"暂无粉丝信息",data:null};
    }else{
        var message={code:0,msg:"获取粉丝信息成功",data:data};
    }
    res.json(message);
})


module.exports = router;

// var request = qs.parse(url.parse(req.url).query);
// var uid = Number(JSON.parse(request.friend_id));
// var data = await userM.findById(uid);
// console.log(uid);
// console.log(data);
// if(data == 1){
//     var message={code:1,msg:"暂无粉丝信息",data:null};
// }else{
//     var message={code:0,msg:"获取粉丝信息成功",data:data};
// }
// res.json(message);