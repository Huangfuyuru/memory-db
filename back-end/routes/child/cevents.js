const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
const {childAdolesceM} = require("../../database/dateMethod");//引入数据库

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击大事记
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var data = await childAdolesceM.findByCid(childsid);
    console.log(data)
    if(data == 1){
        res.json(null)
    }else{
        res.json(data);
        
    }
    
})

//增加大事
router.post('/ccevents',async function(req,res,next){
    var childsid = req.body.childsid;
    var item = req.body.item;
    var name = req.body.name;
    var imgurl = JSON.parse(req.body.imgurl);
    var content = req.body.content;
    var setdate = req.body.setdate;
    var date = req.body.date;
     console.log('imgurl',imgurl)
    var data = await childAdolesceM.addChildAdolesce({
        item:item,
        imgurl:imgurl,
        content:content,
        cid:childsid,
        name:name,
        date:date,
        setdate:setdate
    })
    if(data == 1){
        var message={code:1,msg:"添加失败",data:null};
    }else{
        var data1 = await childAdolesceM.findByCid(childsid);
        var message={code:0,msg:"添加成功",data:data1};
    }
    res.json(message);
})

//删除大事
router.get('/crevents',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var childAdolesceid = Number(request.childAdolesceid);
    await childAdolesceM.delChildAdolesce(childAdolesceid);
    var data = await childAdolesceM.findByCid(childsid);
    if(data == 1){
        res.json(null)
    }else{
        res.json(data);
        
    }
})

//修改大事
router.post('/change',async function(req,res,next){
    var childsid = req.body.childsid;
    var item = req.body.item;
    var name = req.body.name;
    var imgurl = req.body.imgurl;
    var content = req.body.content;
    var setdate = req.body.setdate;
    var date = req.body.date;
    var id = req.body.id;
    // console.log(item,imgurl)
    var data = await childAdolesceM.changeById({
        item:item,
        imgurl:imgurl,
        content:content,
        name:name,
        date:date,
        setdate:setdate,
        id:id
    })
    if(data == 1){
        var message={code:1,msg:"修改失败",data:null};
    }else{
        var data1 = await childAdolesceM.findByCid(childsid);
        var message={code:0,msg:"修改成功",data:data1};
    }
    res.json(message);
})
module.exports = router;
