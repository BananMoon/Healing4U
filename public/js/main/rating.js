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


function good_run(button, userId){
    console.log(button, userId);
    console.log('button clicked!');
    requestAPI(button, userId);
}

function bad_run(button, userId) {
    console.log(button, userId);
    console.log('button clicked!');
    requestAPI(button, userId);
}

function requestAPI(button, userId) {
    $.ajax({
        type: "GET",
        url: `/rating/${button}/${userId}`,
        data: {},
        error: function(xhr, status, error) {
            if (status == 404) {
                alert("서버 응답 실패");
            }
            window.location.href = "/";
        },
        success: function(response) {
            alert("저장 완료");
            window.location.href = "/";
        }
    });
}
    // // XMLHttpRequest 객체의 생성
    // var xhr = new XMLHttpRequest();

    // // json으로 전송하는 경우
    // xhr.open('POST', '/rating/good');
    
    // // 클라이언트가 서버로 전송할 데이터의 MIME-type 지정: json
    // xhr.setRequestHeader('Content-type', 'application/json');
    
    // const data = { rating: result};
    
    // xhr.send(JSON.stringify(data));
    // // 비동기 방식으로 Request를 오픈한다
    // // xhr.open('GET', '/rating/good/${result}');
    // // Request를 전송한다
    
    // //// onreadystatechange 이벤트를 이용해 요청에 대한 응답 결과를 처리합니다.
    // xhr.onreadystatechange = function () {
    //     // 서버 응답 완료 && 정상 응답
    //     if (xhr.readyState !== XMLHttpRequest.DONE) return;
    
    //     if (xhr.status === 200) {
    //       console.log(xhr.responseText);
    //     } else {
    //       console.log('server response is failed');
    //     }
    // }
    
    //xhr.send();
    
    //module.exports = {rating:result};
    // let insert_sql = 'INSERT INTO users (rating) VALUES (?)';
    // let params = result;

    // //3. users 테이블에 새 행 추가
    // conn.query(insert_sql, params, function(err) { // sql를 실행하고 VALUES 으로 params를 보낸다.
    //   if(err) console.log('query is not excuted. insert fail...\n' + err);
    //   else console.log('a column of users table is inserted');
    // });
    //dbInsert(result);
    //이 1과 0을 db에 저장해야해
        // fetch("/rating/good/", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         data:result
    //     }),
    // })
    // .then((response) => console.log(response))
    // .then((res) => {
    //     if (res.success) {
    //       alert("저장 완료");
    //     }
    // });