const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
const {childScoreM} = require("../../database/dateMethod");//引入数据库

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击成绩记录
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var cid = Number(request.cid);
    var data = await childScoreM.findBycid(cid);
    if(data == 1){
        console.log('null');
        res.json(null)
    }else{
        var len = data.length;
        for(var i=0;i<len;i++){
            var arr = [];
            var sub = data[i].subject;
            var sco = data[i].score;
            var len2 = sub.length;
            for(var j=0;j<len2;j++){
                arr.push({subject:sub[j],score:sco[j]})
            }
            delete data[i].subject;
            delete data[i].score;
            data[i].cont = arr;
        }
        res.json(data)
    }
    
})

//增加成绩记录
router.post('/cchildScore',async function(req,res,next){
    var stage = req.body.stage,
        subject = req.body.subject,
        score = req.body.score,
        setdate = req.body.setdate,
        cid = req.body.cid;
    var message = {
        stage:stage,
        subject:subject,
        score:score,
        setdate:setdate,
        cid:cid
    }

    
    var data =await childScoreM.addchildScore({message});
    if(data == 1){
        var message={code:1,msg:"添加失败",data:null};
    }else{
        var data1 = childScoreM.findBycid(cid);
        var len = data1.length;
        for(var i=0;i<len;i++){
            var arr = [];
            var sub = data1[i].subject;
            var sco = data1[i].score;
            var len2 = sub.length;
            for(var j=0;j<len2;j++){
                arr.push({subject:sub[j],score:sco[j]})
            }
            delete data1[i].subject;
            delete data1[i].score;
            data1[i].cont = arr;
        }
        var message={code:0,msg:"添加成功",data:data1};
    }
    res.json(message);
    
    
})

//删除学习记录
router.get('/dchildScore',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var cid = Number(request.cid);
    var id = Number(request.id);
    var data2 = await childScoreM.delchildScore(id);
    var data1 = await childScoreM.findBycid(cid);

    var len = data1.length;
    for(var i=0;i<len;i++){
        var arr = [];
        var sub = data1[i].subject;
        var sco = data1[i].score;
        var len2 = sub.length;
        for(var j=0;j<len2;j++){
            arr.push({subject:sub[j],score:sco[j]})
        }
        delete data1[i].subject;
        delete data1[i].score;
        data1[i].cont = arr;
    }
    
    if(data2 == 1){
        var message = {
            data:data1,
            msg:"删除失败"
        }
    }else{
        var message = {
            data:data1,
            msg:"删除成功"
        }
    }
    res.json(message)
})

module.exports = router;
