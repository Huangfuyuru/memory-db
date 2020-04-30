const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
const {childGrowM} = require("../../database/dateMethod");//引入数据库

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击成长记录
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var data = await childGrowM.findByCid(childsid);
    if(data == 1){
        res.json(null)
    }else{
        res.json(data)
    }
    
})

//增加成长记录
router.post('/ccgrowup',async function(req,res,next){
    var childsid = req.body.childsid;
    var length = req.body.length;
    var weight = req.body.weight;
    var age = req.body.age;
    var unit = req.body.unit;
    var setdate = req.body.setdate;
    console.log('成长记录');
    console.log(childsid);
    
    var data = await childGrowM.addChildGrow({
        weight:weight,
        length:length,
        age:age,
        cid:childsid,
        unit:unit,
        setdate:setdate
    })
    if(data == 1){
        var message={code:1,msg:"添加失败",data:null};
    }else{
        var data1 = await childGrowM.findByCid(Number(childsid));
        var message={code:0,msg:"添加成功",data:data1};
    }
    
    res.json(message);
    
})

//删除成长记录
router.get('/crgrowup',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var childGrowid = Number(request.childGrowid);
    var data2 = await childGrowM.delChildGrow(childGrowid);
    var data1 = await childGrowM.findByCid(childsid);
    if(data2 == 1){
        var message = {
            data:data1,
            msg:"删除失败"
        }
    }else{
        var message = {
            data:data1,
            msg:"删除成功"
        }
    }
    res.json(message)
})

//点击身高体重曲线
router.get('/charts',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var data = await childGrowM.findByCid(childsid);
    if(data == 1){
        var message = {data:null}
    }else{
        var message = {data:data}
    }
    res.json(message)
})

router.post('/change',async function(req,res,next){
    var childsid = req.body.childsid;
    var length = req.body.length;
    var weight = req.body.weight;
    var age = req.body.age;
    var unit = req.body.unit;
    var setdate = req.body.setdate;
    var id = req.body.id;
    var data = await childGrowM.changeById({
        weight:weight,
        length:length,
        age:age,
        id:id,
        unit:unit,
        setdate:setdate
    })
    if(data == 1){
        var message={code:1,msg:"修改失败",data:null};
    }else{
        var data1 = await childGrowM.findByCid(Number(childsid));
        var message={code:0,msg:"修改成功",data:data1};
    }
    
    res.json(message);
    
})
module.exports = router;
