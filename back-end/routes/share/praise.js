/**
 * 文章获赞数接口
 */
const express = require('express'),
        router = express.Router(),
        qs = require('querystring'),
        url = require('url'),
        bodyParser = require("body-parser");
const {articleM}= require("../../database/dateMethod");//引入数据库
var info = "";
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//用户给文章点赞
router.post('/addpraise', async function(req,res,next){
    console.log('给文章点赞');
    var id = req.body.id;
    var result = await articleM.addZanumById(id);
    if(result == 0){
        info = {code:0,msg:"点赞成功",data:result}
        res.json(info)

    }else{
        info = {code:1,msg:"点赞失败",data:null};
        res.json(info)
    }
})


//用户给文章取消点赞
router.post('/reducepraise', async function(req,res,next){
    console.log("取消文章点赞");
    var id = req.body.id;
    var result = await articleM.reduceZanumById(id);
    if(result == 0){
        info = {code:0,msg:"取消点赞成功",data:result}
        res.json(info)
    }else{
        info = {code:1,msg:"取消点赞成功",data:null};
        res.json(info)
    }

})