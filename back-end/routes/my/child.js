const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");

//引入数据库      
const {childM,childAdolesceM,childDiaryM,childGrowM,childPhotoM,childPhotoListM,childVoiceM,childScoreM} = require("../../database/dateMethod");

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
    var birthday = req.body.birthday;
    var gender = req.body.gender;
    var uid = req.body.uid;
    var data = await childM.addChild({
        name:name,
        birthday:birthday,
        gender:gender,
        uid:uid
    })
    if(data == 1){
        var message={code:1,msg:"添加失败",data:null};
    }else{
        var data1 = await childM.findIdByUid(uid);
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
    // async function delChild(cid){
        // var childAdolesce = await childAdolesceM.delAllByCid(cid);
        // var childGrow = await childGrowM.delAllByCid(cid);
        // var childDiary = await childDiaryM.delAllByCid(cid);
        // var childVoice = await childVoiceM.delAllByCid(cid);
        // var childScore = await childScoreM.delAllBycid(cid);
        // var childPhotoList = await childPhotoListM.findIdByCid(cid);
        // if(childAdolesce == 0 && childGrow ==0 && childDiary ==0 && childScore ==0 && childVoice ==0){
        //     if(childPhotoList == 1 ){
        //         var data = await childM.delChild(cid);
        //     }else{
        //         await Promise.all(childPhotoList.map(async function(item){
        //             await childPhotoM.delChildPhoto(item.id);
        //         }))
        //         await childPhotoListM.delAllByCid(cid);
        //         var data = await childM.delChild(cid);
        //     }
        // }else{
        //     var message = {code :0 ,msg :'未进入',data:null}
        // }
        console.log(data);
        var data = await childM.delChild(cid);     
        if(data == 0){
            var data1 = await childM.findIdByUid(uid);
            var message = {code:0,msg:"删除成功",data:data1 };
        }else{
            var message = {code:1,msg:"删除失败",data:null};
        }
        res.json(message)
    // }
    // delChild(cid);
})

module.exports = router;