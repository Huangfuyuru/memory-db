const pgdb = require('./connect');


/**
 *查看list中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from list order BY id';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

async function findAllId(){
    let sql = 'select id from list';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据list id找到该list的具体信息
 * @param {int} id
 * @returns list具体信息
 */
async function findById(id){
    let sql = 'select * from list where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}


var listM = {
    findAll,findById,findAllId
}
module.exports = listM;
