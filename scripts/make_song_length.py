from matplotlib import pyplot as plt
import matplotlib.dates as mdates
import datetime
import numpy as np

def get_timestamp(date):
    date_list = date.split("/")
    year = int(date_list[0])
    month = int(date_list[1])
    day = int(date_list[2])
    
    date_obj = datetime.datetime(year, month, day)
    return date_obj

def str_to_seconds(in_str):
    in_str_list = in_str.split(":")
    minute = int(in_str_list[0])
    second = int(in_str_list[1])
    
    return minute * 60 + second

fname = "./docs/fetched_song_data.csv"
f_lines_raw=[]

with open(fname, encoding="utf-8") as f:
    f_lines_raw = f.readlines()

# f_lines_before = [line.split(',')[12] for line in f_lines_raw]
f_lines_raw.sort(key=lambda x: get_timestamp(x.split(",")[-1]).timestamp())
f_lines = [line.split(',')[12] for line in f_lines_raw]
f_timestamps = [get_timestamp(line.split(',')[-1]) for line in f_lines_raw]
f_timestamp_nums = [date.timestamp() for date in f_timestamps]

# for i in range(len(f_lines_raw)):
#     if f_lines_before[i] != f_lines[i]:
#         print("ERROR")

f_seconds = list(map(str_to_seconds, f_lines))

annot_list_raw = [
    ("メルト", "3:02"),
    ("初音天地開闢神話", "3:03"),
    ("独りんぼエンヴィー", "1:17")
]

annot_list = [
    (
        line[0],
        (
            f_timestamps[f_seconds.index(str_to_seconds(line[1]))], 
            str_to_seconds(line[1])
        )
    ) for line in annot_list_raw
]
# print(annot_list)

# 近似式
trends = np.poly1d(np.polyfit(f_timestamp_nums, f_seconds, 1))(f_timestamp_nums)

plt.plot(f_timestamps, f_seconds, color='#4C5270', fillstyle='none', marker='o',
     linewidth=1, markersize=3)
plt.plot(f_timestamps, trends, color="cyan", linewidth=1)
plt.gca().xaxis.set_major_locator(mdates.MonthLocator(bymonth=(3, 6, 9, 12)))
plt.gca().xaxis.set_minor_locator(mdates.MonthLocator())
plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%Y/%m'))
plt.gca().set_ylim(0, max(f_seconds) + 30)
plt.gca().set_xlabel("時間", fontname="IPAexGothic")
plt.gca().set_ylabel("秒数", fontname="IPAexGothic")
plt.gca().grid(True)

for annot in annot_list:
    plt.gca().annotate(annot[0], xy=annot[1], color="#4C5270", fontname="IPAexGothic")

for label in plt.gca().get_xticklabels(which='major'):
    label.set(rotation=30, horizontalalignment='right')

plt.gcf().text(0.95, 0.95,
                f"latest song\n{f_lines_raw[-1].split(',')[3]}",
                fontname="IPAexGothic",
                backgroundcolor="#FFFF66",
                ha="right", va="top")

plt.show()