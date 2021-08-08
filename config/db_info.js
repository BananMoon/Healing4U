//mysql 연결
const mysql = require('mysql');

//db 정보
const db_info = {
    host: 'healing.cdkn59lq9zjm.ap-northeast-2.rds.amazonaws.com',
    user: 'healing4u',
    password: 'healing4u',
    database: "healingDB"
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}
// function getHealingService(callback) {
//     dbconnection.query(`SELECT * FROM healings`, (err, row, fields) => {
//         if (err) throw err;
//         callback(row);
//     });
// }

// function getAdService(callback) {
//     dbconnection.query(`SELECT * FROM advertisement`, (err, row, fields) => {
//         if (err) throw err;
//         callback(row);
//     });
// }
// module.exports = {
//     dbconnection,
//     connect,
//     getHealingService,
//     getAdService
// }




// const dbconnection = function() {
//     return mysql.createConnection(db_info);
// };

// function connect(conn) {
//     conn.connect(function(err) {
//         if(err) console.error('mysql connection error : ' + err);
//         else console.log('mysql is connected successfully!');
//     });
// }
// dbconnection.connect();      
//exports에 포함시켜주어야 외부에서 require를 통해 해당 함수/객체를 참조할 수 있음
// init : db의 커넥터 활성화
// connect : db와 커넥터를 연결


//getHealingService 함수 정의: healings 테이블 쿼리
