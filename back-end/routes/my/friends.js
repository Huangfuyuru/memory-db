const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
//引入数据库
const {friendsM} = require("../../database/dateMethod");

var info = {};

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击好友列表
//获取到所有好友
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.user_id);
    var data = await friendsM.findByUser(uid);
    console.log(data)
    if(data == 1){
        res.json(null)
    }else{
        res.json(data);
    }
})

//查找用户（根据用户的id或根据email查找）
//（一个输入框，一个搜索按钮，输入框输入用户email，点击搜索进行对好友的查找）
router.post('/findfriends',async function(req,res,next){
    console.log(req.body);
    var email = req.body.user_email;
    var friendid = req.body.friend_id;
    // 因为是两种方式查找所以控制台只会输出一个
    console.log(email);
    console.log(friendid);
    //根据email查找好友id
    var findResultByemail = await friendsM.findByUserEmail(email);
    var findResultByid = await friendsM.findByFriendId(friendid);
    if(findResultByid == 1){
        if(findResultByemail == 1){
            info = {code:1,msg:"查找失败",data:null};
        }else{
            info = {code:1,msg:"查找失败",data:findResultByid};
        }
    }else{
        if(findResultByemail == 1){
            info = {code:0,msg:"查找成功",data:null};
        }else{
            info = {code:0,msg:"查找",data:findResultByid};
        }
    }
    
    res.json(info);
})

//点击找到的用户信息来添加好友   相当于二级页面
router.post('/findfriends/addfriend',async function(req,res,next){
    console.log(req.body);
    var user_id = req.body.user_id;
    var friend_id = req.body.friend_id;
    var result = await friendsM.addfriends({user_id:user_id,friend_id:friend_id});
    if(result == 0){
        var data1 = await friendsM.findByUser(user_id);
        var message = {code:0,msg:"添加成功",data:data1}
    }else{
        var message = {code:1,msg:"添加失败",data:null};
    }
    res.json(message)
})

//删除好友
router.get('/delfriend',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var user_id = Number(request.user_id);
    var friend_id = Number(request.friend_id);
    var data = await friendsM.delfriends(friend_id);
    if(data == 0){
        var data1 = await friendsM.findByUser(user_id);
        var message = {code:0,msg:"删除成功",data:data1};
    }else{
        var message = {code:0,msg:"删除失败",data:null};
    }
    res.json(message);
})


module.exports = router;