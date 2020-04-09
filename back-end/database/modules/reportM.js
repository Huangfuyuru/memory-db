const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个反映
 *
 * @param {Object} text 
 * @returns
 */
async function addReport(text){
    let sql = 'insert into report(content,uid,solve,replay) values ($1,$2,$3,$4)';
    let ret = await pgdb.query(sql,[text.content,text.uid,text.solve,text.replay]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看report中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from report';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据report id删除清单内容
 * @param {int} idC
 * @returnslist
 */
async function delReport(id){
    let sql = 'delete from report where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *
 *根据report id找到该report的具体信息
 * @param {int} id
 * @returns report具体信息
 */
async function findById(id){
    let sql = 'select * from report where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改report内容
 传入要修改的report id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update report set content=$1,uid=$2,solve=$3,replay=$4 where id = $5'
    let ret = await pgdb.query(sql,[text.content,text.uid,text.solve,text.replay,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

var reportM = {
    addReport,findAll,delReport,changeById,findById
}
module.exports = reportM;
