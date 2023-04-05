from basketball_reference_web_scraper import client

print(client.player_box_scores(day=2, month=4, year=2023)['name'=='Luka Doncic'])