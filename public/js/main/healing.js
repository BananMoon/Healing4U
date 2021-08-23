// healing.ejs에서 함수 뺌

function weatherAPI(weather) {
    $.ajax({
        type: "POST",
        url: `/${weather}`,
        data: {},
        error: function(xhr, status, error) {
            if (status == 404) {
                alert("서버 응답 실패");
            }
            window.location.href = "/";
        },
        success: function(response) {
            console.log("저장 완료");
        }
    });
}