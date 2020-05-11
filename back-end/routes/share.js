const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      qs = require('querystring'),
      url = require('url');
      bodyParser = require("body-parser");
var method = require('../database/dateMethod');

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


const article = require('./share/article'),
      classify= require('./share/classify'),
      comment = require('./share/comment'),
      num = require('./share/num'),
      praise = require('./share/praise');


//点击社区
router.get('/',async function(req,res,next){
    console.log('点击社区模块');
    var request =  qs.parse(url.parse(req.url).query);
    var uid = JSON.parse(request.uid);
    var article = new Array();
    var like = await method.friendsM.findByUser(uid);
    var data = await method.articleM.findAll();
    for(var i=0;i<data.length;i++){
        for(var j=0;j<like.length;j++){
           var fid =  like[j].friend_id
            //关注人的文章
           if(fid == data[i].uid && data[i].tag == true){
            //    console.log(data[i].uid)
            var infor = await method.userM.findById(fid);
            data[i].uname = infor.name;
            data[i].pic = infor.imgurl;
            data[i].like = true;
            article.push(data[i]);
           }
           //未关注人的文章
           if(fid != data[i].uid && data[i].tag == true){
            //    console.log(data[i].uid)
            var infor = await method.userM.findById(fid);
            data[i].uname = infor.name;
            data[i].pic = infor.imgurl;
            data[i].like = false;
            article.push(data[i]);
           }
        }

        if(data[i].uid === uid && data[i].tag ===true){
            var infor = await method.userM.findById(fid);
            data[i].uname = infor.name,
            data[i].pic = infor.imgurl,
            data[i].like = true;
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
})

/* /share/num(praise) */
router.use('/article',article);
router.use('/classify',classify);
router.use('/comment',comment);
router.use('/num',num);
// router.use('/praise',praise);



module.exports = router;