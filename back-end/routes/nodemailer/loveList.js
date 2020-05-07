const express = require('express'),
      app = express(),
      bodyParser = require("body-parser"),
      lover =require('../../database/dateMethod'),
      router = express.Router();

var info={};

router.get('/',async function(req,res,next){
    
    console.log('点击清单',req.query);
    var lid = req.query.loverid;
    var data = await lover.loveListM.findByLid(lid);
    var data1 = await lover.listM.findAll();
    for (var i = 0;i<data.length;i++){
        for(var j=0;j<data1.length;j++){
            if(data[i].listid ==data1[j].id){
                data[i].difficulty = data1[j].difficulty;
                console.log("data1",data1[j])
            }
        }
    }
    if(data === 1){
        info={code:0,msg:null};
    }else{
        info={code:0,msg:data};
    }
    res.json(info);

})

router.get('/list',async function(req,res,next){
    // console.log('点击所有清单',req.query);
    var lid = req.query.loverid;
    var data = await lover.listM.findAll();
    var data1 = await lover.loveListM.findByLid(lid);
    var newdata =new Array(2);
    newdata[0]=data;

    newdata[1]=data1;
    for(var i=0;i<data1.length;i++){
        for(var j=0;j<data.length;j++){
            data[j].id == data1[i].listid?data[j] = data1[i]: data[j] 
            
            // console.log(data1[i].listid );
        }
    }
   info={data:data1,msg:data};
    res.json(info);
    // console.log('data',data)

    // if(data === 1){
    //     res.json(newdata);
    // }else{
    //     newdata[1]=data1;
    //     res.json(newdata);
    // }

    // console.log(newdata);

});

router.post('/addloverlist',async function(req,res,next){
    console.log('增加爱人清单',req.body);
    var lid = Number(req.body.lid);
    var listid = Number(req.body.listid);
    var text={
        name:req.body.name,
        content:req.body.content,
        imgurl:req.body.imgurl,
        local:req.body.local,
        setdate:req.body.setdate,
        listid:listid,
        lid:lid
    }
    
    var addlL = await lover.loveListM.addloveList(text);
    var data = await lover.listM.findAll();
    var data1 = await lover.loveListM.findByLid(lid);
    var newdata =new Array(2);
    newdata[0]=data;

    newdata[1]=data1;
    for(var i=0;i<data1.length;i++){
        for(var j=0;j<data.length;j++){
            data[j].id == data1[i].listid?data[j] = data1[i]: data[j] 
            
            // console.log(data1[i].listid );
        }
    }
    if(addlL=== 0 ){
        info={code:0,msg:data};
    }else{
        info={code:1,msg:'增加失败'};
    }
    res.json(info);
    // var data = await lover.loveListM.findByLid(lid);
    // for(var i = 0;i<data.length;i++){
    //     if(listid == data[i].listid){
    //         info={code:1,msg:'增加失败'};
    //     }else{
    //         var addlL = await lover.loveListM.addloveList(text);
    //         if(addlL=== 0 ){
    //             info={code:0,msg:'增加成功'};
    //         }else{
    //             info={code:1,msg:'增加失败'};
    //         }
    //     }
    //     res.json(info);

    // }

    
})

router.get('/listdetail',async function(req,res,next){
    console.log('详情页id',req.query.id);
    var data = await lover.loveListM.findById(id);
    if(data === 1){
        info={code:0,msg:null};
    }else{
        info={code:1,msg:data}
    }
    res.json(info);
})
module.exports = router;