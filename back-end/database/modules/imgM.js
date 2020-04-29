const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一条语音
 *
 * @param {Object} text
 * @returns
 */
async function addImg(text){
    let sql = 'insert into img(uri) values ($1)';
    let ret = await pgdb.query(sql,[text.uri]);
    //`console.log('ret.rowCount',ret['_types']);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}




/**
 *根据亲子id找到所有 该亲子创建的语音内容
 *
 * @param {*} cid
 * @returns 所有日记的内容
 */
async function findById(id){
    let sql = 'select uri from img where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows[0];
    }
}



var imgM = {
    addImg,findById
}

module.exports = imgM;

