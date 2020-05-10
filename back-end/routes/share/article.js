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
router.post('addarticle',async function(req,res,next){
        var name = req.body.name,
        imgurl = JSON.parse(req.body.imgurl),
        content = req.body.content,
        tag = req.body.tag,
        style = req.body.style,
        uid = JSON.parse(req.body.uid);
        var add = await  method.articleM.addarticle({
            name:name,
            imgurl:imgurl,
            tag:tag,
            content:content,
            style:style,
            uid:uid
        });
        var data = await method.articleM.findByUid(uid);
        if(data == 1){
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
    var data = await method.articleM.delarticle(id),
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
//添加关注之后不可再次出发
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
    console.log(data1);
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