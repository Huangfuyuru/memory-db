const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个爱人语音
 *
 * @param {Object} text 
 * @returns
 */
async function addLoverVoice(text){
    let sql = 'insert into loverVoice(name,voiceurl,lid) values ($1,$2,$3)';
    let ret = await pgdb.query(sql,[text.name,text.voiceurl,text.lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看loverVoice中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from loverVoice';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据loverVoice id删除爱人语音
 * @param {int} idC
 * @returns
 */
async function delLoverVoice(id){
    let sql = 'delete from loverVoice where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据爱人id找到所有 该爱人的创建的爱人语音信息
 *
 * @param {int} lid
 * @returns 所有爱人语音的内容
 */
async function findByLid(lid){
    let sql = 'select * from loverVoice where lid = $1';
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据loverVoice id找到该loverVoice的具体信息
 * @param {int} id
 * @returns 相片具体信息
 */
async function findById(id){
    let sql = 'select * from loverVoice where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据爱人lid找到所有该爱人创建的loverVoice的id
 *
 * @param {int} lid
 * @returns 返回id
 */
async function findIdByLid(lid){
    let sql = 'select id from loverVoice where lid = $1';
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改爱人语音
 传入要修改的爱人语音id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update loverVoice set name=$1,voiceurl=$2 where id = $3'
    let ret = await pgdb.query(sql,[text.name,text.voiceurl,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}



/**
 *根据爱人lid删除loverVoice 中该爱人创建的内容
 *
 * @param {*} lid
 * @returns
 */
async function delAllByLid(lid){
    let sql = 'delete from loverPhotoList where lid = $1'
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}
var loverVoiceM = {
    addLoverVoice,delLoverVoice,findAll,findById,findByLid,findIdByLid,changeById,delAllByLid
}
module.exports = loverVoiceM;
