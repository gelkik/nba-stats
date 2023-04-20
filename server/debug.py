from basketball_reference_web_scraper import client
from basketball_reference_web_scraper.data import OutputType, Team
import datetime as dt
import numpy as np
from models import Player
# from pysbr import *
x = client.player_box_scores(day=2, month=4, year=2023)[0]
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
print(a.day)
# print(a.day)

month = dt.datetime.now().month
day = dt.datetime.now().day - 1
year = dt.datetime.now().year

# print(client.player_box_scores(day=day, month=month, year=2023)[1])

# PLAYER FIVE GAMES POINTS
y = client.players_season_totals(2023)
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
# print(past_player_five_games_avgpoints(player))

# print(client.team_box_scores(day=12,month=3,year=2023))

# for i in range(len(client.team_box_scores(day=13,month=3,year=2023))):
#     if 'BROOKLYN NETS' == client.team_box_scores(day=12,month=3,year=2023)[i]['team']:
#         print(client.team_box_scores(day=11,month=4,year=2023)) 

y = client.players_season_totals(2023)
# def adding_players():
#     count = 0
#     for i in range(len(y)):
#         if y[i]['minutes_played'] > 1000:
#             # print({y[i]['name']:y[i]['team']})
#             x1 = str(x[i]['team']).replace('Team.','').replace('_',' ')
#             # x2 = x1.replace('Team.','').replace('_',' ')
#             print(x1)
    # print(count)
# print(adding_players())
# print(client.players_season_totals(2023)[1])
# player1 = Player.query.filter(Player.name == "Pascal Siakam").first()
# print(player1)
# print(past_player_five_games_avgpoints(player))


# y = player.split(' ')
# player_slug = y[1][0].lower()+y[1][1:5]+y[0][0].lower()+y[0][1]+'01'
# print(client.regular_season_player_box_scores(player_slug, 2023))



# datetime = dt.strptime('2023-04-12', '%Y-%m-%d')
# nba = NBA()
# sb=Sportsbook()
# e = EventsByDate(nba.league_id, datetime)
# print(e.list()[0])


#                                                       WORKS!!!!
# def add_players():
#     players = []
#     tod = dt.datetime.today()
#     count = 10
#     d = dt.timedelta(days = count)
#     a = tod - d
#     x = client.player_box_scores(day=a.day, month=a.month, year=a.year)
#     for i in range(len(x)):
#         if x[i]['game_score'] > 10:
#             name = x[i]['name']
#             team = str(x[i]['team']).replace('Team.','').replace('_',' ')
#             points = x[i]['made_free_throws'] + x[i]['made_three_point_field_goals']*3 + (x[i]['made_field_goals']-x[i]['made_three_point_field_goals'])*2
#             rebounds = x[i]['offensive_rebounds'] + x[i]['defensive_rebounds']
#             assists = x[i]['assists']
#             threes = x[i]['made_three_point_field_goals']
#             players_add = {
#                 'name': name,
#                 'team': team,
#                 'points': points,
#                 'rebounds':rebounds,
#                 'assists': assists,
#                 'threes': threes
#             }
#             players.append(players_add)
#     return players
# print(add_players())

team_box_score = (client.team_box_scores(day=15,month=4,year=2023))

def add_team():
    teams = []
    tod = dt.datetime.today()
    count = 10
    d = dt.timedelta(days = count)
    a = tod - d
    x = client.team_box_scores(day=a.day, month=a.month, year=a.year)
    for i in range(len(x)):
        team_name = str(x[i]['team']).replace('Team.','').replace('_',' ')
        points = x[i]['points']
        team_rebounds = x[i]['offensive_rebounds'] + x[i]['defensive_rebounds']
        team_assists = x[i]['assists']
        team_threes = x[i]['made_three_point_field_goals']
        team_fgs = x[i]['made_field_goals']
        teams_add = {
            'team_name': team_name,
            'points': points,
            'team_rebounds':team_rebounds,
            'team_assists': team_assists,
            'team_threes': team_threes,
            'team_fgs': team_fgs
        }
        teams.append(teams_add)
    return teams
# print(add_team())
