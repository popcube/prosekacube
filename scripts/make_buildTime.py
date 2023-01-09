from datetime import datetime, timezone, timedelta

now = datetime.now(timezone(timedelta(hours=9))).strftime("%Y/%m/%d %H:%M:%S")
print("build time: " + now)
with open("./src/dynamic/buildTime.js", "w") as f:
    f.write('const buildTime = "' + now + '";\n')
    f.write('export default buildTime;\n')
