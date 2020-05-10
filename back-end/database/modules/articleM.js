const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个文章
 *
 * @param {Object} text 
 * @returns
 */
async function addarticle(text){
    let sql = 'insert into article(name,imgurl,content,tag,style,uid) VALUES($1,$2,$3,$4,$5,$6);';
    let ret = await pgdb.query(sql,[text.name,text.imgurl,text.content,text.tag,text.style,text.uid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看article中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from article order by setdate desc';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}


/**
 *
 *根据article id删除文章
 * @param {int} idC
 * @returns
 */
async function delarticle(id){
    let sql = 'delete from article where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据Uid 找到该用户创建的所有文章
 *
 * @param {*} cid
 * @returns 所有成长的内容
 */
async function findByUid(uid){
    let sql = 'select * from article where uid = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[uid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据Uid 找到该用户创建的所有亲子文章
 *
 * @param {*} uid
 * @returns 所有成长的内容
 */
async function findChildByUid(uid){
    let sql = 'select * from article where uid = $1 and style=true order by setdate desc';
    let ret = await pgdb.query(sql,[uid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}
/**
 *根据Uid 找到该用户创建的所有爱人文章
 *
 * @param {*} uid
 * @returns 所有成长的内容
 */
async function findLoverByUid(uid){
    let sql = 'select * from article where uid = $1 and style=false order by setdate desc';
    let ret = await pgdb.query(sql,[uid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据article id找到该article的具体信息
 * @param {int} id
 * @returns 语音具体信息
 */
async function findById(id){
    let sql = 'select * from article where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据文章id增加文章的Num和文章所有者num
 *
 * @param {*} id
 * @returns 返回id
 */
async function appendNumById(uid,id){
    let sql = 'update article set num=num+1 where id = $1';
    let ret = await pgdb.query(sql,[id]);
    let sql2 = 'update users set num=num+1 where id = $1';
    let ret2 = await pgdb.query(sql2,[uid]);

    if(ret.rowCount<=0 && ret2.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据文章id减少文章的Num和用户自己的num
 *
 * @param {*} id
 * @returns 返回id
 */
async function reduceNumById(uid,id){
    let sql = 'update article set num=num-1 where id = $1';
    let ret = await pgdb.query(sql,[id]);
    let sql2 = 'update users set num=num-1 where id = $1';
    let ret2 = await pgdb.query(sql2,[uid]);
    if(ret.rowCount<=0 && ret2.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *用户给文章小花减少自己的num,这个num减少的是user表中的num
 *
 * @param {*} id
 * @returns 返回id
 */
async function reduceNumByUId(uid){
    // console.log('数据库',uid);
    // let sql1 = 'select * from users where id =$1';
    // let ret1 = await pgdb.query(sql1,[uid]);
    // console.log(ret1);
    let sql = 'update users set num=num-1 where id = $1';
    let ret = await pgdb.query(sql,[uid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *用户取消给文章小花增加自己的num,这个num增加的是user表中的num
 *
 * @param {*} id
 * @returns 返回id
 */
async function addNumByUId(uid){
    let sql = 'update users set num=num+1 where id = $1';
    let ret = await pgdb.query(sql,[uid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *用户给文章点赞,增加文章的赞数
 *
 * @param {*} id
 * @returns 返回id
 */
async function addZanumById(id){
    let sql = 'update article set zannum=zannum+1 where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *用户给文章点赞,可能误点，减少文章的赞数
 *
 * @param {*} id
 * @returns 返回id
 */
async function reduceZanumById(id){
    let sql = 'update article set zannum=zannum-1 where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}
/**
 *根据文章id删除article
 *
 * @param {*} cid
 * @returns
 */
async function delById(id){
    let sql = 'delete from article where id = $1'
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

/**
 *根据文章id修改文章信息
 传入要修改的id ,以及要修改的内容
 注意id类的都不能修改
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */

async function changeById(text){
    let sql = 'update article set name=$1,imgurl=$2,content=$3,tag=$4 where id=$5';
    let ret = await pgdb.query(sql,[text.name,text.imgurl,text.content,text.tag,text.id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}
var articleM = {
    addarticle,findAll,delarticle,findById,findByUid,appendNumById,delById,findChildByUid,findLoverByUid,reduceNumById,reduceNumByUId,addNumByUId,addZanumById,reduceZanumById,changeById
}
module.exports = articleM
