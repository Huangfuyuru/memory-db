const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser"),
      {childVoiceM} = require('../../database/dateMethod');

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击语音记事
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var data = await childVoiceM.findByCid(childsid);
    if(data == 1){
        data = null;
        res.json(data)
    }else{
        res.json(data)
    }
    
})

//增加语音
router.post('/ccsound',async function(req,res,next){
    var childsid = req.body.childsid;
    var name = req.body.name;
    var voiceurl = req.body.voiceurl;
    await childVoiceM.addChildVoice({name:name,voiceurl:voiceurl,cid:childsid});
    var data = await childVoiceM.findByCid(childsid);
    if(data == 1){
        var message = {data:[],msg:"添加失败"}
    }else{
        var message = {data:data,msg:"添加成功"}
    }
    res.json(message)
})

//删除语音
router.get('/crsound',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var childVoiceid = Number(request.childVoiceid);
    var data1 = await childVoiceM.delChildVoice(childVoiceid);
    var data = await childVoiceM.findByCid(childsid);
    if(data1 == 1){
        if(data == 1){
            var message = {data:null,msg:"删除失败"}
        }else{
            var message = {data:data,msg:"删除失败"}
        }
    }else{
        if(data == 1){
            var message = {data:null,msg:"删除成功"}
        }else{
            var message = {data:data,msg:"删除成功"}
        }
    }
    res.json(message)
})
module.exports = router;
