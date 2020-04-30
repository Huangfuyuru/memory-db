const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
const {articleM} = require("../../database/dateMethod");//引入数据库

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击写文章
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.uid));
    var data = await articleM.findChildByUid(uid)
    if(data == 1){
        res.json(null)
    }else{
        res.json(data)
    }
})

//增加文章
router.post('/carticle',async function(req,res,next){
    var name = req.body.name;
    var imgurl = JSON.parse(req.body.imgurl);
    var content = req.body.content;
    var tag = req.body.tag;
    var num = req.body.num;
    var style = req.body.style;
    var uid = JSON.parse(req.body.uid);
    var data = await articleM.addarticle({
        name:name,
        imgurl:imgurl,
        content:content,
        tag:tag,
        num:num,
        style:style,
        uid:uid
    });
    if(data == 1){
        var message = {code:1,msg:"添加失败"}
    }else{
        var message = {code:0,msg:"添加成功"}
    }
    res.json(message)
})

//删除文章
router.get('/delarticle',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.uid));
    var id = Number(JSON.parse(request.id));
    var data = await articleM.delarticle(id);
    var data1 = await articleM.findChildByUid(uid);
    if(data == 1){
        if(data1 == 1){
            var message = {msg:"删除失败",data:null}
        }else{
            var message = {msg:"删除失败",data:data1}
        }
    }else{
        if(data1 == 1){
            var message = {msg:"删除成功",data:null}
        }else{
            var message = {msg:"删除成功",data:data1}
        }
    }
    res.json(message)
})

module.exports = router;
