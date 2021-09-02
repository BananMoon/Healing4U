// healing.ejs에서 함수 뺌
// videoSrcTag = document.querySelector('.bg video source')
// quoteTag = document.querySelector('.quote first-child p')
// quoteSrcTag = document.querySelector('.quote last-child p')

function weatherAPI(weather) {
    $.ajax({
        type: "GET",
        url: `/${weather}`,
        data: {},
        error: function(xhr, status, error) {
            if (status == 404) {
                alert("서버 응답 실패");
                window.location.href = "/";
            }
        },
        success: function(response) {
          var videoSrc = document.querySelector('.container');
          videoSrc.innerHTML = "<video muted autoplay loop src=" + response.video_src + "></video>"
          var quote = document.getElementById('quote');
          quote.innerHTML="<p>"+response.quote+"</p><p>"+response.quote_src+"</p>";
          
        }
      });
}
            // $('.bg video source').attr('src', response.video_src);
            // $(".bg video")[0].load();
            // videoSrcTag.setAttribute('src', response.video_src);
            // quoteTag.innerText = response.quote;
            // quoteSrcTag.innerText = response.quote_src;

            // console.log(response.video_src);
            // console.log(response.quote);
            // console.log(response.quote_src);
