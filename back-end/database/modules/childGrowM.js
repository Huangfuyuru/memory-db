const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个成长记录
 *
 * @param {Object} text 
 * @returns
 */
async function addChildGrow(text){
    let sql = 'insert into childGrow(weight,length,age,setdate,cid,unit) values ($1,$2,$3,$4,$5,$6)';
    let ret = await pgdb.query(sql,[text.weight,text.length,text.age,text.setdate,text.cid,text.unit]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看childGrow中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childGrow';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据childGrow id删除成长记录
 * @param {int} idC
 * @returns
 */
async function delChildGrow(id){
    let sql = 'delete from childGrow where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据亲子id找到所有 该亲子创建的成长记录内容
 *
 * @param {*} cid
 * @returns 所有成长的内容
 */
async function findByCid(cid){
  
    let sql = 'select * from childGrow where cid = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[cid]);
   
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据childGrow id找到该childGrow的具体信息
 * @param {int} id
 * @returns 语音具体信息
 */
async function findById(id){
    let sql = 'select * from childGrow where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据亲子id找到所有该亲子创建的childGrow的id
 *
 * @param {*} cid
 * @returns 返回id
 */
async function findIdByCid(cid){
    let sql = 'select id from childGrow where cid = $1';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据成长记录id修改成长记录信息
 传入要修改的id ,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update childGrow set weight=$1,length=$2,age=$3 where id = $4'
    let ret = await pgdb.query(sql,[text.weight,text.length,text.age,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}


/**
 *根据亲子cid删除childGrow 中该亲子创建的内容
 *
 * @param {*} cid
 * @returns
 */
async function delAllByCid(cid){
    let sql = 'delete from childGrow where cid = $1'
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

var childGrowM = {
    addChildGrow,findAll,delChildGrow,findById,findByCid,findIdByCid,changeById,delAllByCid
}
module.exports = childGrowM
