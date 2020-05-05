const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");

//引入数据库      
const {childM,childAdolesceM,childDiaryM,childGrowM,childPhotoM,childPhotoListM,childVoiceM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击亲子列表
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var data = await childM.findIdByUid(uid);
    console.log(data)
    if(data == 1){
        res.json(null)
    }else{
        res.json(data);
    }
})
//增加孩子
router.post('/addchild',async function(req,res,next){
    var name = req.body.name;
    var birthday = req.body.imgurl;
    var gender = req.body.gender;
    var uid = req.body.setdate;
    var data = await childM.addChild({
        name:name,
        birthday:birthday,
        gender:gender,
        uid:uid
    })
    if(data == 1){
        var message={code:1,msg:"添加失败",data:null};
    }else{
        var data1 = await findIdByUid(uid);
        var message={code:0,msg:"添加成功",data:data1};
    }
    res.json(message);
})

//删除孩子
router.get('/delchild',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var cid = Number(request.cid);
    console.log(cid);
    async function delChild(cid){
        await childAdolesceM.delAllByCid(cid);
        await childGrowM.delAllByCid(cid);
        await childDiaryM.delAllByCid(cid);
        await childVoiceM.delAllByCid(cid);
        var childPhotoList = await childPhotoListM.findIdByCid(cid)
        if(childPhotoList == 1){
            await childM.delChild(cid);
            var data = await childM.findIdByUid(uid);
        }else{
            await Promise.all(childPhotoList.map(async function(item){
                await childPhotoM.delChildPhoto(item.id);
            }))
            await childPhotoListM.delAllByCid(cid);
            await childM.delChild(cid);
            var data = await childM.findIdByUid(uid);
        }
        console.log(data)      
        if(data == 0){
            var data1 = await findIdByUid(uid);
            var message = {code:0,msg:"删除成功",data:data1 };
        }else{
            var message = {code:0,msg:"删除失败",data:null};
        }
        res.json(message)
    }
    delChild(cid);
})

module.exports = router;