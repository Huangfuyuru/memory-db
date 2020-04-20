const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
var {childM,userM} = require('../database/dateMethod')

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const cpictures = require('./child/cpictures'),
      csound = require('./child/csound'),
      cevents = require('./child/cevents'),
      cgrowup = require('./child/cgrowup'),
      cstudy = require('./child/cstudy'),
      cdairy = require('./child/cdairy'),
      change = require('./child/change'),
      changebackground = require('./child/changebackground'),
      cstudy = require('./child/cstudy');

router.post('/',async function(req,res,next){
    var uid = Number(req.body.uid);
    var data = await childM.findIdByUid(uid);
    res.json(data);
})
router.use('/cpictures',cpictures);
router.use('/csound',csound);
router.use('/cevents',cevents);
router.use('/cgrowup',cgrowup);
router.use('/cstudy',cstudy);
router.use('/cdairy',cdairy);
router.use('/change',change);
router.use('/changebackground',changebackground);
router.use('/cstudy',cstudy);



module.exports = router;