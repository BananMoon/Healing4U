const User = require("../../models/userSchema");

/*
  POST /users 유저 추가
  {
      name: string,
      email: string,
      age: int
  }
*/
exports.userCreate = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: "User 저장 실패",
    });
  }
};

/*
    GET /users 유저 조회
*/
exports.userList = async (req, res) => {
  try {
    const users = await User.find({});
    //res.send({ result: "현재 호출한 부분은 get" });

    res.status(200).send(users); // 얜 안되고 있음.... X
    console.log("읽을 내용: " + users); // 전체 데이터 조회함 (여기 콘솔창에서) => O
    //res.send({ result: "현재 호출한 부분은 get" }); // 통신 -> 응답해 줌 -> 스마트폰에서 조회시키도록 함 (**이게 안되고 있음)
  } catch (e) {
    res.status(500).json({
      message: "User 조회 실패",
    });
  }
};

/*
    GET /users/:id 특정 유저 조회
*/
exports.userRead = async (req, res) => {
  const id = req.params.id;
  //console.log(id);

  try {
    const user = await User.findById(id);
    //console.log("읽을 내용: " + id);
    res.send({ result: "현재 호출한 부분은 get 특정" });

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).json({
      message: "User 조회 실패",
    });
  }
};

/*
    PATCH /users/:id 특정 유저 특정 필드 변경
*/
exports.userUpdate = async (req, res) => {
  console.log("zzz");
  const id = req.params.id;
  console.log(id);

  try {
    // new가 true이면 수정된 문서를 반환
    // runValidators가 true인 경우 업데이트 유효성 검사기를 실행
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      consolg.log("hhh");
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).json({
      message: "User 변경 실패",
    });
  }
};

/*
    DELETE /users/:id 특정 유저 제거
*/
exports.userDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).json({
      message: "User 삭제 실패",
    });
  }
};
