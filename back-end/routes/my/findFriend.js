const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {friendsM} = require("../../database/dateMethod");

var info = {};

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//查找用户（根据用户的id或根据email查找）
//（一个输入框，一个搜索按钮，输入框输入用户email，点击搜索进行对好友的查找）
router.post('/',async function(req,res,next){
    console.log(req.body);
    var email = req.body.user_email;
    var friendid = req.body.user_id;
    // 因为是两种方式查找所以控制台只会输出一个
    console.log(email);
    console.log(friendid);
    //根据email查找好友id
    var findResultByemail = await friendsM.findByUserEmail(email);
    var findResultByid = await friendsM.findByFriendId(friendid);
    if(findResultByid == 1){
        if(findResultByemail == 1){
            info = {code:1,data:null};
        }else{
            info = {code:1,data:findResultByemail};
        }
    }else{
        if(findResultByemail == 1){
            info = {code:0,data:null};
        }else{
            info = {code:0,data:findResultByemail};
        }
    }
    
    res.json(info);
})

//点击找到的用户信息来添加好友   相当于二级页面
router.get('/addfriends',async function(req,res,next){
    console.log(req.body);
    var user_id = req.body.user_id;
    var friend_id = req.body.friend_id;
    var result = await friendsM.addfriends({user_id:user_id,friend_id:friend_id});
    if(result == 0){
        info = {code:0,msg:"添加成功"}
        res.json(info)
    }else{
        info = {code:1,msg:"添加失败"};
        res.json(info)
    }
})


module.exports = router;