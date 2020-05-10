const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
var {userM} = require('../database/dateMethod');


//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const minformation = require('./my/information'),
      msign = require('./my/sign'),
      mlover = require('./my/lover'),
      mfriend = require('./my/friends'),
      mchild = require('./my/child'),
      mmypage = require('./my/mypage');
      

    //参照child.js 12/10
router.post('/',async function(req,res,next){
    var uid = req.body.uid;
    var data = await userM.findById(uid);
    console.log("我的信息",data);
    res.json(data);
})


router.use('/information',minformation);
router.use('/sign',msign);
router.use('/lover',mlover);
router.use('/friends',mfriend);
router.use('/child',mchild);
router.use('/mypage',mmypage);



module.exports = router;