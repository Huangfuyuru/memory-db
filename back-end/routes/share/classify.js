const express = require('express'),
        router = express.Router(),
        qs = require('querystring'),
        url = require('url'),
        bodyParser = require("body-parser");
const method = require("../../database/dateMethod");//引入数据库
var info = "";
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//路由 /share/classify
//点击关注，返回用户关注人的所有文章
router.get('/interest',async function(req,res,next){
    var request =  qs.parse(url.parse(req.url).query);
    var uid = JSON.parse(request.uid);
    var article = new Array();
    var like = await method.friendsM.findByUser(uid);
    // console.log('like',like);
    var data = await method.articleM.findAll();
    for(var i=0;i<data.length;i++){
        for(var j=0;j<like.length;j++){
           fid =  like[j].friend_id
        //    console.log(fid);
           if(fid == data[i].uid && data[i].tag == true){
               console.log(data[i].uid)
            var infor = await method.userM.findById(fid);
            data[i].uname = infor.name,
            data[i].pic = infor.imgurl
            article.push(data[i]);
           }
        }
    }
    if(data===1){
        var info={code:1,msg:'请求失败',data:null};
    }else{
        var info = {code:0,msg:'请求成功',data:article};
    }
    res.json(info);
});


//点击推荐
router.get('/recommend',async function(req,res,next){
    var request =  qs.parse(url.parse(req.url).query);
    var uid = JSON.parse(request.uid);
    var article = new Array();
    var like = await method.friendsM.findByUser(uid);
    // console.log('like',like);
    var data = await method.articleM.findAll();

    for(var i=0;i<data.length;i++){
        for(var j=0;j<like.length;j++){
            //查寻好友id
           fid =  like[j].friend_id
            // console.log(fid);
           if(fid != data[i].uid && data[i].tag == true){
               console.log(data[i].uid)
            var infor = await method.userM.findById(fid);
            data[i].uname = infor.name,
            data[i].pic = infor.imgurl
            article.push(data[i]);
           }
        }
    }
    if(data===1){
        var info={code:1,msg:'请求失败',data:null};
    }else{
        var info = {code:0,msg:'请求成功',data:article};
    }
    res.json(info);
});


//点击亲子
router.get('/child',async function(re,res,next){
    var data = await method.articleM.findAll();
    var article = new Array();
    for(var i=0;i<data.length;i++){
        if(data[i].tag == true){
            // console.log(i)
            var infor = await method.userM.findChildByUid(data[i].uid);
            data[i].uname = infor.name,
            data[i].pic = infor.imgurl
            article.push(data[i]);
        }
    }
    if(data===1){
        var info={code:1,msg:'请求失败',data:null};
    }else{
        var info = {code:0,msg:'请求成功',data:article};
    }
    res.json(info);
});

//点击爱人
router.get('/lover',async function(re,res,next){
    var data = await method.articleM.findAll();
    var article = new Array();
    for(var i=0;i<data.length;i++){
        if(data[i].tag == true){
            // console.log(i)
            var infor = await method.userM.findLoverByUid(data[i].uid);
            data[i].uname = infor.name,
            data[i].pic = infor.imgurl
            article.push(data[i]);
        }
    }
    // console.log(data);
    if(data===1){
        var info={code:1,msg:'请求失败',data:null};
    }else{
        var info = {code:0,msg:'请求成功',data:article};
    }
    res.json(info);
});
module.exports = router;