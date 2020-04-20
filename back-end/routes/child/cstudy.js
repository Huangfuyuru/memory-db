const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
const {childScoreM} = require("../../database/dateMethod");//引入数据库

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击成绩记录
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var cid = Number(request.cid);
    var data = await childScoreM.findBycid(cid);
    if(data == 1){
        console.log('null');
        res.json(null)
    }else{
        var len = data.length;
        console.log(len);
        var data2 = [];
        for(var i=0;i<len;i++){
            var arr = [];
            var sub = data[i].subject;
            var sco = data[i].score;
            var len2 = sub.length;
            for(var j=0;j<len2;j++){
                arr.push({subject:sub[j],score:sco[j]})
            }
            delete data[i].subject;
            delete data[i].score;
            data[i].cont = arr;
        }
        console.log(data);
        res.json(data)
    }
    
})

//增加成长记录
// router.post('/ccgrowup',async function(req,res,next){
//     var childsid = req.body.childsid;
//     var length = req.body.length;
//     var weight = req.body.weight;
//     var age = req.body.age;
//     var unit = req.body.unit;
//     var message = {
//         msg:'',
//         data:[]
//     }
//     var a =await childScoreM.addChildGrow({
//         weight:weight,
//         length:length,
//         age:age,
//         cid:childsid,
//         unit:unit
//     });
//     if(a == 1){
//         message.msg = '添加失败';
//     }else{
//         message.msg = '添加成功';
//         var data1 = await childScoreM.findByCid(childsid);
//         message.data = data1;
//     }
//     res.json(message)
// })

// //删除成长记录
// router.get('/crgrowup',async function(req,res,next){
//     var request = qs.parse(url.parse(req.url).query);
//     var childsid = Number(request.childsid);
//     var childGrowid = Number(request.childGrowid);
//     var data2 = await childScoreM.delChildGrow(childGrowid);
//     var data1 = await childScoreM.findByCid(childsid);
//     if(data2 == 1){
//         var message = {
//             data:data1,
//             msg:"删除失败"
//         }
//     }else{
//         var message = {
//             data:data1,
//             msg:"删除成功"
//         }
//     }
//     res.json(message)
// })

// //点击身高体重曲线
// router.get('/charts',async function(req,res,next){
//     var request = qs.parse(url.parse(req.url).query);
//     var childsid = Number(request.childsid);
//     var data = await childScoreM.findByCid(childsid);
//     if(data == 1){
//         var message = {data:null}
//     }else{
//         var message = {data:data}
//     }
//     res.json(message)
// })
module.exports = router;
