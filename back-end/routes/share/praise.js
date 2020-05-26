/**
 * 文章获赞数接口
 */
const express = require('express'),
        router = express.Router(),
        qs = require('querystring'),
        url = require('url'),
        bodyParser = require("body-parser");
const {articleM,likeArticleM}= require("../../database/dateMethod");//引入数据库
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//用户给文章点赞
router.get('/addpraise', async function(req,res,next){
    console.log('给文章点赞');
    var request = qs.parse(url.parse(req.url).query);
    var article_id = Number(JSON.parse(request.article_id)) ;
    var user_id = Number(JSON.parse(request.user_id));
    var result = await articleM.addZanumById(article_id);
    var ddd = await articleM.findAll();
    // var zan = await method.likeArticleM.findByUid(user_id);
    console.log(article_id);
    console.log(user_id);
    console.log("ddd",ddd);
    if(result == 0){
        var data1 = await likeArticleM.addlikeArticle({
            article_id:article_id,
            user_id:user_id
        });
        //点赞字段
        for(var i=0;i<ddd.length;i++){ 
            if(ddd[i].id == article_id){
                ddd[i].addzan = true;
            }else{
                ddd[i].addzan = false;
            }
        }
        if(data1 == 0){
            // var data2 = await articleM.findById(article_id);
            var info = {code:0,msg:"点赞且增加到我喜欢成功"}
        }else{
            // var data2 = await articleM.findById(article_id);
            var info = {code:1,msg:"增加到我喜欢失败"};
        }
    }else{
        // var data2 = await articleM.findById(article_id);
        var info = {code:1,msg:"点赞失败"};
    }
    res.json(info);
})


//用户给文章取消点赞
router.get('/reducepraise', async function(req,res,next){
    console.log("取消文章点赞");
    var request = qs.parse(url.parse(req.url).query);
    var article_id = Number(JSON.parse(request.article_id)) ;
    var user_id = Number(JSON.parse(request.user_id));
    var result = await articleM.reduceZanumById(article_id);
    var ddd = await articleM.findAll();
    console.log("article_id",article_id);
    console.log("user_id",user_id);
    console.log("result",result);
    if(result == 0){
        var data1 = await likeArticleM.dellikeArticleByTwo(user_id,article_id);
        for(var i=0;i<ddd.length;i++){ 
            if(ddd[i].id == article_id){
                ddd[i].addzan = false;
            }
        }
        if(data1 == 0){
            // var data2 = await articleM.findById(article_id);
            var info = {code:0,msg:"取消点赞且删除我喜欢成功"};
        }else{
            // var data2 =await articleM.findById(article_id);
            var info = {code:1,msg:"删除我喜欢失败"};
        }
    }else{
        // var data2 = articleM.findById(article_id);
        var info = {code:1,msg:"取消点赞失败"};
    }
    res.json(info);

})
module.exports = router;