const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个爱人日记
 *
 * @param {Object} text 
 * @returns
 */
async function addLoverDiary(text){
    let sql = 'insert into loverDiary(name,content,imgurl,setdate,lid) values ($1,$2,$3,$4,$5)';
    let ret = await pgdb.query(sql,[text.name,text.content,text.imgurl,text.setdate,text.lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看loverDiary中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from loverDiary';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据loverDiary id删除爱人日记
 * @param {int} idC
 * @returns
 */
async function delLoverDiary(id){
    let sql = 'delete from loverdiary where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据爱人id找到所有 该爱人的创建的爱人日记信息
 *
 * @param {int} lid
 * @returns 所有爱人日记的内容
 */
async function findByLid(lid){
    let sql = 'select * from loverDiary where lid = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据loverDiary id找到该loverDiary的具体信息
 * @param {int} id
 * @returns 相片具体信息
 */
async function findById(id){
    let sql = 'select * from loverDiary where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据爱人lid找到所有该爱人创建的loverDiary的id
 *
 * @param {int} lid
 * @returns 返回id
 */
async function findIdByLid(lid){
    let sql = 'select id from loverDiary where lid = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改爱人日记
 传入要修改的爱人日记id,以及要修改的内容
 注意id类的都不能修改,
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */

async function changeById(text){
    let sql = 'update loverDiary set name=$1,content=$2,imgurl=$3,setdate=$4 where id=$5';
    let ret = await pgdb.query(sql,[text.name,text.content,text.imgurl,text.setdate,text.id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}


/**
 *根据爱人lid删除loverDiary 中该爱人创建的内容
 *
 * @param {*} lid
 * @returns
 */
async function delAllByLid(lid){
    let sql = 'delete from loverDiary where lid = $1'
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

var loverDiaryM = {
    addLoverDiary,delLoverDiary,findAll,findById,findByLid,findIdByLid,changeById,delAllByLid
}
module.exports = loverDiaryM;