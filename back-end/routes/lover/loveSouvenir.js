const express = require('express'),
      router = express.Router()
      bodyParser = require('body-parser'),
      lover = require('../../database/dateMethod');

var info = {};

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


//匹配路由  /lover/lsouvenir
router.get('/',async function(req,res,next){
    console.log('点击纪念日');
    var lid = Number(req.query.loverid);
    console.log('lid',lid);
    var data = await lover.loverImpDateM.findByPid(lid);
    console.log('data',data)
    if(data === 1){
        info ={code:0,msg:null}
    }else{
        info ={code:0,msg:data};
    }
    res.json(info);

});

//增加纪念日
router.post('/lcsouvenir',async function(req,res,next){
    console.log('增加纪念日');
    console.log(req.body);
    var daid = Number(req.body.loverid);
    var text ={
        name:req.body.name,
        imgurl:req.body.imgurl,
        lid:daid,
        date:req.body.date,
        content: req.body.content,
        voiceurl:req.body.voiceurl,
        mood:Number(req.body.mood),
        setdate:req.body.setdate
    }
    var addsou = await lover.loverImpDateM.addLoverImpDate(text);
    console.log(addsou);
    if(addsou ===0){
        var data = await lover.loverImpDateM.findByPid(daid);
        info ={
            code:0,
            msg:data
        };
        //console.log('增加纪念日后查看所有信息',await lover.loverImpDateM.findByPid(daid));
        res.json(info);
    }else{
        info={
            code:1,
            msg:'增加纪念日失败'
        }
        res.json(info);

    }
});

//删除纪念日
router.get('/delSouvenir',async function(req,res,next){
    console.log('删除日记 query',req.query)
    var lid = Number(req.query.loverid),
        limpDid = Number(req.query.loverImpDateid);

    var delsou =  await lover.loverImpDateM.delLoverImpDate(limpDid);
    console.log('delsou',delsou);
    var data = await lover.loverImpDateM.findByPid(lid);
    console.log('data',data);
    if (delsou === 0){
        if(data === 1){
            info ={code:0,msg:null}
        }else{
            info ={code:0,msg:data};
        }
    }else{
info={code:1,msg:"删除失败!"}
    }
    res.json(info);

    
})
//修改纪念日
router.post('/modsouvenir',async function(req,res,next){
    console.log('修改纪念日');
    // console.log(req.body);
    var daid = Number(req.body.loverid);
    var id = Number(req.body.id);
    var text ={
        name:req.body.name,
        imgurl:req.body.imgurl,
        id:id,
        date:req.body.date,
        setdate:req.body.setdate,
        content: req.body.content,
        voiceurl:req.body.voiceurl,
        mood:Number(req.body.mood)
    }
    var modsou = await lover.loverImpDateM.changeById(text);
    // console.log(addsou);
    if(modsou ===0){
        var data = await lover.loverImpDateM.findByPid(daid);
        info ={
            code:0,
            msg:'修改纪念日成功',
            data:data
        };
        // console.log('增加纪念日后查看所有信息',await lover.loverImpDateM.findByPid(daid));
        res.json(info);
    }else{
        info={
            code:1,
            msg:'修改纪念日失败',
            data:null
        }
        res.json(info);

    }
});
module.exports = router;
