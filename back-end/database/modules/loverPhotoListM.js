const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个爱人相册
 *
 * @param {Object} text 
 * @returns
 */
async function addLoverPhotoList(text){
    let sql = 'insert into loverPhotoList(name,lid,background,setdate) values ($1,$2,$3,$4)';
    let ret = await pgdb.query(sql,[text.name,text.lid,text.background,text.setdate]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看loverPhotoList中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from loverPhotoList';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据loverPhotoList id删除爱人相册
 * @param {int} idC
 * @returns
 */
async function delLoverPhotoList(id){
    let sql = 'delete from loverPhotoList where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据爱人id找到所有 该爱人的创建的爱人相册信息
 *
 * @param {int} lid
 * @returns 所有爱人日记的内容
 */
async function findByLid(lid){
    let sql = 'select * from loverPhotoList where lid = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据loverPhotoList id找到该loverPhotoList的具体信息
 * @param {int} id
 * @returns 相片具体信息
 */
async function findById(id){
    let sql = 'select * from loverPhotoList where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据爱人lid找到所有该爱人创建的loverPhotoList的id
 *
 * @param {int} lid
 * @returns 返回id
 */
async function findIdByLid(lid){
    let sql = 'select id from loverPhotoList where lid = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改爱人相册
 传入要修改的爱人相册id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */

async function changeById(text){
    let sql = 'update loverPhotoList set name=$1,background=$2,setdate=$3 where id = $4'
    let ret = await pgdb.query(sql,[text.name,text.background,text.setdate,text.id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}


/**
 *根据爱人lid删除loverPhotoList 中该爱人创建的内容
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
var loverPhotoListM = {
    addLoverPhotoList,delLoverPhotoList,findAll,findById,findByLid,findIdByLid,changeById,delAllByLid
}
module.exports = loverPhotoListM;
