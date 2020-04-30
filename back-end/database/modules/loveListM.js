const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个爱人恋爱清单loveList
 *
 * @param {Object} text 
 * @returns
 */
async function addloveList(text){
    let sql = 'insert into loveList(name,content,imgurl,local,listid,lid,setdate) values ($1,$2,$3,$4,$5,$6,$7)';
    let ret = await pgdb.query(sql,[text.name,text.content,text.imgurl,text.local,text.listid,text.lid,text.setdate]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看loveList中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from loveList';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *L
 *根据loveList id删除恋爱日期
 * @param {int} idC
 * @returns
 */
async function delLoveList(id){
    let sql = 'delete from loveList where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据爱人lid找到所有 该爱人的创建的恋爱清单
 *
 * @param {int} lid
 * @returns 所有爱人重要日期
 */
async function findByLid(lid){
    let sql = 'select * from loveList where lid = $1';
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据loveList id找到该loveList的具体信息
 * @param {int} id
 * @returns 相片具体信息
 */
async function findById(id){
    let sql = 'select * from loveList where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据爱人lid找到所有该爱人创建的所有loveList的id
 *
 * @param {int} lid
 * @returns 返回id
 */
async function findIdByLid(lid){
    let sql = 'select id from loveList where pid = $1';
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改爱人清单
 传入要修改的爱人清单id,以及要修改的内容
 注意id类的都不能修改
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */

async function changeById(text){
    let sql = 'update loveList set name=$1,content=$2,imgurl=$3,local=$4,setdate=$5 where id=$6';
    let ret = await pgdb.query(sql,[text.name,text.content,text.imgurl,text.local,text.setdate,text.id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *根据爱人lid删除loveList 中该爱人创建的内容
 *
 * @param {*} lid
 * @returns
 */
async function delAllByLid(lid){
    let sql = 'delete from loveList where lid = $1'
    let ret = await pgdb.query(sql,[lid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

/**
 *根据lid listid查找该爱人是否创建这个清单
 *
 * @param {*} lid
 * @param {*} listid
 * @returns
 */
async function findExist(lid,listid){
    let sql = 'select * from loveList where lid=$1 and listid=$2';
    let ret = await pgdb.query(sql,[lid,listid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}
var loveListM = {
    addloveList,findAll,delLoveList,findById,findByLid,findIdByLid,changeById,delAllByLid,findExist
}
module.exports = loveListM;