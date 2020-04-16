const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个文章
 *
 * @param {Object} text 
 * @returns
 */
async function addarticle(text){
    let sql = 'insert into article(name,imgurl,content,tag,num,style,uid) VALUES($1,$2,$3,$4,$5,$6,$7);';
    let ret = await pgdb.query(sql,[text.name,text.imgurl,text.content,text.tag,text.num,text.style,text.uid]);
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
 * @param {*} cid
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
 * @param {*} cid
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
 *根据文章id增加文章的Num和用户自己的num
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

var articleM = {
    addarticle,findAll,delarticle,findById,findByUid,appendNumById,delById,findChildByUid,findLoverByUid
}
module.exports = articleM
