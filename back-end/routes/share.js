const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
var {userM} = require('../database/dateMethod')

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//下面是示例
const cpictures = require('./child/cpictures');

router.post('/',async function(req,res,next){
    var uid = Number(req.body.uid);
    var data = await childM.findIdByUid(uid);
    res.json(data);
})
//下面是示例
router.use('/cpictures',cpictures);




module.exports = router;