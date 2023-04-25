import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import datetime
import calendar
import numpy as np
import statistics as stats
import csv


def get_timestamp(date):
    date_list = date.split("/")
    year = int(date_list[0])
    month = int(date_list[1])
    day = int(date_list[2])

    date_obj = datetime.datetime(year, month, day)
    return date_obj


def str_to_seconds(in_str):
    in_str_list = in_str.split(":")
    try:
        minute = int(in_str_list[0])
        second = int(in_str_list[1])
    except Exception as e:
        print(in_str)
        print(e)

    return minute * 60 + second


fname = "./docs/fetched_song_data.csv"
figfoler = "./docs/figs"
f_lines_raw = []

with open(fname, encoding="utf-8") as f:
    f_lines_raw = list(csv.reader(f))

f_lines_raw.sort(key=lambda x: get_timestamp(x[-1]).timestamp())
f_lines_raw = [line for line in f_lines_raw if str_to_seconds(line[12]) != 0]
f_lines = [line[12] for line in f_lines_raw]
f_timestamps = [get_timestamp(line[-1]) for line in f_lines_raw]
f_timestamp_nums = [date.timestamp() for date in f_timestamps]

for chart_type in ['all', 'latest_month']:
    if chart_type == 'latest_month':
        latest_month_idx = 0
        timestamp_now = datetime.datetime.now()
        year = timestamp_now.year
        month = timestamp_now.month
        day = timestamp_now.day

        # 1月のとき
        if month == 1:
            month = 13
            year -= 1

        # 先月の日数が少ないとき
        if calendar.monthrange(year, month-1)[1] < day:
            day = calendar.monthrange(year, month-1)[1]

        timestamp_start = datetime.datetime(year, month-1, day)

        for idx in range(len(f_timestamps)):
            if timestamp_start <= f_timestamps[idx] or idx == len(f_timestamps)-1:
                latest_month_idx = idx
                break

        f_lines_raw = f_lines_raw[latest_month_idx:]
        f_lines = f_lines[latest_month_idx:]
        f_timestamps = f_timestamps[latest_month_idx:]
        f_timestamp_nums = f_timestamp_nums[latest_month_idx:]

    f_seconds = list(map(str_to_seconds, f_lines))

    # 近似式
    trends = np.poly1d(np.polyfit(f_timestamp_nums, f_seconds, 1))(
        f_timestamp_nums)

    plt.plot(f_timestamps, f_seconds, color='#4C5270', fillstyle='none', marker='o',
             linewidth=1, markersize=3)
    plt.plot([f_timestamps[0], f_timestamps[-1]], [trends[0],
             trends[-1]], color="cyan", marker='o', linewidth=1)

    if chart_type == 'all':
        plt.gca().xaxis.set_major_locator(mdates.MonthLocator(bymonth=(3, 6, 9, 12)))
        plt.gca().xaxis.set_minor_locator(mdates.MonthLocator())
        plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%Y/%m'))
    elif chart_type == 'latest_month':
        plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=5))
        plt.gca().xaxis.set_minor_locator(mdates.DayLocator())
        plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m/%d'))

    plt.gca().set_ylim(0, max(f_seconds) + 30)
    plt.gca().set_xlabel("実装時期", fontname="IPAexGothic")
    plt.gca().set_ylabel("秒数", fontname="IPAexGothic")
    plt.gca().grid(True)

    max_idx = f_seconds.index(max(f_seconds))
    min_idx = f_seconds.index(min(f_seconds))
    f_names = [line[3] for line in f_lines_raw]

    annot_list = [
        (f_names[min_idx], (f_timestamps[min_idx], f_seconds[min_idx])),
        (f_names[max_idx], (f_timestamps[max_idx], f_seconds[max_idx])),
    ]

    # print(annot_list)

    for annot in annot_list:
        plt.gca().annotate(annot[0], xy=annot[1],
                           color="#4C5270", fontname="IPAexGothic")

    for label in plt.gca().get_xticklabels(which='major'):
        label.set(rotation=30, horizontalalignment='right')

    plt.gcf().text(0.15, 0.22,
                   f"平均: {stats.mean(f_seconds):6.2f}秒\n中央値: {stats.median(f_seconds):5.1f}秒\n標準偏差: {stats.stdev(f_seconds):6.2f}秒",
                   fontname="IPAexGothic",
                   backgroundcolor="#FFFF66",
                   ha="left", va="bottom")

    plt.gcf().text(0.95, 0.22,
                   f"latest song\n{f_lines_raw[-1][3]}",
                   fontname="IPAexGothic",
                   backgroundcolor="#FFFF66",
                   ha="right", va="bottom")

    plt.gcf().text(0.15, 0.33,
                   f'{trends[0]:.1f}',
                   fontname="IPAexGothic",
                   color="cyan",
                   ha="left", va="bottom")

    plt.gcf().text(0.95, 0.3,
                   f'{trends[-1]:.1f}',
                   fontname="IPAexGothic",
                   color="cyan",
                   ha="right", va="bottom")

    if chart_type == 'all':
        figpath = figfoler + "/song_length_all.png"
    elif chart_type == 'latest_month':
        figpath = figfoler + "/song_length_latest.png"

    plt.tight_layout()
    plt.savefig(figpath)
    plt.close()
