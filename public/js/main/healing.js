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

function DLapi() {
    let socket = io.connect('ec2-3-129-8-135.us-east-2.compute.amazonaws.com:8080');
    socket.on('connect',function() {
      console.log('Client has connected to the server!');
    });
    socket.on('msg',function(data) {
      console.log('Received a message from the DLserver!',data);
      send("data received!");
    });
    socket.on('disconnect',function() {
      console.log('The client has disconnected!');
    });
    socket.on("error", function( error ) {
      console.log("error: "+ error);
    })
    // Sends a message to the server via sockets
    function send(message) {
      socket.send('msg',message);
    };


    // socket.on('msg', function (data) {
    //   console.log(data);
    //   //$("#chatContent").append(`${data}<br>`);
    // });

    // $("#myChat").on("keyup", function () {
    //   if (window.event.keyCode == 13) {
    //     $("#chatContent").append(`Client : "${$(this).val()}" 보냅니다.<br>`);
    //     socket.emit('msg', $(this).val());
    //     $(this).val("");
    //   }
    // });
  // $.ajax({
  //   type: "GET",
  //   url: `/healing/${weather}`,
  //   data: {},
  //   error: function(xhr, status, error) {
  //       if (status == 404) {
  //           alert("서버 응답 실패");
  //           window.location.href = "/";
  //       }
  //   },
  //   success: function(response) {
  //     console.log(response.video_src);
  //     // $("#video").attr("src", healingData["video_src"]);
      
  //     var videoSrc = document.getElementById('video');
  //     console.log(videoSrc);
  //     // videoSrc.innerHTML="<div id=\'bg\'><video muted autoplay loop src="+response.video_src+"></video></div>";
  //     videoSrc.setAttribute("src", response.video_src);
  //     // videoSrc.innerHTML = "<video muted autoplay loop src=" + response.video_src + "></video>"
  //     var quote = document.getElementById('quote');
  //     console.log(quote);
  //     quote.innerHTML="<p>"+response.quote+"</p><p>"+response.quote_src+"</p>";
      
  //   }
  // });
}