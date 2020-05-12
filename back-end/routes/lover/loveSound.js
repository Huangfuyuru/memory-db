const express = require('express'),
      router = express.Router(),
      qs =require('querystring'),
      bodyParser = require("body-parser"),
      lover =require('../../database/dateMethod');
var info={}; //后端返回给前端的信息

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


router.get('/',async function(req,res,next){
    console.log('点击语音记事');
    var lid = Number(req.query.loverid);
    console.log('sound query',req.query);
    var data =await lover.loverVoiceM.findByLid(lid);
    console.log(data);
    if(data === 1){
        info ={code:0,msg:null}
    }else{
        info ={code:0,msg:data};
    }
    res.json(info);
})

//增加语音
router.post('/lcsound',async function(req,res,next){
    console.log('增加语音');
    console.log(req.body);
    var lid = Number(req.body.loverid);
    var text ={
        voiceurl:req.body.voiceurl,
        name:req.body.name,
        lid:lid,
        setdate:req.body.setdate
    }
    var addVoice = await lover.loverVoiceM.addLoverVoice(text);
    console.log('addVoice',addVoice);
    var data = await lover.loverVoiceM.findByLid(lid);

    if(addVoice === 0){
        if(data === 1){
            info ={code:0,msg:null}
        }else{
            info ={code:0,msg:data};
        }
    }else{
        if(data === 1){
            info ={code:1,msg:null}
        }else{
            info ={code:1,msg:data};
        }
    }
    res.json(info);
})

//删除语音
router.get('/lrsound',async function(req,res,next){
    console.log('删除语音',req.query);
    var lid = Number(req.query.loverid),
    id = Number(req.query.loverVoiceid);
    var delvoice = await lover.loverVoiceM.delLoverVoice(id);
    var data = await lover.loverVoiceM.findByLid(lid);

    if(delvoice === 0){
        if(data === 1){
            info ={code:0,msg:null}
        }else{
            info ={code:0,msg:data};
        }
    }else{
        if(data === 1){
            info ={code:1,msg:null}
        }else{
            info ={code:1,msg:data};
        }
    }
    res.json(info);

})
module.exports = router;