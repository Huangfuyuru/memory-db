/**
 * 文章和作者的小花数量接口
 */
const express = require('express'),
        router = express.Router(),
        qs = require('querystring'),
        url = require('url'),
        bodyParser = require("body-parser");
const article = require("../../database/dateMethod");//引入数据库
var info = "";
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

var add = new Array();

//送小花
router.get('/addnum', async function(req,res,next){
    // console.log(add);
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.uid));
    var auid = Number(JSON.parse(request.auid));
    var id = Number(JSON.parse(request.id));

    //查看是否送过小花
    for(var i= 0;i<add.length;i++){
        if(uid == add[i].uid && id == add[i].id){
            info={code:1,msg:'只能送一次花哦',data:null}
            res.json(info);
            return;

        }
    }
    //先查看送花的人是否有小花
    var user = await article.userM.findById(uid);
    // console.log(uid+'的小花数为'+user.num)
    if(user.num>0){
        var data = await article.articleM.reduceNumByUId(uid);
        var data1 = await article.articleM.appendNumById(auid,id);
        if(data === 1 || data1 === 1){
            info={code:1,msg:null}
        }else{
            var art= await article.articleM.findById(id);
            var auser_num = await article.userM.findById(auid);
            var user_num = await article.userM.findById(uid);
            
             var num={
                art_num:art[0].num,
                user_num:user_num.num,
                auser_num:auser_num.num
             };
            var flower={uid:uid,id:id};
            add.push(flower);
            // add.splice(0);
            info={code:0,msg:'小花已送出',data:num};
        }
    }else{
        info={code:1,msg:'auser_num为0，不能送花',data:num}
    }
    console.log(num);
    res.json(info);
})

module.exports = router;