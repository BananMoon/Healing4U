/*const mongoose = require('mongoose');

const connect = () =>{
    if(process.env.NODE_ENV !== 'production'){ //개발환경일 경우에만 콘솔 출력
        mongoose.set('debug',true);
    }
    mongoose.connect('mongodb://woo:woo@localhost:27017/admin',{
        dbName:'test',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, (error)=>{
        if(error)
            console.log('mongodb connect error', error);
        else
            console.log('mongodb connect');
    });
};

mongoose.connection.on('error', (error)=>{
    console.log('mongodb connect error', error);
});
mongoose.connection.on('disconnected',()=>{
    console.log('mongodb id disconnected. Tying to connect again');
    connect();
});

module.exports = connect;*/
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = `mongodb+srv://woo:woo@healing4u.mpydi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

MongoClient.connect(url)
  .then(client => {
    console.log('mongo connected');
    console.log(client);
  })
  .then(app.listen(1004, () => {
    console.log('3000 port on');
  }))
  .catch(err => console.log(err));