// rating.html 에 적용되는 js
/*버튼 클릭시 rating 칼럼= 0 or 1 을 index.js의 insert문에 전달.*/

// const mysql = require('../../../config/db_info');

// function dbInsert(result) {
//     let insert_sql = 'INSERT INTO users (rating) VALUES (?)';
//     let params = result;

//         //mysql 연결
//     //데이터베이스 접속 

//     var connection = mysql.createConnection({
//         host: 'healing.cdkn59lq9zjm.ap-northeast-2.rds.amazonaws.com',
//         user: 'healing4u',
//         password: 'healing4u',
//         database: "healingDB"
//     });
    
//     //접속안되는 경우 
    
//     connection.connect(function(err){
//       if(err){
//         console.log(err);
//       throw err;
//       }
//     });
//     //쿼리
//     connectionquery(insert_sql, params,
//     function(err, results, fields){
//         if(err){
//             throw err;
//         }
//         var itemid;
//         if(results.length > 0){
//             itemid = results[0].maxid + 1;
//         }else{
//             itemid = 1;
//         }
//     });
//}
function good_run(result){
    console.log(result);
    console.log('button clicked!');
    module.exports = {rating:result};
    // let insert_sql = 'INSERT INTO users (rating) VALUES (?)';
    // let params = result;

    // //3. users 테이블에 새 행 추가
    // conn.query(insert_sql, params, function(err) { // sql를 실행하고 VALUES 으로 params를 보낸다.
    //   if(err) console.log('query is not excuted. insert fail...\n' + err);
    //   else console.log('a column of users table is inserted');
    // });
    //dbInsert(result);
    //이 1과 0을 db에 저장해야해
}

function bad_run(result) {
    console.log(result);
    console.log('button clicked!');
    //dbInsert(result);

}

