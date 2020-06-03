process.chdir(__dirname);
const titbit  =require('titbit');
const fs = require('fs');
// /sound!
var app = new titbit({
    debug:true,
    bodyMaxSize:50000000
});

app.service.medipath ={
    audio:`$(__dirname)/audios`
};

function getMediaData(pathfile){
    return new Promise((rv,rj)=>{
        fs.readFile(pathfile,(err,data)=>{
            if(err){
                rj(err);
            }else{
                rv(data);
            }
        });
    });
}

function contentType(type,name){
    switch(type){
        case 'audio':
            if (name.indexOf('.mp3')>0){
                return 'audio/mp3';
            }
            if(name.indexOf('.m4a')>0){
                return 'audio/m4a';
            }
            default:
                return '传输类型错误';
    }
    return '';
}

app.get('/media/:type/:name',async c=>{
    try{
        let pathfile = `${c.service.mediapath[c.param.type]}/${c.param.name}`;
        let content_type = contentType(c.param.type,c.param.name);
        c.setHeader('contetn-type',content_type);
        c.res.body = await getMediaData(pathfile);
        c.setHeader('content-length',c.res.body.length);
    }catch(err){
        c.status(404);
    }
});

app.post('/media/:type',async c=>{
    let type = c.param.type;

    if(['audio'].indexOf(type)<0){
        c.res.body={
            status:'EFAILED',
            errmsg:'不支持的文件类型'
        };
        return;
    }

    let f = c.getFile(type);
    try{
        let hashstr= `${Date.now()}${Math.random()}${c.ip}`;
        let fname = `${c.helper.sha1(hashstr)}${c.helper.extName(f.filename)}`;

        let count =  await c.moveFile(f,`${c.service.mediapath[type]}/${fname}`);

        if(count !=f.length){
            c.res.body = {
                status : 'EFAILED',
                errmsg : '没有全部写入文件'
              };
              return
        }
        c.res.body = {
            status : 'OK',
            data : fname
          }
      
        } catch (err) {
          c.res.body = {
            status : 'EBADDATA',
            errmsg : '上传失败'
          }

    }
});

app.get('/show', async c => {
    try {
      c.res.body = await c.helper.readFile('./pages/show.html');
    } catch (err) {
      c.status(404);
    }
  });
app.run(8080,'localhost');
'148.70.223.218'