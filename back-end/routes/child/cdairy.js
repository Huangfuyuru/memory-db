const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
const {childDiaryM} = require("../../database/dateMethod");//引入数据库

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击日记
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(JSON.parse(request.childsid));
    console.log('childsid',childsid)
    var data = await childDiaryM.findByCid(childsid);
    if(data == 1){
        res.json(null)
    }else{
        res.json(data)
    }
})

//增加日记
router.post('/ccdairy',async function(req,res,next){
    var childsid = req.body.childsid;
    var backcolor = req.body.backcolor;
    var content = req.body.content;
    var imgurl = JSON.parse(req.body.imgurl);
    var setdate = req.body.setdate;
    var weather = req.body.weather;
    var bgimg = req.body.bgimg;
    var data = await childDiaryM.addChildDiary({
        backcolor:backcolor,
        content:content,
        imgurl:imgurl,
        cid:childsid,
        setdate:setdate,
        weather:weather,
        bgimg:bgimg
    });
    if(data == 1){
        var message = {code:1,msg:"添加失败",data:null}
    }else{
        var data1 = await childDiaryM.findByCid(childsid);
        var message = {code:0,msg:"添加成功",data:data1}
    }
    res.json(message)
})

//删除日记
router.get('/crdairy',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(JSON.parse(request.childsid));
    var childDiaryid = Number(JSON.parse(request.childDiaryid));
    var data = await childDiaryM.delChildDiary(childDiaryid);
    var data1 = await childDiaryM.findByCid(childsid);
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

//修改日记
router.post('/change',async function(req,res,next){
    var childsid = req.body.childsid;
    var id = req.body.id;
    var backcolor = req.body.backcolor;
    var content = req.body.content;
    var imgurl = JSON.parse(req.body.imgurl);
    var setdate = req.body.setdate;
    var weather = req.body.weather;
    var bgimg = req.body.bgimg;
    var data = await childDiaryM.changeById({
        backcolor:backcolor,
        content:content,
        imgurl:imgurl,
        id:id,
        setdate:setdate,
        weather:weather,
        bgimg:bgimg
    });
    if(data == 1){
        var message = {code:1,msg:"修改失败",data:null}
    }else{
        var data1 = await childDiaryM.findByCid(childsid);
        var message = {code:0,msg:"修改成功",data:data1}
    }
    res.json(message)
})
module.exports = router;
