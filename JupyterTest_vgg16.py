from os import listdir
from os.path import isfile, join
import numpy
import cv2
from Common.haar_utils import *
import numpy as np
from tensorflow.keras.models import Model, Sequential
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Flatten
from tensorflow.keras.models import Model, Sequential
from tensorflow.keras.layers import Activation, Dropout, Flatten, Dense
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input, decode_predictions
from tensorflow.keras.applications.vgg16 import preprocess_input
from sklearn.neural_network import MLPClassifier
import seaborn as sns
import matplotlib.pyplot as plt
from tensorflow.keras.layers import Activation, Dropout, Flatten, Dense
from tensorflow.keras.layers import Conv2D
from tensorflow.keras.layers import MaxPooling2D
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Dense
from sklearn.metrics import classification_report,confusion_matrix
import tensorflow as tf


# In[27]:


from os import listdir
import os
import cv2

path= "face_emotion"

# os 모듈을 사용하기 위해 import 먼저 하고, join() 메서드를 통해 분할된 경로가 하나로 정리됨
file_angry = os.path.join(path,"face_angry")
file_happy = os.path.join(path, "face_happy")
file_sad = os.path.join(path,"face_sad")
file_surprise = os.path.join(path,"face_surprise")


def loadImages(path):
    imagesList = listdir(path)    # path에 있는 파일들을 리턴하여 List에 저장
    loadedImages = []
    for image in imagesList:
        image = image.lstrip()
        try:
            img_path=os.path.join(path, image)    # 방금 읽은 img 경로를 img_path 변수에 저장
            img = cv2.imread(img_path, cv2.IMREAD_COLOR)    # 알파 채널 걸러주기 (3차원 이미지만 읽어야함)
            img = cv2.resize(img, (50, 50))    # 이미지 전부 50x50 크기로 resize
        except Exception as e:
            print(path, image)                 # 걸러야 할 이미지 print 해줌 -> 예외처리 된 이미지니까
            print(str(e))
        loadedImages.append(img)    # 걸러진 img를 loadedImg 리스트에 저장

    return loadedImages


file_angry = loadImages(file_angry)
file_happy = loadImages(file_happy)
file_sad = loadImages(file_sad)
file_surprise = loadImages(file_surprise)


total_X =[]
label= []


# 라벨링 작업
for i in range(len(file_angry)):
    total_X.append(file_angry[i])
    label.append("0")

#for v in range(len(file_casual)):
#    total_X.append(file_casual[v])
#    label.append("1")

for n in range(len(file_happy)):
    total_X.append(file_happy[n])
    label.append("1")

for l in range (len (file_sad)):
    total_X.append (file_sad[l])
    label.append ("2")

for a in range(len(file_surprise)):
    total_X.append(file_surprise[a])
    label.append("3")


total_X = np.asarray(total_X)
label = np.asarray(label)


label = to_categorical(label)


# In[28]:

# train 데이터셋에서 test용 데이터를 분리
X_train, X_test, y_train, y_test = train_test_split(total_X, label, test_size=0.1, random_state=66 )
#X_valid, X_test, y_valid, y_test = train_test_split(X_test, y_test, test_size=0.5, random_state=66 )
#X_train, X_temp, y_train, y_temp = train_test_split(total_X, label, test_size=0.1, random_state=66 )
#X_valid, X_test, y_valid, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=66 )


# In[ ]:





# In[19]:


base_model = VGG16 (weights='imagenet', include_top=False)
x = base_model.output
x = GlobalAveragePooling2D () (x)    # pooling 작업 -> 영상 크기 줄여주는 작업


x = Dense (100, activation='relu') (x)
x = Dropout (0.15) (x)
x = Dense (60, activation='relu') (x)
x = Dense (30, activation='relu') (x)


# 원하는 출력 label 수가 4이기 때문에 -> 4개로 변경해줘야 함
predictions = Dense(4, activation='softmax')(x)
# model = Model(inputs=base_model.inputs, outputs=base_model.outputs)

for layer in base_model.layers:
    layer.trainable = False
#
model = Model(base_model.input, predictions)
# https://wooono.tistory.com/100   compile() 메서드는 학습 방식에 대한 환경 설정 (학습 하기 전에 )
model.compile (loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])


# In[9]:

# https://tykimos.github.io/2017/03/25/Fit_Talk/
# model.fit(입력데이터, 라벨값, bath_size: 몇개의 샘플로 가중치를 갱신할 건지, epochs: 학습 반복 횟수 )
history=model.fit(X_train, y_train, epochs=50, batch_size=50, verbose=1,validation_data=(X_test, y_test))


# In[20]:



model.save("my_model.h5")


model.summary()


# In[21]:


import matplotlib.pyplot as plt

plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('model accuracy')
plt.ylabel('accuracy')
plt.xlabel('epoch')
plt.legend(['train', 'test'], loc='upper left')
plt.show()


# In[22]:


plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('model loss')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['train', 'test'], loc='upper left')
plt.show()


# In[23]:





# In[24]:





# In[ ]:





# In[ ]:





# In[ ]:

