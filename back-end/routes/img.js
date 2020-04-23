const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

app.post('/', function (req, res) {
    var jsonBody = req.body;
    //解析jsonBody
    var file = jsonBody['_parts'][0][1];

    if(Object.keys(req.body).length<=0) {
        console.log('没有提交任何post参数');
    }

    var response;
    //设置写入文件的路径
    var des_file ="/home/shared_work/img/"+file['name'];

    //读取文件地址
    fs.readFile(file['uri'], function (err, data) {
        //开始写入文件
        fs.writeFile(des_file, data, function (err) {
            if(err) {
                console.log(err);
                response = err;
            }else {
                response = {
                    message: 'File upload successfully',
                    fileName: file['name']
                }
            }
            console.log(response);
            res.end(JSON.stringify(response));
        })
    })
});
// router.post('/',function(req,res){
//     console.log("hello");
//     var form = new formidable.IncomingForm();
//     form.uploadDir = "/home/shared_work/img";
//     form.keepExtensions = true; 
//     form.maxFieldSize = 2*1024*1024;
//     form.parse(req, function (error, fields, files) { 
//         if(error) {
//             var message = {err:1, msg:"文件解析失败"};
//         }
//         var a = files.file.path.split("/");
//         var b = a[a.length-1];
//         var message = {err:0, path:`http:148.70.223.218:3001/img/showimg/${b}`};
//         res.write(JSON.stringify(message));   
//         res.end();
//     });
    
// })

router.get('/showimg/:name',function(req,res){
    console.log('显示');
    var filename = req.params.name;
    var ext = filename.split('.')[1];
    var img = fs.readFileSync(`/home/shared_work/img/${filename}`);
    
    res.writeHead(200,{
        "Content-Type":"image"+ext
    })
    res.end(img)
})
module.exports = router;
