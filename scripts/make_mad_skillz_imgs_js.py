import os

import_line = 'import img_num from "./../docs/figs/png";\n'
import_latest_line = 'import img_latest from "./../docs/figs/latest/png";\n'
img_container = '      <ImgContainer src={img_num} title="title_line" alt="alt_line" />\n'
target_start_line_1 = "// python auto-generation part 1 start\n"
target_end_line_1 = "// python auto-generation part 1 end\n"
target_start_line_2 = "// python auto-generation part 2 start\n"
target_end_line_2 = "// python auto-generation part 2 end\n"

latest_png = ""
png_list = []
import_lines = []
img_containers = []
latest_list = []
target_data = ""

# read png list
for f in os.listdir("./src/docs/figs"):
    if os.path.isfile(f"./src/docs/figs/{f}"):
        if not f.startswith("song_length_"):
            png_list.append(f)
png_list.sort(reverse=True)
latest_list = os.listdir("./src/docs/figs/latest")

if len(latest_list) == 1 and os.path.isfile(f"./src/docs/figs/latest/{latest_list[0]}"):
    latest_png = latest_list[0]
else:
    print("Only one png file is allowed in the latest directory")

# make target lines
import_lines.append(import_latest_line.replace("png", latest_png))
img_containers.extend(
    ["const DynamicImgContainers = () => {\n",
     "  return (\n",
     "    <div>\n"]
)
for i in range(len(png_list)):
    import_lines.append(import_line
                        .replace("img_num", f"img_{i}")
                        .replace("png", png_list[i]))
    # png name will be yyyy_mm_dd.png
    # parse it to match the title format
    img_containers.append(img_container
                          .replace("img_num", f"img_{i}")
                          .replace("title_line", png_list[i][:10].replace("_", "/") + "時点のレベル")
                          .replace("alt_line", png_list[i][:10].replace("_", "/") + "時点のグラフ"))
img_containers.extend(
    ["    </div>\n",
     "  )\n",
     "}\n"]
)

# read original js data
with open("./src/dynamic/mad_skillz.js", "r", encoding="utf-8") as f:
    target_data = f.readlines()

# get target line number
start_num_1 = target_data.index(target_start_line_1)
end_num_1 = target_data.index(target_end_line_1)
start_num_2 = target_data.index(target_start_line_2)
end_num_2 = target_data.index(target_end_line_2)

print(
    f"mad_skillz.js replaced line indices: {start_num_1}:{end_num_1}, {start_num_2}:{end_num_2}")

# target line replace
# !!!! replace from last to start to keep index relevant
target_data[start_num_2 + 1: end_num_2] = img_containers
target_data[start_num_1 + 1: end_num_1] = import_lines

with open("./src/dynamic/mad_skillz.js", "w", encoding="utf-8") as f:
    f.writelines(target_data)
