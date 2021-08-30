// router 이용
var express = require('express');
var router = express.Router();
const db_config = require('../config/db_info');
const conn = db_config.init(); // db의 커넥터를 활성화 시킨다.
db_config.connect(conn); //db에 커넥터를 연결해준다.

router.get('/rating', function(req, res) {
  res.render('rating', {
  })
})

// rating 결과값을 전달
router.get("/rating/:result", async (req, res) => {
  const { result } = req.params;
  console.log('서버에서 rating값: ',result);

  // 결과값 체크
  if (Number.isNaN(result)) {
    return res.status(400).end();
  }
  
  let insert_sql = 'INSERT INTO users (rating) VALUES (?)';
  let rating_param = result;
  // goods = await Goods.findOne({ goodsId: goodsId });
  // res.json({ detail: goods });
  conn.query(insert_sql, rating_param, function(err) { // sql를 실행하고 VALUES 으로 params를 보낸다.
    if(err) console.log('query is not excuted. insert fail...\n' + err);
    else console.log('a rating data is inserted');
  });

  // res.render('healing');
  return res.status(204).end();
});
module.exports = router;