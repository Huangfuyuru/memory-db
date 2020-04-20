const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个亲子成绩记录
 *
 * @param {Object} text 
 * @returns
 */
async function addchildScore(text){
    let sql = 'insert into childScore(stage,subject,score,setdate,cid) values ($1,$2,$3,$4)';
    let ret = await pgdb.query(sql,[text.stage,text.subject,text.score,text.setdate,text.cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看childScore中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childScore';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据childScore id删除
 * @param {int} idC
 * @returns
 */
async function delchildScore(id){
    let sql = 'delete from childScore where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据亲子cid找到所有 该亲子的创建的所有亲子成绩记录
 *
 * @param {int} cid
 * @returns 所有爱人日记的内容
 */
async function findBycid(cid){
    let sql = 'select * from childScore where cid = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据childScore id找到该childScore的具体信息
 * @param {int} id
 * @returns
 */
async function findById(id){
    let sql = 'select * from childScore where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据爱人cid找到所有该亲子创建的childScore的id
 *
 * @param {int} cid
 * @returns 返回id
 */
async function findIdBycid(cid){
    let sql = 'select id from childScore where cid = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改爱人日记
 传入要修改的爱人日记id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update childScore set name=$1,content=$2,imgurl=$3 where id = $4'
    let ret = await pgdb.query(sql,[text.name,text.content,text.imgurl,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

/**
 *根据爱人cid删除childScore 中该亲子创建的内容
 *
 * @param {*} cid
 * @returns
 */
async function delAllBycid(cid){
    let sql = 'delete from childScore where cid = $1'
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

var childScoreM = {
    addchildScore,delchildScore,findAll,findById,findBycid,findIdBycid,changeById,delAllBycid
}
module.exports = childScoreM;

