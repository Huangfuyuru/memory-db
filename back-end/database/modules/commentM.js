const pgdb = require('./connect');

/**
 *增加一条评论
 *
 * @param {Object} text
 * @returns
 */
async function addcomment(text){
    let sql = 'insert into comment(tag,article_id,answer_id,host_id,user_id,content) values ($1,$2,$3,$4,$5,$6)';
    let ret = await pgdb.query(sql,[text.tag,text.article_id,text.answer_id,text.host_id,text.user_id,text.content]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

/**
 *根据评论id删除这个评论
 *
 * @param {*} id
 * @returns
 */
async function delcomment(id){
    let sql = 'delete from comment where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

/**
 *
 * 根据亲子id 找到该亲子的具体信息
 * @param {int} id
 * @returns
 */
async function findById(id){
    let sql = 'select * from comment where id  = $1 by setdate desc';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据文章id 查找该文章所有的评论
 * @param {int} uid
 * @returns
 */
async function findByArticleId(id){
    let sql = 'select * from comment where article_id = $1 by setdate desc';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}
/**
 *
 *根据评论id 查找该评论所有的评论
 * @param {int} uid
 * @returns
 */
async function findByAnswerId(id){
    let sql = 'select * from comment where answer_id = $1 by setdate desc';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}



var commentM = {
    addcomment,findByAnswerId,findById,findByArticleId,delcomment
}
module.exports = commentM;

