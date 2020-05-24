const express = require('express'),
        router = express.Router(),
        qs = require('querystring'),
        url = require('url'),
        bodyParser = require("body-parser");
const {articleM,likeArticleM}= require("../../database/dateMethod");//引入数据库
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//我的发布
router.get('/mypublish', async function(req,res,next){
    console.log("我的发布");
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.uid)) ;
    var result = await articleM.findByUid(uid);
    console.log("mypublish-uid",uid);
    console.log("mypublish",result);
    if(result == 0){
        var info = {code:0,msg:"查找我发布的文章成功",data:result};
    }else{
        var info = {code:1,msg:"查找我发布的文章失败",data:result}
    }
    console.log(info);
    res.json(info);
})

//我喜欢
router.get('/mylike', async function(req,res,next){
    console.log("我喜欢的文章");
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.user_id)) ;
    var result = await likeArticleM.findByUid(uid);
    console.log("mylike-uid",uid);
    console.log("mylike",result);
    console.log(result);
    if(result == 0){
        var info = {code:0,msg:"查找我喜欢的文章id列表成功",data:result};
    }else{
        var info = {code:1,msg:"查找我喜欢的文章id列表失败",data:result}
    }
    console.log(info);
    res.json(info);
})

//我喜欢文章的信息
router.get('/mylikemsg', async function(req,res,next){
    console.log("我喜欢具体信息");
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.user_id)) ;
    var mylikelist = await likeArticleM.findByUid(uid);
    var data = new Array(mylikelist.length);
    for (var i=0;i<mylikelist.length;i++){
        data[i] = await articleM.findById(mylikelist[i].article_id);
    }
    console.log("mylikemsg-uid",uid);
    console.log("mylikelist",mylikelist);
    if(result == 0){
        var info = {code:0,msg:"查找我喜欢文章信息列表成功",data:data};
    }else{
        var info = {code:1,msg:"查找我喜欢文章信息列表失败",data:data};
    }
    console.log(info);
    res.json(info);
})





module.exports = router;

