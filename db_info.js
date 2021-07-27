//mysql 연결
const mysql = require('mysql');

//connection 정의
const con = mysql.createConnection({
    host: 'healing.cdkn59lq9zjm.ap-northeast-2.rds.amazonaws.com',
    user: 'healing4u',
    password: 'healing4u',
    database: "healingDB"
});

//getAllServices 함수 정의
function getAllServices(callback) {
    con.query(`SELECT * FROM services`, (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
    });
}
//getOneService 함수 정의
function getOneService(callback) {
    con.query(`SELECT * FROM services WHERE season=9`, (err, row, fields) => {
        if (err) throw err;
        callback(row);
    });
}


//module.exports = dbconnection;

//외부에서 require를 통해 추가한 스크립트의 함수를 참조할 때 선언해주어야 해당 함수를 참조할 수 있음
module.exports = {
    getAllServices,
    getOneService
}