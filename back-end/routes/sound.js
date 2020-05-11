const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      qs = require('querystring'),
      url = require('url');
      bodyParser = require("body-parser"),
      formidable = require('formidable');

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json({}));

router.post('/',function(req,res){
    console.log('sound');
    // console.log('req.body',req.body);
    var form = new formidable.IncomingForm();

    form.uploadDir =`/home/shared_work/voice`;
    //保留后缀
    form.keepExtensions = true;

    form.parse(req, function(err,fields,files){
        console.log('files',files);
        var t = (new Date()).getTime();
        //生成随机数
        var ran = parseInt(Math.random()*8999+10000);
        //拿拓展名
        var extname = path.extname(files.thumbnail.name);

        var oldpath = path.normalize(files.thumbnail.path); 

        let newfilename = t + ran + extname;
        var newpath = '/home/shared_work/voice'+newfilename;
        
        fs.rename(oldpath,newpath,function(err){
            if(err){
                console.error("改名失败"+err);
            }
            res.render('index', { title: '文件上传成功:', audioinfo: newfilename });
        });
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