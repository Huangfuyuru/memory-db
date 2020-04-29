const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个重要日期
 *
 * @param {Object} text 
 * @returns
 */
async function addLoverImpDate(text){
    let sql = 'insert into loverImpDate(name,content,imgurl,item,date,voiceurl,lid,mood,setdate) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)';
    let ret = await pgdb.query(sql,[text.name,text.content,text.imgurl,text.item,text.date,text.voiceurl,text.lid,text.mood,text.setdate]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看loverImpDate中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from loverImpDate';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据loverImpDate id删除重要日期
 * @param {int} idC
 * @returns
 */
async function delLoverImpDate(id){
    let sql = 'delete from loverImpDate where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据爱人id找到所有 该爱人的创建的重要日期
 *
 * @param {int} lid
 * @returns 所有爱人重要日期
 */
async function findByPid(lid){
    let sql = 'select * from loverImpDate where lid = $1';
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据loverImpDate id找到该loverImpDate的具体信息
 * @param {int} id
 * @returns 相片具体信息
 */
async function findById(id){
    let sql = 'select * from loverImpDate where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据爱人lid找到所有该爱人创建的所有loverImpDate的id
 *
 * @param {int} lid
 * @returns 返回id
 */
async function findIdByPid(lid){
    let sql = 'select id from loverImpDate where pid = $1';
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改重要日期
 传入要修改的重要日期id,以及要修改的内容
 注意id类的都不能修改
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */

async function changeById(text){
    let sql = 'update loverImpDate set name=$1,content=$2,imgurl=$3,item=$4,date=$5,voiceurl=$6,mood=$7,setdate=$8 where id=$9';
    let ret = await pgdb.query(sql,[text.name,text.content,text.imgurl,text.item,text.date,text.voiceurl,text.mood,text.setdate,text.id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}



/**
 *根据爱人lid删除loverImpDate 中该爱人创建的内容
 *
 * @param {*} lid
 * @returns
 */
async function delAllByLid(lid){
    let sql = 'delete from loverImpDate where lid = $1'
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}
var loverImpDateM = {
    addLoverImpDate,delLoverImpDate,findAll,findById,findByPid,findIdByPid,changeById,delAllByLid
}
module.exports = loverImpDateM;