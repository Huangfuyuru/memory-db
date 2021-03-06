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
    var uid = Number(request.uid) ;
    var result = await articleM.findByUid(uid);
    console.log("mypublish-uid",uid);
    console.log("mypublish",result);
    if(result == 1){
        var info = {code:1,msg:"查找我发布的文章失败",data:null};
    }else{
        var info = {code:0,msg:"查找我发布的文章成功",data:result};
    }
    // console.log(info);
    res.json(info);
})

//我喜欢
router.get('/mylike', async function(req,res,next){
  console.log("我喜欢具体信息");
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.user_id);
    var mylikelist = await likeArticleM.findByUid(uid);
    var datas = new Array(mylikelist.length);
    // console.log("mylikemsg-uid",uid);
    // console.log("mylikelist",mylikelist);
    for (var i=0;i<mylikelist.length;i++){
        datas[i] = await articleM.findById(mylikelist[i].article_id);
    }
    var info = {code:0,msg:"查找我喜欢文章信息列表成功",data:datas};
    // console.log(datas);
    res.json(info);
})


module.exports = router;
