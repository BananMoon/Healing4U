//mysql 연결
const mysql = require('mysql');

//db 정보
const conn = {
    host: 'healing.ceuy4iegap9i.ap-northeast-2.rds.amazonaws.com',  //aws RDS
    user: 'healing4u',
    password: 'healing4u',
    database: "healingDB"
};

module.exports = {
    init,
    connect,
    mysql:mysql
}

function init() {
    return mysql.createConnection(conn);
}

function connect(conn) {
    conn.connect(function(err) {
        if (err) {
            console.error('mysql connection error : ' + err.stack);
            return;
          }
        
          console.log('mysql is connected successfully connected as id ' + conn.threadId);
    });
}