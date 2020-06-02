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
    console.log("article_id",article_id);
    console.log("user_id",user_id);
    if(result == 0){
        // var ifhave = await likeArticleM.findByUid(user_id);
        // for (var j =0;j<ifhave.length ;j++){
        //     if (ifhave[i].article_id == article_id){
                
        //     }
        // }

        //  //点赞字段
        //  var zan = await likeArticleM.findByUid(user_id);
        //  for(var i=0;i<ddd.length;i++){ 
        //      for(var m=0;m<zan.length;m++){
        //          if(ddd[i].id == zan[m].article_id){
        //              ddd[i].addZan = zan[m].zan;
        //              console.log (i);
        //              console.log ("ddd[i].addZan",ddd[i].addZan);
        //          }
        //      }
        //  }

        //添加到我喜欢
        var data1 = await likeArticleM.addlikeArticle({
            article_id:article_id,
            user_id:user_id
        });
        if(data1 == 0){
             //点赞字段
             for(var i=0;i<ddd.length;i++){ 
                if(ddd[i].id == article_id){
                    ddd[i].addZan = true;
                    console.log (i);
                    console.log ("ddd[i].addZan",ddd[i].addZan);
                }
            }
            var info = {code:0,msg:"点赞且增加到我喜欢成功",data:ddd}
        }else{
            var info = {code:1,msg:"增加到我喜欢失败",data:ddd};
        }
    }else{
        var info = {code:1,msg:"点赞失败"};
    }
    res.json(info);
    console.log(info);
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
        if(data1 == 0){
            //取消点赞字段
            for(var i=0;i<ddd.length;i++){ 
                if(ddd[i].id == article_id){
                    ddd[i].addZan = false;
                    console.log (i);
                    console.log ("ddd[i].addZan",ddd[i].addZan);
                }
            }
            // var zan = await likeArticleM.findByUid(user_id);
            // for(var i=0;i<ddd.length;i++){ 
            //     for(var m=0;m<zan.length;m++){
            //         if(ddd[i].id == zan[m].article_id){
            //             ddd[i].addZan = zan[m].zan;
            //         }
            //     }
            // }
            var info = {code:0,msg:"取消点赞且删除我喜欢成功",data:ddd};
        }else{
            var info = {code:1,msg:"删除我喜欢失败",data:ddd};
        }
    }else{
        var info = {code:1,msg:"取消点赞失败"};
    }
    res.json(info);
    console.log(info);
})
module.exports = router;