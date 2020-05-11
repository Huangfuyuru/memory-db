const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个成长节点
 *
 * @param {Object} text 
 * @returns
 */
async function addChildAdolesce(text){
    var item = text.item.split(',');
    let sql = 'insert into childAdolesce(item,imgurl,content,cid,name,setdate,date) values ($1,$2,$3,$4,$5,$6,$7)';
    let ret = await pgdb.query(sql,[item,text.imgurl,text.content,text.cid,text.name,text.setdate,text.date]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看childAdolesce中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childAdolesce';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *C
 *根据childAdolesce id删除成长节点
 * @param {int} id
 * @returns
 */
async function delChildAdolesce(id){
    let sql = 'delete from childAdolesce where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据亲子id找到所有 该亲子创建的成长节点内容
 *
 * @param {*} cid
 * @returns 所有成长的内容
 */
async function findByCid(cid){
    let sql = 'select * from childAdolesce where cid = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[cid]);
    console.log(ret.rows);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据childAdolesce id找到该childAdolesce的具体信息
 * @param {int} id
 * @returns 成长节点具体信息
 */
async function findById(id){
    let sql = 'select * from childAdolesce where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据亲子id找到所有该亲子创建的childAdolesce的id
 *
 * @param {*} cid
 * @returns 返回相册id
 */
async function findIdByCid(cid){
    let sql = 'select id from childAdolesce where cid = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据成长节点id修改成长节点信息
 传入要修改的id ,以及要修改的内容
 注意id类不能修改
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */

async function changeById(text){
    var img = text.imgurl.split(',');
    var item = text.item.split(',')
    let sql = 'update childAdolesce set item = $1,imgurl=$2,content=$3,name=$4,setdate=$5,date=$6 where id = $7';
    let ret = await pgdb.query(sql,[item,img,text.content,text.name,text.setdate,text.date,text.id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

async function delAllByCid(cid){
    let sql = 'delete from childAdolesce where cid = $1'
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}
var childAdolesceM = {
    addChildAdolesce,findAll,delChildAdolesce,findByCid,findById,findIdByCid,changeById,delAllByCid
}
module.exports = childAdolesceM;
