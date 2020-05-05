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

//送小花
router.get('/addnum', async function(req,res,next){
    console.log('addnum');
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.uid));
    var auid = Number(JSON.parse(request.auid));
    var id = Number(JSON.parse(request.id));

    //先查看送花的人是否有小花
    var user = await article.userM.findById(uid);
    console.log(uid+'的小花数为'+user.num)
    if(user.num>0){
        console.log('uid',typeof(uid));
        var data = await article.articleM.reduceNumByUId(uid);
        var data1 = await article.articleM.appendNumById(auid,id);
        if(data === 1 || data1 === 1){
            info={code:1,msg:null}
        }else{
            var art= await article.articleM.findById(id);
            var auser = await article.userM.findById(auid);
            art.push(auser);
            art.push(user)
            console.log(art)

            info={code:0,msg:art};
        }
    }else{
        info={code:1,msg:null,des:'用户小花数为0'}
    }
    res.json(info);
})

//取消小花
router.get('/reducenum',async function(req,res,next){
    console.log('取消送花');
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(JSON.parse(request.uid));
    var auid = Number(JSON.parse(request.auid));
    var id = Number(JSON.parse(request.id));

    var data = article.articleM.addNumByUId(uid);
    var data1 = article.articleM.reduceNumById(auid,id)
    
    if(data === 1 || data1 === 1){
        info={code:1,msg:null}
    }else{
        console.log(uid)
        //具体某个文章的所有信息
        var art= await article.articleM.findById(id);
        //文章所有者的num信息
        var auser = await article.userM.findById(auid);
        //送小花人的num信息
        var user = await article.userM.findById(uid);
        // console.log(auser,user)
        art.push(auser);
        art.push(user)
        info={code:0,msg:art};
    }
    console.log(art)
    res.json(info);
})
module.exports = router;