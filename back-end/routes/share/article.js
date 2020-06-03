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

// 路由：/share/article
//添加文章
router.post('/addarticle',async function(req,res,next){
        console.log('添加文章',req.body);
        var uid = req.body.uid,
        content = req.body.content,
        tag = req.body.tag,
        style = req.body.style,
        imgurl = req.body.imgurl;
        var text={
            imgurl:imgurl,
            tag:tag,
            content:content,
            style:style,
            uid:uid
        }
        var add = await method.articleM.addarticle(text);
        var data = await method.articleM.findByUid(uid);
        if(add == 1){
            var message = {code:1,msg:"添加失败",data:null};
        }else{
            var message = {code:0,msg:"添加成功",data:data}
        }
        res.json(message);
})

//删除文章
router.get('/delarticle',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.uid));
    var id = Number(JSON.parse(request.id));
    var data = await method.articleM.delarticle(id);
    //删除文章之后把我喜欢里面的也删除
    var data2 = await method.likeArticleM.dellikeArticleByArt_id(id),
    //删除文章把他的评论也删掉
    data3 = await method.commentM.delcomment_art(id),
    data1 = await  method.articleM.findByUid(uid);
    
    if(data === 1){
        if(data1 === 1){
            var message = {code:1,msg:"删除失败",data:null}
        }else{
            var message = {code:1,msg:"删除失败",data:data1}
        }
    }else{
        if(data1 == 1){
            var message = {code:0,msg:"删除成功",data:null}
        }else{
            var message = {code:0,msg:"删除成功",data:data1}
        }
    }
    res.json(message);
})

//修改文章内容


//关注作者之后，不可再次触发
//添加关注
router.get('/interest', async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.uid));
    var fid = Number(JSON.parse(request.fid));
    var data = await method.friendsM.addfriends(uid,fid);
    var data1 = await method.friendsM.findByUser(uid);
    console.log(data1);
    if(data === 1){
        if(data1 === 1){
            var message = {code:1,msg:"添加失败",data:null}
        }else{
            var message = {code:1,msg:"添加失败",data:data1}
        }
    }else{
        if(data1 == 1){
            var message = {code:0,msg:"添加成功",data:null}
        }else{
            var message = {code:0,msg:"添加成功",data:data1}
        }
    }
    res.json(message);
})

//取消关注
router.get('/delinter', async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.uid));
    var fid = Number(JSON.parse(request.fid));
    var data = await method.friendsM.delfriends(uid,fid);
    var data1 = await method.friendsM.findByUser(uid);
    // console.log(data1);
    if(data === 1){
        if(data1 === 1){
            var message = {code:1,msg:"删除失败",data:null}
        }else{
            var message = {code:1,msg:"删除失败",data:data1}
        }
    }else{
        if(data1 == 1){
            var message = {code:0,msg:"删除成功",data:null}
        }else{
            var message = {code:0,msg:"删除成功",data:data1}
        }
    }
    res.json(message);
})

module.exports = router;