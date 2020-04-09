const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一条语音
 *
 * @param {Object} text
 * @returns
 */
async function addChildVoice(text){
    let sql = 'insert into childVoice(name,voiceurl,cid) values ($1,$2,$3)';
    let ret = await pgdb.query(sql,[text.name,text.voiceurl,text.cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看ChildVoice中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childVoice';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据childVoice id删除日记
 * @param {int} id
 * @returns
 */
async function delChildVoice(id){
    let sql = 'delete from childVoice where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据亲子id找到所有 该亲子创建的语音内容
 *
 * @param {*} cid
 * @returns 所有日记的内容
 */
async function findByCid(cid){
    let sql = 'select * from childVoice where cid = $1';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据语音id找到该语音的具体信息
 * @param {int} id
 * @returns 语音具体信息
 */
async function findById(id){
    let sql = 'select * from childVoice where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改亲子语音信息
 传入要修改的亲子语音id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update childVoice set name=$1,voiceurl=$2 where id = $3'
    let ret = await pgdb.query(sql,[text.name,text.voiceurl,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

/**
 *根据亲子cid删除childVoice 中该亲子创建的内容
 *
 * @param {*} cid
 * @returns
 */
async function delAllByCid(cid){
    let sql = 'delete from childVoice where cid = $1'
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

var childVoiceM = {
    addChildVoice,delChildVoice,findAll,findByCid,findById,changeById,delAllByCid
}

module.exports = childVoiceM;

