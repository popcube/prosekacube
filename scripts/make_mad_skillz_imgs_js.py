import os

import_line = 'import img_num from "./../docs/figs/png"\n'
import_latest_line = 'import img_latest from "./../docs/figs/latest/png"\n'

## png name will be yyyy_mm_dd.png
## parse it to match the title format

latest_png = ""
png_list = []

for f in os.listdir("./src/docs/figs"):
    if os.path.isfile(f"./src/docs/figs/{f}"):
        png_list.append(f)

f_list = os.listdir("./src/docs/figs/latest")

if len(f_list) == 1 and os.path.isfile(f"./src/docs/figs/latest/{f_list[0]}"):
    latest_png = f_list[0]
else:
    print("Only one png file is allowed in the latest directory")

with open("./src/dynamic/mad_skillz_imgs.js", "w") as target_file:
    target_file.write(import_latest_line
        .replace("png", latest_png))
    for i, png in enumerate(png_list):
        target_file.write(import_line
            .replace("img_num", f"img_{i}")
            .replace("png", png))

 