import pandas as pd
import requests

pjsekai_res = requests.get("https://pjsekai.com/?aad6ee23b0")

a = pd.read_html(pjsekai_res.content, encoding="utf-8",
                 attrs={"id": "sortable_table1"})[0]
a.to_csv("./docs/fetched_song_data.csv", index=False, header=False)
