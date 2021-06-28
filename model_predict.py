import cv2
import numpy as np


from tensorflow.keras.models import load_model
model = load_model("my_model.h5")    # 표정 분류 모델 갖고 오기


image = cv2.imread('images/kim_sad.jpg', cv2.IMREAD_COLOR)   # 이미지 테스트 해보기
if image is None: raise Exception("영상 파일 읽기 에러")


prediction = model.predict(np.expand_dims(image,axis=0))
# prediction = model.predict_on_batch(face_image)
print(prediction)

cv2.imshow("Face Detector", image)

cv2.waitKey(0)

cv2.destroyAllWindows()