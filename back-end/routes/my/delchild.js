const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser"),
      url = require('url'),
      qs = require('qs');
//引入数据库
const {childM,childAdolesceM,childDiaryM,childGrowM,childPhotoM,childPhotoListM,childVoiceM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//删除亲子
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var data =  await childM.findIdByUid(uid);
    res.json(data)
})

//确认删除
router.get('/confirm',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var cid = Number(request.cid);
    console.log(cid);
    var arr = [];
    async function delChild(cid){
        
        var childAdolesce = await childAdolesceM.delAllByCid(cid);
        var childGrow = await childGrowM.delAllByCid(cid);
        var childDiary = await childDiaryM.delAllByCid(cid);
        var childVoice = await childVoiceM.delAllByCid(cid);
        var childPhotoList = await childPhotoListM.findIdByCid(cid)
        if(childPhotoList == 1){
            var child = await childM.delChild(cid);
            var data = await childM.findIdByUid(uid);
        }else{
            await Promise.all(childPhotoList.map(async function(item){
                await childPhotoM.delChildPhoto(item.id);
            }))
            await childPhotoListM.delAllByCid(cid);
            var child = await childM.delChild(cid);
            var data = await childM.findIdByUid(uid);
        }
        console.log(data)      
        if(data == 0){
            var message = {code:0,msg:"删除成功",data:data };
        }else{
            var message = {code:0,msg:"删除失败",data:null};
        }
        
        res.json(message)
    }
    delChild(cid);
    
})

module.exports = router;