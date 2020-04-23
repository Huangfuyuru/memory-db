const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser"),
      url = require('url'),
      qs = require('qs');
//引入数据库
const {loverM,loveListM,loverDiaryM,loverPhotoM,loverImpDateM,loverPhotoListM,loverVoiceM} = require("../../database/dateMethod");

var info = {}
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//删除爱人
//（点击删除爱人发送的是用户id，
//点击确认删除给接口发请求发送的是爱人id然后删除）
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    // console.log(uid);
    var data =  await loverM.findIdByUid(uid);
    res.json(data)
})

//确认删除
router.get('/confirm',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var lid = Number(request.loversid);
    console.log(lid);
    var arr = [];
    async function delLover(lid){
        var loveList = await loveListM.delAllByLid(lid);
        var loverDiary = await loverDiaryM.delAllByLid(lid);
        var loverVoice = await loverVoiceM.delAllByLid(lid);
        var loverImpDate = await loverImpDateM.delAllByLid(lid);
        var loverPhotoList = await loverPhotoListM.findIdByLid(lid);
        if(loverPhotoList == 1){
            var lover = await loverM.delLover(lid);
            var data = await loverM.findIdByUid(uid);
        }else{
            await Promise.all(
                loverPhotoList.map(async function(item){
                    await loverPhotoM.delAllByPid(item.id);
                })
            )
            await childPhotoList.delAllByLid(lid);
            var lover = await loverM.delLover(lid);
            var data = await loverM.findIdByUid(uid);
        }
        console.log(data);
        if(data == 0){
            var message = {code:0,msg:"删除成功",data:data};
        }else{
            var message = {code:0,msg:"删除失败",data:null};
        }
        
        res.json(message)
    }
    
    delLover(lid);
})

module.exports = router;