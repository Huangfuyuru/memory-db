const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser"),
      {childPhotoListM,childPhotoM} = require('../../database/dateMethod');

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击云相册
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var data = await childPhotoListM.findByCid(childsid);
    if(data == 1){
        res.json(null)
    }else{
        res.json(data);
    }
    
})

//点击具体相册
router.get('/show',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childPhotoListid = Number(request.childPhotoListid);
    var data = await childPhotoM.findByPid(childPhotoListid);
    if(data == 1){
        res.json(null)
    }else{
        res.json(data);
    }
})

//增加相册
router.get('/ccpictures',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var background = request.background;
    var name = request.name;
    var data = await childPhotoListM.addChildPhotoList({name:name,cid:childsid,background:background});
    if(data == 1){
        res.json({code:1,msg:"创建失败"})
    }else{
        res.json({code:0,msg:"创建成功"})
    }
})

//删除相册
router.get('/crpictures',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var childPhotoListid = request.childPhotoListid;
    await childPhotoM.delAllByPid(childPhotoListid);
    var delphotolist = await childPhotoListM.delChildPhotoList(childPhotoListid);
    console.log('a',delphotolist)
    var data = await childPhotoListM.findByCid(childsid);
    if(delphotolist == 1){
        if(data == 1){
            var message ={msg:"删除失败",data:null}
        }else{
            var message ={msg:"删除失败",data:data}
        }
    }else{
        if(data == 1){
            var message ={msg:"删除成功",data:null}
        }else{
            var message ={msg:"删除成功",data:data}
        }
    }
    res.json(message)
})


//增加照片
router.post('/caddpictures',async function(req,res,next){
    childPhotoListid = req.body.childPhotoListid;
    imgurl = JSON.parse(req.body.imgurl);
    await Promise.all(imgurl.map(async function(item){
        await childPhotoM.addChildPhoto({imgurl:item.path,pid:childPhotoListid})
    }))
    var data = await childPhotoM.findByPid(childPhotoListid);
    if(data == 1){
        var message = {data:null,msg:"添加失败"}
    }else{
        var message = {data:data,msg:"添加成功"}
    }
    res.json(message)
})

//删除照片
router.post('/cdelpictures',async function(req,res,next){
    var photo = JSON.parse(req.body.childPhotoid);
    var childPhotoListid = req.body.pid;
    await Promise.all(photo.map(async function(item){
        await childPhotoM.delChildPhoto(JSON.parse(item));
    }))
    var data = await childPhotoM.findByPid(childPhotoListid)
    console.log(data)
    if(data == 1){
        res.json({msg:"删除成功",data:null})
    }else{
        res.json({msg:"删除成功",data:data})
    }
})

module.exports = router;