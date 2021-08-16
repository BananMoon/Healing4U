//****** db 정의 ***** *//


const mongoose = require("mongoose");
​
// 스키마 정의 -> 일단은 2개
// 얘를 보통 따로 함. 슬랙 링크 참고
​
/*
const imageSchema = new mongoose.Schema({
    width: Number,
    height: Number,
  });  
  */
​
const userSchema = mongoose.Schema({
  // 사용자 표정 - 슬픔
  emotion: {
    type: Number,
  },
  // 위에 선언한 이미지 스키마 - 스키장 사진
  image: String,
​
  // 장소명(혹은 주소) - 평창
  placeName: {
    type: String,
  },
​
  // 얘는 필수
  // 여기서 필수 의미는, 광고서비스(qr코드를 통해)를 받는 샤람 + 아닌 사람 전부 포괄해야하니까
  // 왜냐면 안드로이드에서는 qr을 안찍는 사람들까지 그래프로 보여줘야 함
  grade: {
    type: Number,
  },
​
  /*  이거 나중에 넣어야 그래프에서 하루별로 시각화 가능 
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    }
    */
});
​
module.exports = mongoose.model("user", userSchema); // 스키마 등록