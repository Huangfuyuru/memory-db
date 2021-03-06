const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
//引入数据库
const {loverM,loveListM,loverDiaryM,loverPhotoM,loverImpDateM,loverPhotoListM,loverVoiceM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击爱人列表
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var data = await loverM.findIdByUid(uid);
    console.log(data)
    if(data == 1){
        res.json(null)
    }else{
        res.json(data);
    }
})
//增加爱人
router.post('/addlover',async function(req,res,next){
    var name = req.body.name;
    var ldate = req.body.ldate;
    var gender = req.body.gender;
    var uid = req.body.uid;
    var data = await loverM.addLover({
        name:name,
        ldate:ldate,
        gender:gender,
        uid:uid
    })
    if(data == 1){
        var message={code:1,msg:"添加失败",data:null};
    }else{
        var data1 = await loverM.findIdByUid(uid);
        var message={code:0,msg:"添加成功",data:data1};
    }
    res.json(message);
})

//删除爱人
router.get('/dellover',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var lid = Number(JSON.parse(request.lid));
    var uid = Number(JSON.parse(request.uid));
    var loveList = await loveListM.delAllByLid(lid);
    var loverDiary = await loverDiaryM.delAllByLid(lid);
    var loverVoice = await loverVoiceM.delAllByLid(lid);
    var loverImpDate = await loverImpDateM.delAllByLid(lid);
    var loverPhotoList = await loverPhotoListM.findIdByLid(lid);
    if(loverPhotoList == 1){ 
        var data = await loverM.delLover(lid);
        console.log("进入");
        if(data == 0){
            var data1 = await loverM.findIdByUid(uid);
            var message = {code:0,msg:"爱人相册为空，删除成功",data:data1};
        }else{
            var data1 = await loverM.findIdByUid(uid);
            var message = {code:1,msg:"爱人相册为空，删除失败",data:data1};
        }
    }else{
        await Promise.all(
            loverPhotoList.map(async function(item){
                await loverPhotoM.delAllByPid(item.id);
            })
        )
        await childPhotoList.delAllByLid(lid);
        var data = await loverM.delLover(lid);
        if(data == 0){
            var data1 = await loverM.findIdByUid(uid);
            var message = {code:0,msg:"删除成功",data:data1};
        }else{
            var data1 = await loverM.findIdByUid(uid);
            var message = {code:1,msg:"删除失败",data:data1};
        }
    }
    res.json(message)
})
    
    module.exports = router;

     