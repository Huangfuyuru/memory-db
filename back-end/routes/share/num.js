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

module.exports = router;