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
    var unlike = new Array();
    var like = await method.friendsM.findByUser(uid);
    var data = await method.articleM.findAll();
  

    for(var i=0;i<data.length;i++){
        if(data[i].tag == true){
            var infor = await method.userM.findById(data[i].uid);
            data[i].uname = infor.name;
            data[i].pic = infor.imgurl;
            article.push(data[i]);
        }
        for(var j=0;j<like.length;j++){
           var fid =  like[j].friend_id
            //关注人的文章
           if(fid == data[i].uid && data[i].tag == true){
            data[i].like = true;
           }
        }
    }
    // array_diff(data,like);
    // for(var i =0;i<array_diff.length;i++){
    //     console.log(array_diff[i])
    // }

    // console.log(array_diff.length)
    // console.log(Array.from(new Set(unlike)))
    // console.log(article);
    if(data===1){
        var info={code:1,msg:'请求失败',data:null};
    }else{
        var info = {code:0,msg:'请求成功',data:article};
    }
    res.json(info);
})

// function array_diff(a, b) {
//         for(var i=0;i<b.length;i++)
//         {
//           for(var j=0;j<a.length;j++)
//           {
//             if(a[j]==b[i]){
//               a.splice(j,1);
//               j=j-1;
//             }
//           }
//         } 
//     console.log(a)
//       return a;
// }

/* /share/num(praise) */
router.use('/article',article);
router.use('/classify',classify);
router.use('/comment',comment);
router.use('/num',num);
router.use('/praise',praise);



module.exports = router;