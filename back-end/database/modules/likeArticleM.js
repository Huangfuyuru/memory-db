const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个喜爱
 *
 * @param {Object} text 
 * @returns
 */
async function addlikeArticle(text){
    let sql = 'insert into likeArticle(article_id,user_id) VALUES($1,$2);';
    let ret = await pgdb.query(sql,[text.article_id,text.user_id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看likeArticle中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from likeArticle ';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}


/**
 *
 *根据likeArticle id删除一个喜爱
 * @param {int} idC
 * @returns
 */
async function dellikeArticle(id){
    let sql = 'delete from likeArticle where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *
 *根据likeArticle user_id和article_id 删除一个喜爱
 * @param {int} idC
 * @returns
 */
async function dellikeArticleByTwo(user_id,article_id){
    let sql = 'delete from likeArticle where user_id = $1 and article_id = $2';
    let ret = await pgdb.query(sql,[user_id,article_id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}


/**
 *根据Uid 找到该用户所有喜爱的文章
 *
 * @param {*} cid
 * @returns 所有成长的内容
 */
async function findByUid(uid){
    let sql = 'select * from likeArticle where user_id = $1 ';
    let ret = await pgdb.query(sql,[uid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}



/**
 *
 *根据likeArticle id找到该likeArticle的具体信息
 * @param {int} id
 * @returns 语音具体信息
 */
async function findById(id){
    let sql = 'select * from likeArticle where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}





var likeArticleM = {
    addlikeArticle,findAll,findById,findByUid,dellikeArticleByTwo,dellikeArticle
}
module.exports = likeArticleM
