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
            
        }
    });
}