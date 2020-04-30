const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');
const bodyParser = require("body-parser");
const random = require('string-random');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json({limit:'50mb'}));
router.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
router.use(bodyParser.text());

router.post('/', function (req, res) {
    var jsonBody = req.body;
    var data = jsonBody['_parts'][0][1];
    var dataBuffer = new Buffer(data,'base64')
    var response;
   
    var filename = random(16);
    var des_file =`/home/shared_work/img/${filename}.jpg`;

    fs.writeFile(des_file, dataBuffer, function (err) {
            if(err) {
                response = err;
            }else {
                response = {
                    message: 'File upload successfully',
                    url:`http://148.70.223.218:3001/img/showimg/${filename}.jpg`
                };
                console.log(response);
            }
            res.end(JSON.stringify(response));
    })
});
router.get('/showimg/:name',function(req,res){
    var filename = req.params.name;
    var buf = fs.readFileSync(`/home/shared_work/img/${filename}`);
    var img = Buffer.from(buf,'base64');
    res.header('Content-Type','image/jpeg');
    res.end(img);
})

module.exports = router;
