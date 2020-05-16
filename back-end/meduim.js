process.chdir(__dirname);

const titbit = require('titbit');
const fs = require('fs');

var app = new titbit({
  //默认开启调试模式
  debug: true,
  //设置允许最大上传～50M
  bodyMaxSize: 50000000
});

/*
 * 这是框架本身支持的，并不是每个框架都支持，
 * 但是你可以轻松的使用中间件或是组件来实现类似的依赖注入。
 * 在请求上下文中，就可以通过c.service来访问所有在app.service上的对象或变量。
 * */

app.service.mediapath = {
  image : `${__dirname}/images`,
  audio : `${__dirname}/audios`,
  video : `${__dirname}/videos`
};

/**
 * 在这里使用了全部读取文件再返回的形式，如果是大文件最好是边读边返回，这可以使用pipe来快速解决。
 * 而对于图片这样的文件来说，读取完成后可以缓存下来，加快下次请求的响应速度。但是这里并没有使用缓存。
 * titbit框架中可以直接使用c.helper.readb返回buffer数据，但是这里封装一个函数方便大家了解具体过程。
 * */

function getMediaData (pathfile) {
  return new Promise((rv, rj) => {
    fs.readFile(pathfile, (err, data) => {
      if (err) {
        rj(err);
      } else {
        rv(data);
      }
    });
  });
}

//根据类型和名称确定content-type
//type和name都是路由参数传递过来的
function contentType (type, name) {
  switch (type) {
    case 'image':
      if (name.indexOf('.png') > 0) {
        return 'image/png';
      }
      if (name.indexOf('.jpg') > 0) {
        return 'image/jpeg';
      }
      if (name.indexOf('.webp') > 0) {
        return 'image/webp';
      }
      break;

    case 'audio':
      if (name.indexOf('.mp3') > 0) {
        return 'audio/mp3';
      }

    case 'video':
      if (name.indexOf('.mp4') > 0) {
        return 'video/mp4';
      }

    default:
      return '';
  }
  return '';
}

/* 
  通过参数type和name来确定资源的类型和名称，对于前端来说，不需要知道服务器上资源具体的存储路径。
  这对前后端来说，是非常方便的，即使路径改变了也不需要修改前端代码。
  对于比较大的视频文件来说，这种直接返回数据的方式是不可取的，使用pipe也不行，就是你需要开发一个比较完整的前后端来支持播放。
*/
app.get('/media/:type/:name', async c => {
  try {

    let pathfile = `${c.service.mediapath[c.param.type]}/${c.param.name}`;

    let content_type = contentType(c.param.type, c.param.name);

    //不同的content-type，浏览器会出现不同的处理方式，要设置正确的content-type避免出现问题
    c.setHeader('content-type', content_type);

    c.res.body = await getMediaData(pathfile);

    c.setHeader('content-length', c.res.body.length);

  } catch (err) {
    c.status(404);
  }
});


app.post('/media/:type', async c => {

  let type = c.param.type;

  //也许这是不好的代码，我相信你可以自己去修改它，但是它现在可以工作
  if (['image','audio','video'].indexOf(type) < 0) {
    c.res.body = {
      status : 'EFAILED',
      errmsg : '不支持的文件类型'
    };
    return
  }

  let f = c.getFile(type);
  try {

    let hashstr = `${Date.now()}${Math.random()}${c.ip}`;

    //生成sha1字符串作为名称，你可以使用其他方案，只要保证名称不冲突。
    //这里使用了助手函数extName返回文件的扩展名。
    let fname = `${c.helper.sha1(hashstr)}${c.helper.extName(f.filename)}`;

    let count = await c.moveFile(f, `${c.service.mediapath[type]}/${fname}`);

    if (count !== f.length) {
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

//建议你还是明确指定host。
//尤其在要获取客户端IP并进行限流的场景，否则你得到的可能是IPv6和IPv4混合的地址。
app.run(8080, '0.0.0.0');