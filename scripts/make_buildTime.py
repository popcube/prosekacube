from datetime import datetime

now = datetime.now().strftime("%Y/%m/%d %H:%M:%S")
print("build time: " + now)
with open("./src/dynamic/buildTime.js", "w") as f:
    f.write('const buildTime = "' + now + '";\n')
    f.write('export default buildTime;\n')
