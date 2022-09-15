import time
import board  # 데이터 송신용 board모듈
import adafruit_dht
import ipfspy.ipfshttpapi as ia
import pandas as pd
import numpy as np
import pymysql
import time
from itertools import islice

mydht11 = adafruit_dht.DHT11(board.D20)  # D20 = gpio 핀 번호

count = 0
humidity_list = [0] * 10
temperature_list = [0] * 10
time_list = [0] * 10
local_time_list = [0] * 10

obj_num = 1

while True:

    count = 0;

    while True:
    
        try:
        
            humidity_data = mydht11.humidity
            temperature_data = mydht11.temperature
            print(humidity_data,temperature_data)
            #raw_data = {'humidity' : [humidity_data],
                         #'temperature' : [temperature_data]}
            #raw_data = pd.DataFrame(raw_data)
            humidity_list[count] = humidity_data
            temperature_list[count] = temperature_data
            local_time_list[count] = time.strftime('%c', time.localtime(time.time()))
            print(local_time_list[count])
            count = count + 1
            print(count)
            if count == 10:
                break
            time.sleep(5)  # 대기시간 - 센서 내부에서 초기화 작업 시 필요한 시간
        except RuntimeError as error:
            print(error.args[0])
        finally:
            pass

# Time Process

# DB Process
#conn = pymysql.connect(host='safetymanagement.cqnomdvxrv4y.ap-northeast-2.rds.amazonaws.com', user='yhoon', password='Mcnl2021', db='test', charset='utf8')

#cur = conn.cursor()
#
#sql = "insert into humid_temp values(%s, %s, %s)"
#for i in range(0,10):
#    vals = (humidity_list[i], temperature_list[i], local_time_list[i])
#    cur.execute(sql, vals)
#cur = conn.cursor()
#
#sql = "insert into humid_temp values(%s, %s, %s)"
#for i in range(0,10):
#    vals = (humidity_list[i], temperature_list[i], local_time_list[i])
#    cur.execute(sql, vals)
#conn.commit()
#conn.close()

# CSV File making Process
#raw_data = {'humidity' : [humidity_list],
#        'temperature' : [temperature_list],
#        'time' : [local_time_list]}
#raw_data = pd.DataFrame(raw_data)
#raw_data.to_csv('sample.csv')
    df = pd.DataFrame(humidity_list, columns = ['humidity'])
    df['temperature'] = temperature_list
    df['time'] = local_time_list
    csv_path1 = "hum_tem"
    csv_path2 = ".csv"
    csv_path3 = csv_path1 + str(obj_num) + csv_path2
    df.to_csv(csv_path3, index = False)

# Upload to IPFS
    time.sleep(5)
    api = ia.IPFSApi()
    obj_path1 = "/home/pi/hum_tem"
    obj_path2 = ".csv"
    obj_path3 = obj_path1 + str(obj_num) + obj_path2
    obj_num += 1
    res, obj = api.add_items(obj_path3)
    print(obj)

# Upload ipfs hash to database
    conn = pymysql.connect(host='safetymanagement.cqnomdvxrv4y.ap-northeast-2.rds.amazonaws.com', user='yhoon', password='Mcnl2021', db='test', charset='utf8')
    cur = conn.cursor()
    sql = "insert into hum_tem values(%s, %s)"
    obj_last = obj[len(obj)-1]
# print(obj_last)
    obj_hash = dict(islice(obj_last.items(), 1, 2))
# print(obj_hash)
    print(obj_hash['Hash'])

    vals = (obj_hash['Hash'], time.strftime('%c', time.localtime(time.time())))
    cur.execute(sql, vals)
    conn.commit()
    conn.close()
