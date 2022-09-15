import ipfspy.ipfshttpapi as ia
from itertools import islice

import pymysql
import time

import cv2

api = ia.IPFSApi()

conn = pymysql.connect(host='safetymanagement.cqnomdvxrv4y.ap-northeast-2.rds.amazonaws.com', user='yhoon', password='Mcnl2021', db='test', charset='utf8')
cur = conn.cursor()
sql = "insert into cctv values(%s, %s)"

flag = 0
for i in range(1, 4):

    cap = cv2.VideoCapture(0)

    filename = "save"
    filenum = str(i)
    filetype = ".avi"

    result_file = filename + filenum + filetype

    print('width :%d, height : %d' % (cap.get(3), cap.get(4)))

    fourcc = cv2.VideoWriter_fourcc(*'DIVX')
    out = cv2.VideoWriter(result_file, fourcc, 25.0, (640, 480))

    while(True):
        ret, frame = cap.read()    # Read 결과와 frame

        if(ret) :
            # gray = cv2.cvtColor(frame,  cv2.COLOR_BGR2GRAY)    # 입력 받은 화면 Gray로 변환
            cv2.imshow('frame_color', frame)    # 컬러 화면 출력        cv2.imshow('frame_gray', gray)    # Gray 화면 출력
            out.write(frame)

            k = cv2.waitKey(1) & 0xff

            if k == 27:
                break
            flag += 1
            if flag == 100:
                break

    path = "C:/Users/hedbe/PycharmProjects/ipfs_test1/"
    result_path = path + result_file

    res, obj = api.add_items(result_path)
    # print(obj)
    # res, obj = api.add_items('test.txt')
    obj_last = obj[len(obj)-1]
    # print(obj_last)
    obj_hash = dict(islice(obj_last.items(), 1, 2))
    # print(obj_hash)
    print(obj_hash['Hash'])

    vals = (obj_hash['Hash'], time.strftime('%c', time.localtime(time.time())))
    cur.execute(sql, vals)


    flag = 0
    cap.release()
    cv2.destroyAllWindows()

conn.commit()
conn.close()
# api = ia.IPFSApi()
#
# res, obj = api.add_items('C:/Users/hedbe/Downloads/3414.txt')
#
# print(obj)
