import pandas as pd
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

a = pd.read_html("https://pjsekai.com/?aad6ee23b0", encoding="utf-8", attrs={"id": "sortable_table1"})[0]
a.to_csv("./docs/fetched_song_data.csv", index=False, header=False)