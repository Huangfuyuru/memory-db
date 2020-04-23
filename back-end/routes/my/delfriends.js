const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser"),
      url = require('url'),
      qs = require('qs');
//引入数据库
const {friendsM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//删除好友
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var user_id = Number(request.user_id);
    // var fri = Number(request.uid);
    //根据用户id查找到该用户所有的好友
    var data = await friendsM.findByUser(user_id);
    res.json(data);
})

//确认删除
router.get('/confirm',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var user_id = Number(request.user_id);
    var friend_id = Number(request.friend_id);
    var data = await friendsM.delfriends({user_id:user_id,friend_id:friend_id});
    if(data == 0){
        var message = {code:0,msg:"删除成功",data:data};
    }else{
        var message = {code:0,msg:"删除失败",data:null};
    }
    res.json(message);
})

module.exports = router;