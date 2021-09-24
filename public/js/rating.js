function good_run(rating, userID){
    console.log(rating, userID);
    console.log('button clicked!');
    requestAPI(rating, userID);
}

function bad_run(rating, userID) {
    console.log(rating, userID);
    console.log('button clicked!');
    requestAPI(rating, userID);
}

function requestAPI(rating, userID) {
    $.ajax({
        type: "PUT",
        url: '/rating',
        data: {button: rating, userId: userID },
        dataType: 'json',
        error: function(xhr, status, error) {
            if (status == 404) {
                alert("서버 응답 실패");
            }
            window.location.href = "/";
        },
        success: function(response) {
            alert("저장 완료");
            
        }
    });
}