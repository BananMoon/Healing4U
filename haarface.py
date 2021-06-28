import cv2
from Common.haar_utils import *
from os import listdir
import os
import cv2


def preprocessing(img) :    # 전처리 과정
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)   # 그레이로 변환
    gray = cv2.equalizeHist(gray)    # 영상의 대비를 크게 해줘서 -> 전체적인 화질을 개선
    return gray

def loadImages(path):
    imagesList = listdir(path)    # path에 있는 파일들 가져와서 List에 저장
    loadedImages = []
    i=0
    for image in imagesList:
        image = image.lstrip()
        try:
            # 이미지 하나에 대하여 gray + 얼굴 검출
            img_path=os.path.join(path, image)
            image = cv2.imread(img_path, cv2.IMREAD_COLOR)    # 3차원 채널만 걸러주기
            # img = cv2.resize(img, (50, 50))
            img_gray = preprocessing(image)  # 그레이 영상 획득  ------ (1)
            faces = face_cascade.detectMultiScale(img_gray, 1.1, 2, 0, (100, 100))  # 얼굴 검출 ------ (2)
            # 검출한 모든 얼굴들에 대한 반복문 실행
            for x, y, w, h in faces:  # 얼굴에 대한 정보
                face_image = img_gray[y:y + h, x:x + w]   # 얼굴 영역 영상 가져오기 ----- (3)
                cv2.imshow("face detector", face_image)
                if path == file_angry:
                    cv2.imwrite("face_emotion/face_angry/ang" + str(i) + ".jpg", face_image)
                elif path == file_happy:
                    cv2.imwrite("face_emotion/face_happy/hap" + str(i) + ".jpg", face_image)
                elif path == file_sad:
                    cv2.imwrite("face_emotion/face_sad/sa" + str(i) + ".jpg", face_image)
                elif path == file_surprise:
                    cv2.imwrite("face_emotion/face_surprise/surpri" + str(i) + ".jpg", face_image)
                i += 1
            if image is None: raise Exception("영상 파일 읽기 에러")
        except Exception as e:
            print(path, image)
            print(str(e))

path= "emotional_data"

face_cascade = cv2.CascadeClassifier("haarcascade/haarcascade_frontalface_alt2.xml")    # 정면 검출기
if face_cascade.empty(): raise IOError('Unable to load the face cascade classifier xml file')


file_angry = os.path.join(path,"anger")
file_happy = os.path.join(path,"happy")
file_sad = os.path.join(path,"sad")
file_surprise = os.path.join(path,"surprise")

loadImages(file_angry)
loadImages(file_happy)
loadImages(file_sad)
loadImages(file_surprise)

cv2.waitKey(0)
cv2.destroyAllWindows()