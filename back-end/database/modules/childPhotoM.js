const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个照片
 *
 * @param {Object} text 
 * @returns
 */
async function addChildPhoto(text){
    let sql = 'insert into childPhoto(imgurl,pid) values ($1,$2)';
    let ret = await pgdb.query(sql,[text.imgurl,text.pid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看childPhoto中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childPhoto';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据childPhoto id删除照片
 * @param {int} idC
 * @returns
 */
async function delChildPhoto(id){
    let sql = 'delete from childPhoto where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据相册pid找到所有 该相册的所有照片信息
 *
 * @param {*} pid
 * @returns 所有成长的内容
 */
async function findByPid(pid){
    let sql = 'select * from childPhoto where pid = $1';
    let ret = await pgdb.query(sql,[pid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据childPhoto id找到该childPhoto的具体信息
 * @param {int} id
 * @returns 相片具体信息
 */
async function findById(id){
    let sql = 'select * from childPhoto where id = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据相册pid找到所有该相册创建的childPhoto的id
 *
 * @param {*} cid
 * @returns 返回id
 */
async function findIdByPid(pid){
    let sql = 'select id from childPhoto where pid = $1';
    let ret = await pgdb.query(sql,[pid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改照片信息
 传入要修改的照片id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update  set imgurl=$1 where id = $2'
    let ret = await pgdb.query(sql,[text.name,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}


/**
 *根据相册pid 删除这个相册所有照片
 *
 * @param {*} pid
 * @returns
 */
async function delAllByPid(pid){
    let sql = 'delete from childPhoto where pid=$1'
    let ret = await pgdb.query(sql,[pid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}
var childPhotoM = {
    addChildPhoto,delChildPhoto,findAll,findById,findByPid,findIdByPid,changeById,delAllByPid
}
module.exports = childPhotoM;
