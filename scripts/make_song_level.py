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


fname = "./docs/fetched_song_data.csv"
figfoler = "./docs/figs"
f_lines_raw = []

with open(fname, encoding="utf-8") as f:
    f_lines_raw = list(csv.reader(f))

# f_lines_before = [line.split(',')[12] for line in f_lines_raw]
f_lines_raw.sort(key=lambda x: get_timestamp(x[-1]).timestamp())
f_lines = [line[9] for line in f_lines_raw]
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

        # print(f_timestamps[latest_month_idx])

        f_lines_raw = f_lines_raw[latest_month_idx:]
        f_lines = f_lines[latest_month_idx:]
        f_timestamps = f_timestamps[latest_month_idx:]
        f_timestamp_nums = f_timestamp_nums[latest_month_idx:]

    f_levels = list(map(int, f_lines))

    # print(f_timestamp_nums)
    # print(f_levels)

    # 近似式
    trends = np.poly1d(np.polyfit(f_timestamp_nums, f_levels, 1))(
        f_timestamp_nums)

    plt.plot(f_timestamps, f_levels, color='#4C5270', fillstyle='none', marker='o',
             linewidth=1, markersize=3)
    plt.plot(f_timestamps, trends, color="cyan", linewidth=1)

    if chart_type == 'all':
        plt.gca().xaxis.set_major_locator(mdates.MonthLocator(bymonth=(3, 6, 9, 12)))
        plt.gca().xaxis.set_minor_locator(mdates.MonthLocator())
        plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%Y/%m'))
    elif chart_type == 'latest_month':
        plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=5))
        plt.gca().xaxis.set_minor_locator(mdates.DayLocator())
        plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m/%d'))

    plt.gca().set_ylim(min(f_levels) - 4, max(f_levels) + 1)
    plt.gca().set_xlabel("実装時期", fontname="IPAexGothic")
    plt.gca().set_ylabel("MASTERの楽曲レベル", fontname="IPAexGothic")
    plt.gca().grid(True)

    max_idx = f_levels.index(max(f_levels))
    min_idx = f_levels.index(min(f_levels))
    f_names = [line[3] for line in f_lines_raw]

    annot_list = [
        (f_names[min_idx], (f_timestamps[min_idx], f_levels[min_idx])),
        (f_names[max_idx], (f_timestamps[max_idx], f_levels[max_idx])),
    ]

    # print(annot_list)

    for annot in annot_list:
        plt.gca().annotate(annot[0], xy=annot[1],
                           color="#4C5270", fontname="IPAexGothic")

    for label in plt.gca().get_xticklabels(which='major'):
        label.set(rotation=30, horizontalalignment='right')

    plt.gcf().text(0.15, 0.22,
                   f"平均: {stats.mean(f_levels):5.2f}\n中央値: {stats.median(f_levels):4.1f}\n標準偏差: {stats.stdev(f_levels):5.2f}",
                   fontname="IPAexGothic",
                   backgroundcolor="#FFFF66",
                   ha="left", va="bottom")

    plt.gcf().text(0.95, 0.22,
                   f"latest song\n{f_lines_raw[-1][3]}",
                   fontname="IPAexGothic",
                   backgroundcolor="#FFFF66",
                   ha="right", va="bottom")

    if chart_type == 'all':
        figpath = figfoler + "/song_level_all.png"
    elif chart_type == 'latest_month':
        figpath = figfoler + "/song_level_latest.png"

    plt.tight_layout()
    plt.savefig(figpath)
    plt.close()
