const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      {childM} = require('../../database/dateMethod');

router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var usersid = Number(request.usersid);
    var data = await childM.findIdByUid(usersid);
    res.json(data);
})

module.exports = router;