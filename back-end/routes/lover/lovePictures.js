const express = require('express'),
      app = express(),
      router = express.Router(),
      bodyParser = require("body-parser"),
      lover = require('../../database/dateMethod');

var info = {};

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/',async function(req,res,next){
    var lid = Number(req.query.loverid);
    // console.log('photoid ',lid);
    var photoList =await lover.loverPhotoListM.findByLid(lid);
    if(photoList === 1){
        info ={code:0,msg:null}
    }else{
        info = {code:0,msg:photoList}
    }
    res.json(info)
});

//点击具体相册
router.get('/show',async function(req,res,next){
    console.log('点击具体相册');
    var photoListid = Number(req.query.loverPhotoListid);
    // console.log(photoListid);
    var data = await lover.loverPhotoM.findByPid(photoListid);
    // console.log(data);
    if(data === 1){
        info={code:0,msg:null}
    }else{
        info={code:0,msg:data}
    }
    res.json(info);

});

router.post('/lcpictures',async function(req,res,next){
    console.log('添加相册');
    // console.log(req.body);
    var lid = Number(req.body.loverid);
        name = req.body.name,
        text={
            lid:lid,
            name:name,
            background:req.body.background,
            setdate:req.body.setdate
        }
    var addPList =  await lover.loverPhotoListM.addLoverPhotoList(text);
    var data = await lover.loverPhotoListM.findByLid(lid);
    if(addPList === 0){
        if(data ===1){
            info={code:0,msg:null}
        }else{
            info={code:0,msg:data}
        }
    }else{
        if(data ===1){
            info={code:1,msg:null}
        }else{
            info={code:1,msg:data}
        }
    }
    res.json(info);
});
 
//

//删除相册
//要想删除相册需要先删除photoM中对应pid的内容
router.get('/lrpictures',async function(req,res,next){
    console.log('删除相册',req.query);
    var lPLid = Number(req.query.loverPhotoListid),
    lid = Number(req.query.loverid);
    try{
        //内容判空，可能只有相册，没有照片！
        //delP === 1//即相册对应的相片为空
        var delP = await lover.loverPhotoM.delAllByPid(lPLid);
        // console.log('delPL',delP);
        //删除photoList 里面的pid
        var delPL = await lover.loverPhotoListM.delLoverPhotoList(lPLid);
        console.log('delPl',delPL);
    }catch(err){
        console.log(err);
    }

    var data= await lover.loverPhotoListM.findByLid(lid); 
    if(delPL === 0){
        if(data === 1){
            info ={code:0,msg:null}
        }else{
            info ={code:0,msg:data};
        }
    }else{
        if(data === 1){
            info ={code:1,msg:null}
        }else{
            info ={code:1,msg:data};
        }
    }
    res.json(info);
})

//增加照片
router.post('/laddpictures',async function(req,res,next){
    var lPLid = Number(req.body.loverPhotoListid),
        img =JSON.parse(req.body.imgurl);
    await Promise.all(img.map(async function(item){
        var text = {
            pid:lPLid,
            imgurl:item.path
        };
        await lover.loverPhotoM.addLoverPhoto(text);
    }))
    var data= await lover.loverPhotoM.findByPid(lPLid);
    if(data == 1){
        var message = {msg:"添加失败",data:null}
    }else{
        var message = {msg:"添加成功",data:data}
    }
    res.json(message)
});

//删除照片
router.post('/ldelpictures',async function(req,res,next){
    var photo = JSON.parse(req.body.loverPhotoid);
    var loverPhotoListid = Number(req.body.pid);
    await Promise.all(photo.map(async function(item){
        await lover.loverPhotoM.delLoverPhoto(JSON.parse(item))
    }))
    var data = await lover.loverPhotoM.findByPid(loverPhotoListid);
    console.log(data)
    if(data == 1){
        res.json({msg:"删除成功",data:null})
    }else{
        res.json({msg:"删除成功",data:data})
    }
})

module.exports = router;