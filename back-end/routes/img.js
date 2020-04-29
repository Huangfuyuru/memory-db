const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json({limit:'50mb'}));
router.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
router.use(bodyParser.text());
router.post('/',function(req,res){
   var data = req.body.data;
   var message;
   var dataBuffer = Buffer.from(data,'base64');
   var des_file = "/home/shared_work/img/demo_copy.jpg";
   //console.log('data',data);
   //console.log('dataBuffer',dataBuffer);
   fs.writeFile(des_file,dataBuffer,function(err){
      if(err){
        console.log(err);
        message = err;
      }else{
        message = {
            code:0
        }
      }  
      res.end(JSON.stringify(message));
   })

        
})
/*
router.post('/', function (req, res) {
    var jsonBody = req.body;
    //解析jsonBody
    var data = jsonBody['_parts'][0][1];
    var dataBuffer = new Buffer(data,'base64')
    var response;
   
    //设置写入文件的路径
    var des_file ="/home/shared_work/img/b.jpg";
   
    fs.writeFile(des_file, dataBuffer, function (err) {
            if(err) {
                console.log(err);
                response = err;
            }else {
                response = {
                    message: 'File upload successfully',
                }
            }
            res.end(JSON.stringify(response));
    })
});
*/
// router.post('/', function (req, res) {
//     var jsonBody = req.body;
//     for(var i in jsonBody){
//         console.log(i,jsonBody[i])
//     }
//     console.log('jsonBody_parts',jsonBody['_parts']);
//     //解析jsonBody
//     var file = jsonBody['_parts'][1][1];
//     var filemsg = jsonBody['_parts'][0][1];
//     console.log('file',filemsg);
//     if(Object.keys(req.body).length<=0) {
//         console.log('没有提交任何post参数');
//     }

//     var response;
//     //设置写入文件的路径
//     //console.log("name",file[3][1])
//     var des_file ="/home/shared_work/img/"+file['name'];
//     //读取文件地址
//     console.log('file[uri]',file['uri']);
//     fs.readFile(JSON.stringify(file['uri']),'binary', function (err, data) {
//         //开始写入文件
//         console.log(data);
//         fs.writeFile(des_file, data, function (err) {
//             if(err) {
//                 console.log(err);
//                 response = err;
//             }else {
//                 response = {
//                     message: 'File upload successfully',
//                     path: `http:148.70.223.218:3001/img/showimg/${file['name']}`
//                 }
//             }

//             console.log(response);
//             res.write(JSON.stringify(response));
//             res.end();
//         })
//     })
// });

/*
router.post('/',function(req,res){
     console.log('hello')
     /*
     var form = new formidable.IncomingForm();
     form.uploadDir = "/home/shared_work/img";
     form.keepExtensions = true; 
     form.maxFieldSize = 2*1024*1024;
     //console.log('req.body',req.body['_parts'][0][1]);
     //var rem = req.body['_parts'][0][1];
     form.parse(req,function (error, fields, files){ 
         
         console.log('进ru')
         if(error) {
             var message = {err:1, msg:"文件解析失败"};
         }
         console.log(files)
         var a = files.file.path.split("/");
         console.log('a',a);
         var b = a[a.length-1];
         
         var message = {err:0, path:`http:148.70.223.218:3001/img/showimg${b}`};
         
         
         res.write(JSON.stringify(message));   
         res.end();
        
     });
     
     res.write(JSON.stringify({url:'http'}))
     res.end();
     
 })
 */
router.get('/showimg/:name',function(req,res){
    var filename = req.params.name;
    var ext = filename.split('.')[1];
    var buf = fs.readFileSync(`/home/shared_work/img/${filename}`);
    var img = Buffer.from(buf,'base64');
    //var img = new Buffer(buf,'base64');
    //var img = 'data:image/jpeg;'+buf;
    console.log(`${filename}buf`,buf);
    //res.write(JSON.stringify({'img':img}));
    res.json({'img':img});
})
module.exports = router;
