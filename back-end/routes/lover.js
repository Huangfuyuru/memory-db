const express = require('express'),
       router = express.Router(),
       fs = require('fs'),
       bodyParser = require("body-parser");
       lover = require('../database/dateMethod');


//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const lovePictures = require('./lover/lovePictures'),
      loveSound = require('./lover/loveSound'),
      loveDinary = require('./lover/loveDinary'),
      loveList = require('./lover/loveList'),
      loveSouvenir = require('./lover/loveSouvenir'),
      loveChangBack = require('./lover/changBack');
      
router.post('/',async function(req,res,next){
       console.log('爱人的uid',req.body.uid);
       var uid = req.body.uid;
       var data = await lover.loverM.findIdByUid(uid);
       // console.log('该爱人的所有信息',data[0].uid);
       res.json(data);
});

router.use('/lpictures',lovePictures);
router.use('/lsound',loveSound);
router.use('/ldairy',loveDinary);
router.use('/loverlist',loveList);
router.use('/lsouvenir',loveSouvenir);
router.use('/changebackground',loveChangBack);

module.exports = router;
