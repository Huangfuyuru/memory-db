const pgdb = require('./connect');


/**
 *增加爱人
 *
 * @param {Object} person
 * @returns
 */
async function addLover(person){
    let ret;
    if(person.gender){
        let sql = 'insert into lovers(name,ldate,gender,uid) values ($1,$2,$3,$4)';
        ret = await pgdb.query(sql,[person.name,person.ldate,person.gender,person.uid])
    }else{
        let sql = 'insert into lovers(name,ldate,uid) values ($1,$2,$3)';
        ret = await pgdb.query(sql,[person.name,person.ldate,person.uid])
    }
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据爱人id删除这个爱人
 *
 * @param {*} id
 * @returns
 */
async function delLover(id){
    let sql = 'delete from lovers where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

/**
 *
 * 根据爱人id 找到该爱人的具体信息
 * @param {int} id
 * @returns
 */
async function findById(id){
    let sql = 'select * from lovers where id  = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据用户id 查找该用户创建的所有爱人信息
 * @param {int} uid
 * @returns
 */
async function findIdByUid(uid){
    let sql = 'select * from lovers where uid = $1';
    let ret = await pgdb.query(sql,[uid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}
/**
 *查看爱人表中的所有内容
 *
 * @returns 
 */
async function findAll(){
    let sql = 'select * from lovers';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改爱人信息
 传入要修改的爱人id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update lovers set name = $1,ldate=$2,gender=$3 where id = $4'
    let ret = await pgdb.query(sql,[text.name,text.ldate,text.gender,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

/**
 *
 *通过id更新背景图片
 * @param {*} id
 * @param {*} background
 * @returns
 */
async function changeBackGroundById(text){
    console.log('数据库',text)
    let sql = 'update lovers set background=$1 where id = $2'
    let ret = await pgdb.query(sql,[text.background,text.id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}
var loverM = {
    addLover,findAll,findById,findIdByUid,delLover,changeById,changeBackGroundById
}
module.exports = loverM;

