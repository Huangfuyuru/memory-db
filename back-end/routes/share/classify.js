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
//点击关注类，返回用户关注人的所有文章
router.get('/interest',async function(req,res,next){
    var request =  qs.parse(url.parse(req.url).query);
    var uid = JSON.parse(request.uid);
    var article = new Array();
    var like = await method.friendsM.findByUser(uid);
    var zan = await method.likeArticleM.findByUid(uid);
    // console.log('like',like);
    
    var data = await method.articleM.findAll();
    for(var i=0;i<data.length;i++){
        var comment = await method.commentM.findByArticleId(data[i].id);
        if(comment.length ==undefined){
            data[i].comment = 0;
        }
        else{
            data[i].comment = comment.length;
        }
        // console.log(data[i].uid)
        var infor = await method.userM.findById(data[i].uid);
        data[i].uname = infor.name;
        data[i].pic = infor.imgurl;

        //是否点赞
        for(var m=0;m<zan.length;m++){
            if(data[i].id == zan[m].article_id){
                data[i].addZan = true;
                article.push(data[i]);
            }
        }
        for(var j=0;j<like.length;j++){
           var fid =  like[j].friend_id
           if(fid == data[i].uid && data[i].tag == true){
            data[i].like = true;
            article.push(data[i]);
           }
        }
        if(data[i].uid === uid && data[i].tag ===true){
            var infor = await method.userM.findById(uid);
            data[i].uname = infor.name;
            data[i].pic = infor.imgurl;
            data[i].like = true;
            data[i].iflike =true;
            article.push(data[i]);
        }
    }
    if(data===1){
        if(like ===1){
            var info = {code:1,msg:'你还没有关注的人哦',data:article}
        }else{
            var info={code:1,msg:'请求失败',data:null};
        }
    }else{
        if(like ===1){
            var info = {code:1,msg:'你还没有关注的人哦',data:article}

        }else{
            var info = {code:0,msg:'请求成功',data:article};
        }
    }
    res.json(info);
});



module.exports = router;