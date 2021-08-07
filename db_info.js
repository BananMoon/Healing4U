//mysql 연결
const mysql = require('mysql');
//connection 정의
const con = mysql.createConnection({
    host: 'healing.cdkn59lq9zjm.ap-northeast-2.rds.amazonaws.com',
    user: 'healing4u',
    password: 'healing4u',
    database: "healingDB"
});

//getHealingService 함수 정의: healings 테이블 쿼리
function getHealingService(callback) {
    con.query(`SELECT * FROM healings`, (err, row, fields) => {
        if (err) throw err;
        callback(row);
    });
}

//getAdService 함수 정의 : advertisement 테이블 쿼리
function getFoodAdService(callback) {
    con.query(`SELECT * FROM advertisement WHERE food=1`, (err, row, fields) => {
        if (err) throw err;
        callback(row);
    });
}

function getActivityAdService(callback) {
    con.query(`SELECT * FROM advertisement WHERE activity=1`, (err, row, fields) => {
        if (err) throw err;
        callback(row);
    });
}

function getAdService(callback) {
    con.query(`SELECT * FROM advertisement`, (err, row, fields) => {
        if (err) throw err;
        callback(row);
    });
}

//외부에서 require를 통해 추가한 스크립트의 함수를 참조할 때 선언해주어야 해당 함수를 참조할 수 있음
module.exports = {
    getHealingService,
    getAdService
//    getFoodAdService,
//    getActivityAdService
//    getOneService
}