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
    console.log('imgs');
    var jsonBody = req.body;
    var data = jsonBody['_parts'][0][1];
    var list = [];
    
    for(var i=0;i<data.length;i++){
        var dataBuffer = new Buffer(data[i],'base64')
        var filename = random(16);
        var des_file =`/home/shared_work/img/${filename}.jpg`;
        fs.writeFile(des_file, dataBuffer, function (err) {
                if(err) {
                    console.log('err',err);
                }else {
                    list.push(`http://148.70.223.218:3001/img/showimg/${filename}.jpg`);       
                    if(list.length == data.length){
                        console.log('list')
                        res.end(JSON.stringify(list))
                    }
                }
                
        }) 
    }
    
});



module.exports = router;
