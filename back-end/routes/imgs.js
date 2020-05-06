const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');
router.post('/', function (req, res) {
    var jsonBody = req.body;
    var data = jsonBody['_parts'][0][1];
    var list = [];
    for(var i=0;i<data.length;i++){
        var dataBuffer = new Buffer(data[i],'base64')
        var response;
       
        var filename = random(16);
        var des_file =`/home/shared_work/img/${filename}.jpg`;
    
        fs.writeFile(des_file, dataBuffer, function (err) {
                if(err) {
                    response = err;
                }else {
                    list.push(`http://148.70.223.218:3001/img/showimg/${filename}.jpg`);
                    
                }
                
        }) 
    }
    res.end(JSON.stringify(response));
    
});



// router.post('/',function(req,res){
//     var files = [];
//     var form = new formidable.IncomingForm();
//     form.uploadDir = "/home/shared_work/img";
//     form.keepExtensions = true; 
//     form.maxFieldSize = 2*1024*1024;
//     form.on('file', function(field, file) {
//         files.push(file);
//     })
//     form.on('end', function() {
//         console.log('done');
//     });
//     form.parse(req, function (error, fields) {  
//         if(error) {
//             var message = {err:1, msg:"文件解析失败"};
//         }else{
//             var newFiles = files.map(function(item){
//                 var a = item.path.split("/");
//                 var b = a[a.length-1];
//                 var message = {err:0, path:`http://148.70.223.218:3001/img/showimg/${b}`};
//                 return message;
//             })
//         }
//         res.write(JSON.stringify(newFiles));   
//         res.end();
//     });
    
// })
module.exports = router;
