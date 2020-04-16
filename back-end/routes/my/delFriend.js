const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {childM} = require("../../database/dateMethod");

var info = {};

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());



module.exports = router;