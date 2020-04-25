const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(bodyParser.text());

router.post('/', function (req, res) {
    var jsonBody = req.body;
    for(var i in jsonBody){
        console.log(i,jsonBody[i])
    }
    console.log('jsonBody_parts',jsonBody['_parts']);
    //解析jsonBody
    var file = jsonBody['_parts'][1][1];
    var filemsg = jsonBody['_parts'][0][1];
    console.log('file',filemsg);
    if(Object.keys(req.body).length<=0) {
        console.log('没有提交任何post参数');
    }

    var response;
    //设置写入文件的路径
    //console.log("name",file[3][1])
    var des_file ="/home/shared_work/img/"+file['name'];
    //读取文件地址
    console.log('file[uri]',file['uri']);
    fs.readFile(JSON.stringify(file['uri']),'binary', function (err, data) {
        //开始写入文件
        console.log(data);
        fs.writeFile(des_file, data, function (err) {
            if(err) {
                console.log(err);
                response = err;
            }else {
                response = {
                    message: 'File upload successfully',
                    path: `http:148.70.223.218:3001/img/showimg/${file['name']}`
                }
            }

            console.log(response);
            res.write(JSON.stringify(response));
            res.end();
        })
    })
});
/*
router.post('/',function(req,res){
     console.log("hello");
     var form = new formidable.IncomingForm();
     form.uploadDir = "/home/shared_work/img";
     form.keepExtensions = true; 
     form.maxFieldSize = 2*1024*1024;
    // console.log('req',req);
     console.log('req.body',req.body);
     form.parse(req, function (error, fields, files){ 
         console.log('fields',fields);
         console.log('files',files);
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
       
 })
*/
router.get('/showimg/:name',function(req,res){
    var filename = req.params.name;
    console.log(filename);
    var ext = filename.split('.')[1];
    if(ext == 'jpg'){ext = 'jpeg'}
    var img = fs.readFileSync(`/home/shared_work/img/${filename}`);
    res.writeHead(200,{
        "Content-Type":"image/"+ext
    })
    res.end(img)
})
module.exports = router;
