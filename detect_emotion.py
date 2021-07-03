# 컴퓨터 카메라를 통해서 얼굴 인식 및 표정 감지 (YOLO 사용X)
# Raspberry Pi에서는 tensorflow 설치 오류로 얼굴 인식까지만 확인됨.

# 표정 분류 모형에 대한 정의가 필요 (적합 모형 저장 및 불러오기)

import cv2
import numpy as np
import tensorflow as tf

# 얼굴표정 분류 모형
model = tf.keras.models.load_model("my_model.h5")

# 얼굴 인식 모형
face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")

# 카메라 지정
cap = cv2.VideoCapture(0)

while cap.isOpened():       # 카메라가 켜져 있는 동안
    _, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x,y ), (x + w, y + h), (255, 0 , 0), 3)
        roi_color = img[y : y+h, x : x+w]
        
        # 분류 모형을 통해 표정 예측
        pred = model.predict(np.expand_dims(roi_color,axis=0))
        if max(max(pred))==max(pred)[0]: # anger
            cv2.putText(img, "anger", (20, 550), cv2.FONT_HERSHEY_COMPLEX, 1, (100, 0, 255), 2)
        elif max(max(pred))==max(pred)[1]: # happy
            cv2.putText(img, "happy", (20, 550), cv2.FONT_HERSHEY_COMPLEX, 1, (100, 0, 255), 2)
        elif max(max(pred))==max(pred)[2]: #sad
            cv2.putText(img, "sad", (20, 550), cv2.FONT_HERSHEY_COMPLEX, 1, (100, 0, 255), 2)
        elif max(max(pred))==max(pred)[3]: #surprise
            cv2.putText(img, "surprise", (20, 550), cv2.FONT_HERSHEY_COMPLEX, 1, (100, 0, 255), 2)
        else:
            cv2.putText(img, "Nothing", (20, 550), cv2.FONT_HERSHEY_COMPLEX, 1, (100, 0, 255), 2)
        

    cv2.imshow("image", img)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()

