function buttonClicked (rating, userID){
    console.log(userID + 'userID '+ rating + 'button clicked!');
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