const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个好友
 *text.user是用户的id,text.friend是添加的朋友的id
 * @param {Object} text 
 * @returns
 */
async function addfriends(user_id,friend_id){
    let sql = 'insert into friends(user_id,friend_id) values ($1,$2)';
    let ret = await pgdb.query(sql,[user_id,friend_id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看friends中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from friends';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据user_id和friend_id删除该用户的这个好友
 * @param {int} idC
 * @returns
 */
async function delfriends(user_id,friend_id){
    let sql = 'delete from friends where user_id = $1 and friend_id =$2';
    let ret = await pgdb.query(sql,[user_id,friend_id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据user_id找到所有 该用户的好友
 *
 * @param {*} cid
 * @returns 所有成长的内容
 */
async function findByUser(user_id){
    let sql = 'select * from friends where user_id = $1';
    let ret = await pgdb.query(sql,[user_id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据邮箱查找该好友id
 *
 * @param {*} cid
 * @returns 所有成长的内容
 */
async function findByUserEmail(user_email){
    let sql = 'select id from user where email = $1';
    let ret = await pgdb.query(sql,[user_email]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 * 根据好友id在friend查找该好友
 * 
 */
async function findByFriendId(id){
    let sql = 'select * from friends where friend_id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 * 根据好友id在user查找该好友
 * 
 */
async function findByFriendIdInUser(id){
    let sql = 'select * from user where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

var friendsM = {
    addfriends,findAll,delfriends,findByUser,findByUserEmail,findByFriendId,findByFriendIdInUser
}
module.exports = friendsM
