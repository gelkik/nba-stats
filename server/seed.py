#!/usr/bin/env python3
from basketball_reference_web_scraper import client
from random import choice as rc, randint
# from faker import Faker
from app import app
from models import db, Player, Team, Bet, Favorite, User
import datetime as dt


teams = ["ATLANTA HAWKS","BOSTON CELTICS", "BROOKLYN NETS", "CHARLOTTE HORNETS","CHICAGO BULLS","CLEVELAND CAVALIERS","DALLAS MAVERICKS","DENVER NUGGETS",
        "DETROIT PISTONS","GOLDEN STATE WARRIORS","HOUSTON ROCKETS","INDIANA PACERS","LOS ANGELES CLIPPERS","LOS ANGELES LAKERS",
        "MEMPHIS GRIZZLIES","MIAMI HEAT","MILWAUKEE BUCKS","MINNESOTA TIMBERWOLVES","NEW ORLEANS PELICANS","NEW YORK KNICKS",
        "OKLAHOMA CITY THUNDER","ORLANDO MAGIC","PHILADELPHIA 76ERS","PHOENIX SUNS","PORTLAND TRAIL BLAZERS","SACRAMENTO KINGS",
        "SAN ANTONIO SPURS","TORONTO RAPTORS","UTAH JAZZ","WASHINGTON WIZARDS"]

# def team_creations():    
#     team_names = []
#     for i in range(len(teams)):
#         teams_names = Team(team_name=teams[i])
#         team_names.append(teams_names)

#     db.session.add_all(team_names)
#     db.session.commit()

# tod = dt.datetime.today()
# d = dt.timedelta(days = 5)
# a = tod - d
# month = dt.datetime.now().month
# day = dt.datetime.now().day - 1
# year = dt.datetime.now().year

# y = client.players_season_totals(2023)
# x = client.player_box_scores(day=10, month=4, year=2023)


def adding_teams():
    teams = []
    tod = dt.datetime.today()
    count = 14
    while count < 15:
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
            teams_add = Team(
                team_name= team_name,
                points= points,
                team_rebounds=team_rebounds,
                team_assists= team_assists,
                team_threes= team_threes,
                team_fgs= team_fgs,
                date = a,
            )
            teams.append(teams_add)
        count +=1
    db.session.add_all(teams)
    db.session.commit()

def adding_players():
    players = []
    count = 13
    tod = dt.datetime.today()
    while count < 15:
        d = dt.timedelta(days = count)
        a = tod - d
        x = client.player_box_scores(day=a.day, month=a.month, year=a.year)
        for i in range(len(x)):
            if x[i]['game_score'] > 10:
                name = x[i]['name']
                team = str(x[i]['team']).replace('Team.','').replace('_',' ')
                points = x[i]['made_free_throws'] + x[i]['made_three_point_field_goals']*3 + (x[i]['made_field_goals']-x[i]['made_three_point_field_goals'])*2
                rebounds = x[i]['offensive_rebounds'] + x[i]['defensive_rebounds']
                assists = x[i]['assists']
                threes = x[i]['made_three_point_field_goals']
                players_add = Player(
                    name= name,
                    team= team,
                    points= points,
                    rebounds= rebounds,
                    assists= assists,
                    threes= threes,
                    date = a,
                )
                players.append(players_add)
        count +=1
    db.session.add_all(players)
    db.session.commit()



if __name__ == '__main__':
    with app.app_context():
        # Team.query.delete()
        # Player.query.delete()
        # Bet.query.delete()
        # Favorite.query.delete()
        # User.query.delete()
        # adding_players()
        adding_teams()

