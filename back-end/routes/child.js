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
      changebackground = require('./child/changebackground');

router.post('/',async function(req,res,next){
    var uid = Number(req.body.uid);
    var data = await childM.findIdByUid(uid);
    let message = {};
    if(data === 1){
        message = {code:0,msg:null}
    }else{
        message = {code:1,msg:data}
    }
    res.json(message);
})
router.use('/cpictures',cpictures);
router.use('/csound',csound);
router.use('/cevents',cevents);
router.use('/cgrowup',cgrowup);
router.use('/cstudy',cstudy);
router.use('/cdairy',cdairy);
router.use('/change',change);
router.use('/changebackground',changebackground);



module.exports = router;
