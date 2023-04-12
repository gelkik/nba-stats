from basketball_reference_web_scraper import client
import datetime as dt
import numpy as np
from models import Player
x = client.player_box_scores(day=2, month=4, year=2023)
# print(x)
# for i in range(len(x)):
#     print(x[i]['name'])
#     print(x[i]['slug'])
# for i in range(len(x)):
#     if x[i]['name'] == 'Pascal Siakam':
#         score = x[i]['made_free_throws'] + x[i]['made_three_point_field_goals']*3 + (x[i]['made_field_goals']-x[i]['made_three_point_field_goals'])*2
#         print(score)

# x = client.player_box_scores(day=2, month=4, year=2023)[1]['name']
# print(len(client.player_box_scores(day=2, month=4, year=2023)))
# print(x)
tod = dt.datetime.today()
d = dt.timedelta(days = 5)
a = tod - d
# print(a.day)

month = dt.datetime.now().month
day = dt.datetime.now().day - 1
year = dt.datetime.now().year

# print(client.player_box_scores(day=day, month=month, year=2023)[1])
player = 'Pascal Siakam'
def past_player_five_games_avgpoints(player):
    avgpoints = []
    count = 1
    tod = dt.datetime.today()
    while len(avgpoints) < 5 and year == 2023:
        d = dt.timedelta(days = count)
        a = tod - d
        x = client.player_box_scores(day=a.day, month=a.month, year=a.year)
        for i in range(len(x)):
            if x[i]['name'] == player:
                score = x[i]['made_free_throws'] + x[i]['made_three_point_field_goals']*3 + (x[i]['made_field_goals']-x[i]['made_three_point_field_goals'])*2
                avgpoints.append(score)
        count +=1
    return sum(avgpoints)/len(avgpoints),avgpoints

y = client.players_season_totals(2023)
def adding_players():
    count = 0
    for i in range(len(y)):
        if y[i]['minutes_played'] > 1000:
            # print({y[i]['name']:y[i]['team']})
            x1 = str(x[i]['team']).replace('Team.','').replace('_',' ')
            # x2 = x1.replace('Team.','').replace('_',' ')
            print(x1)
    # print(count)
# print(adding_players())
# print(client.players_season_totals(2023)[1])
# player1 = Player.query.filter(Player.name == "Pascal Siakam").first()
# print(player1)
# print(past_player_five_games_avgpoints(player))


# y = player.split(' ')
# player_slug = y[1][0].lower()+y[1][1:5]+y[0][0].lower()+y[0][1]+'01'
# print(client.regular_season_player_box_scores(player_slug, 2023))