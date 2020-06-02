const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
const {commentM,userM} = require("../../database/dateMethod");//引入数据库

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var article_id = Number(request.article_id);
    var data = await commentM.findByArticleId(article_id);
    //console.log('data',data);
    if(data != 1){
       
        data = data.forEach(async function(item){
            var user_id = item.user_id;
            var person = await userM.findById(user_id);
            item.name = person.name;
            item.imgurl = person.imgurl;
            console.log('item',item);
            return item;
        });
        
        console.log('data',data);
        res.json(data);
    }else{
        res.json(null);
    }
    
})

//增加评论
router.post('/acomment',async function(req,res,next){
    var tag = req.body.tag;
    var article_id = Number(req.body.article_id);
    var answer_id = Number(req.body.answer_id);
    var host_id = Number(req.body.host_id);
    var user_id  = Number(req.body.user_id );
    var content = req.body.content;
    var data = await commentM.addcomment({
        tag:tag,
        article_id:article_id,
        answer_id:answer_id,
        host_id:host_id,
        user_id:user_id,
        content:content
    });
    if(data == 1){
        var message = {code:1,msg:"添加失败",data:null}
    }else{
        var data1 = await commentM.findByArticleId(article_id);
        var message = {code:0,msg:"添加成功",data:data1}
    }
    res.json(message)
})

//删除日记
router.get('/dcomment',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var id = Number(request.id);
    var article_id = Number(request.article_id);
    var data = await commentM.delcomment(id);
    var data1 = await commentM.findByArticleId(article_id)
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
