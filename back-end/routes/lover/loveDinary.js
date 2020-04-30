const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    qs = require('querystring'),
      url = require('url'),
    lover = require('../../database/dateMethod');
var info ={};//返回给前端的数据


//此中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
router.use(bodyParser.urlencoded({extended:true}));
//判断请求体的格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
router.use(bodyParser.json());

// 匹配 /lover/ldairy
//点击日记
router.get('/',async function(req,res,next){
    console.log('点击日记')
    var id = req.query.loverid;
    console.log('loverid',id);
    // console.log('查看日记所有信息',await lover.loverDiaryM.findAll());
    var data =await lover.loverDiaryM.findByLid(id);
    if(data === 1){
        info ={code:0,msg:null}
    }else{
        info ={code:0,msg:data};
    }
    res.json(info);
    
});

//增加日记
router.post('/addDairy',async function(req,res,next){
    console.log('添加日记',req.body);
    var id = req.body.loverid;
    var text ={
        lid:id,
        content:req.body.content,
        imgurl:JSON.parse(req.body.imgurl),
        setdate:req.body.setdate,
        weather:req.body.weather,
        bgimg:req.body.bgimg,
        backcolor:req.body.backcolor,
    }
    var addDairy = await lover.loverDiaryM.addLoverDiary(text);
    console.log('addDairy',addDairy);
    if(addDairy ===0){
        var data =await lover.loverDiaryM.findByLid(id);
        info = {
            code:0,
            msg:data
        };
        res.json(info);
    }else{
        info ={
            code :1,
            msg:null,
            des:'增加日记失败'
        };
        res.json(info);
    }
    
});

router.get('/delDairy',async function(req,res,next){
    console.log('删除日记');
    var lid = Number(req.query.loverid);
    var daid = Number(req.query.loverDiaryid);
    console.log('dairyid',daid);
    var delDai = await lover.loverDiaryM.delLoverDiary(daid);

    var data =await lover.loverDiaryM.findByLid(lid);
    console.log('data',data);

    if(delDai === 0){
        if(data === 1){
            info ={code:0,msg:null,des:'删除成功，用户日记数为0'};
        }else{
            info ={code:0,msg:data,des:'删除成功'};
        }
    }else{
        info ={code:1,msg:data,des:'删除失败'};
        
    }
    res.json(info);

})

module.exports = router;