import datetime
import os
import sys
import csv
from matplotlib import pyplot as plt
import pandas as pd
import requests


csv_key_data = ["No", "default index", "type", "name", "unit", "E", "N", "H", "EX",
                "M", "A", "EX notes", "M notes", "A notes", "time", "BPM", "MV", "MV personnel", "release date"]

def get_song_table():
    global csv_key_data
    
    pjsekai_res = requests.get("https://pjsekai.com/?aad6ee23b0")

    a = pd.read_html(pjsekai_res.content, encoding="utf-8",
                    attrs={"id": "sortable_table1"})[0]
    a.columns = csv_key_data
    a["release date"] = a["release date"].apply(read_time)
    a.set_index("release date", inplace=True)
    a.sort_index(inplace=True, ascending=False)
    return a

def read_time(s):
    return datetime.datetime.strptime(s, "%Y/%m/%d")

# plt.rcParams["font.family"] = "sans-serif"
# plt.rcParams["font.sans-serif"] = ["Meiryo"]

fname = "./docs/fetched_song_data.csv"
figfoler = "./docs/figs/latest"

song_df = get_song_table()

key_data_max = song_df["M"].max()
key_data_min = song_df["M"].min()
# print("M diff max and min", key_data_max, key_data_min)
print(song_df)
# sys.exit(0)
# song difficulty key list
key_data = list(map(str, range(key_data_min, key_data_max + 1)))

song_set_df = pd.concat([song_df["M"].value_counts().sort_index(), 
                         song_df["EX"].value_counts().sort_index(), 
                         song_df[song_df["A"] != "-"]["A"].astype("Int64").value_counts().sort_index()],
                        axis="columns").fillna(0)
# print(song_set_df)

song_set_df = song_set_df[(key_data_min <= song_set_df.index) & (song_set_df.index <= key_data_max)]
song_set_df.columns = ["M", "EX", "A"]
print(song_set_df)

p = [0, 0, 0]
bar_color = ["#BB33EE", "#EE4466", "black"]

fig, axes = plt.subplots(2, 1, figsize=(10, 5), sharex=True)

p[0] = axes[0].bar(key_data, song_set_df["M"], width=0.5,
                    color=bar_color[0], label="MASTER")
ytick_max = int(song_set_df.sum(axis="columns").max())

p[1] = axes[1].bar(key_data, song_set_df["M"], bottom=0, width=0.5, color=bar_color[0], label="MASTER")

# for key_point in key_data:
#     if key_point in ex_list:
p[1] = axes[1].bar(key_data, song_set_df["EX"], 
                   bottom=song_set_df["M"],
                   width=0.5, color=bar_color[1], label="EXPERT")
p[1] = axes[1].bar(key_data, song_set_df["A"], 
                   bottom=song_set_df["M"] + song_set_df["EX"],
                   width=0.5, color=bar_color[2], label="APPEND")


for i in range(2):
    axes[i].set_yticks(range(0, ytick_max, 10))
    axes[i].set_ylim(0, ytick_max+10)
    axes[i].grid(True, axis='y', linestyle='-')
    axes[i].set_ylabel("number of songs")
    axes[i].bar_label(p[i])
    for label_idx, text_label in enumerate(axes[i].get_legend_handles_labels()[1]):
        axes[i].text(len(key_data)-0.5, axes[i].get_ylim()[1] - 10 - 20 * label_idx,
                        text_label,
                        color="white",
                        backgroundcolor=bar_color[label_idx],
                        ha="right", va="top", fontname="IPAexGothic")


date_text = song_df.index[0].strftime("%Y_%m_%d")
song_text = song_df["name"].iloc[0]

plt.gcf().text(0.1, 0.89,
                f"{date_text}\n{len(song_df.index)} songs",
                backgroundcolor="#FFFF66")

plt.gcf().text(0.87, 0.89,
                f"latest song\n{song_text}",
                fontname="IPAexGothic",
                backgroundcolor="#FFFF66",
                ha="right")

figpath = figfoler + "/" + date_text.replace("/", "_") + ".png"
if os.path.exists(figpath):
    os.remove(figpath)

plt.tight_layout()
# plt.show()
# sys.exit()

plt.savefig(figpath)
plt.close()

# 次の日付へ　必ずループ内最後に行うこと
# data_offset_idx += 1
# if data_offset_idx >= len(data):
#     break


# fig.tight_layout()
# plt.show()
