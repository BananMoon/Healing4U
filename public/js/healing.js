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
    // let socket = io.connect('ec2-3-129-8-135.us-east-2.compute.amazonaws.com:8080');
    // socket.on('connect',function() {
    //     console.log('Client has connected to the server!');
    // });
    // socket.on('msg',function(data) {
    //     console.log('Received a message from the DLserver!',data);
    // send("data received!");
    // });
    // socket.on('disconnect',function() {
    //     console.log('The client has disconnected!');
    // });
    // socket.on("error", function( error ) {
    //     console.log("error: "+ error);
    // })
};
// Sends a message to the server via sockets
// function send(message) {
//     socket.send('msg',message);
// };
