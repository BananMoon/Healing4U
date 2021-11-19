function weatherAPI(Weather) {
    $.ajax({
        type: "put",
        url: '/healing',
        data: {weather: Weather},
        dataType: 'json'
    })
    .done(function(response) {
        console.log(response.video_src);
        var videoSrc = document.querySelector('.bg > video');
        videoSrc.setAttribute("src", response.video_src);
        var quote = document.querySelector('.bg > div');
        quote.innerHTML="<p>"+response.quote+"</p><p>"+response.quote_src+"</p>";
        
    })
    .fail(function(xhr, status, error) {
        if (status == 404) {
            alert("서버 응답 실패");
            window.location.href = "/";
        }
    });
}

function DLapi() {
    $.ajax({
        type: "GET",
        url: '/dltest',
        data: {},
        error: function(xhr, status, error) {
            if (status == 404) {
                alert("서버 응답 실패");
                window.location.href = "/";
            }
        },
        success: function(response) {
            window.location.href = `${response.ad_url}`;
            // '/advertisement/' + user_id + '/' + ad_id
        }
    });
};