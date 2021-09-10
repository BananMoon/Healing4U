function weatherAPI(weather) {
            $.ajax({
              type: "GET",
              url: `/healing/${weather}`,
              data: {},
              error: function(xhr, status, error) {
                  if (status == 404) {
                      alert("서버 응답 실패");
                      window.location.href = "/";
                  }
              },
              success: function(response) {
                console.log(response.video_src);
                // $("#video").attr("src", healingData["video_src"]);
                
                var videoSrc = document.getElementById('video');
                console.log(videoSrc);
                // videoSrc.innerHTML="<div id=\'bg\'><video muted autoplay loop src="+response.video_src+"></video></div>";
                videoSrc.setAttribute("src", response.video_src);
                // videoSrc.innerHTML = "<video muted autoplay loop src=" + response.video_src + "></video>"
                var quote = document.getElementById('quote');
                console.log(quote);
                quote.innerHTML="<p>"+response.quote+"</p><p>"+response.quote_src+"</p>";
                
              }
            });
}
