const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');

router.post('/',function(req,res){
    console.log('sound');
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        console.log('fields',fields);
        console.log('files',files);
    })

})

router.get('/showvoice/:name',function(req,res){
    var filename = req.params.name;
    var voice = fs.readFileSync(`D:/database/voice/${filename}`)
    res.writeHead(200,{
        "Content-Type":'audio/mp3'
    })
    res.end(voice)
})
module.exports = router;