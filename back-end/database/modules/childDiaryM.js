const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一条日记
 *
 * @param {Object} text 参照数据表 name,content,imgurl,cid(亲子id)
 * @returns
 */
async function addChildDiary(text){
    let sql = 'insert into childDiary(backcolor,content,imgurl,setdate,cid,bgimg,weather) values ($1,$2,$3,$4,$5,$6,$7)';
    let ret = await pgdb.query(sql,[text.backcolor,text.content,text.imgurl,text.setdate,text.cid,text.bgimg,text.weather]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看ChildDiary中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childDiary';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据childDiary id删除日记
 * @param {int} id
 * @returns
 */
async function delChildDiary(id){
    let sql = 'delete from childDiary where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据亲子id找到所有 该亲子创建的日记内容
 *
 * @param {*} cid
 * @returns 所有日记的内容
 */
async function findByCid(cid){
    let sql = 'select * from childDiary where cid = $1 order by setdate desc';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据日记id找到该日记的具体信息
 * @param {int} id
 * @returns 日记具体信息
 */
async function findById(id){
    let sql = 'select * from childDiary where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据亲子日记id修改亲子日记信息
 传入要修改的id ,以及要修改的内容
 注意id类的都不能修改
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */

async function changeById(text){
    let sql = 'update childDiary set backcolor=$1,content=$2,imgurl=$3,setdate=$4,bgimg=$5,weather=$6 where id=$7';
    let ret = await pgdb.query(sql,[text.backcolor,text.content,text.imgurl,text.setdate,text.bgimg,text.weather,text.id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *根据亲子cid删除childDiary 中该亲子创建的内容
 *
 * @param {*} cid
 * @returns
 */
async function delAllByCid(cid){
    let sql = 'delete from childDiary where cid = $1'
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

var childDiaryM = {
    addChildDiary,findAll,delChildDiary,findByCid,findById,changeById,delAllByCid
}
module.exports = childDiaryM
