#!/usr/bin/env python3
from basketball_reference_web_scraper import client
from random import choice as rc, randint
# from faker import Faker
from app import app
from models import db, Player, Team, Bet, Favorite, User


teams = ["ATLANTA HAWKS","BOSTON CELTICS", "BROOKLYN NETS", "CHARLOTTE HORNETS","CHICAGO BULLS","CLEVELAND CAVALIERS","DALLAS MAVERICKS","DENVER NUGGETS",
        "DETROIT PISTONS","GOLDEN STATE WARRIORS","HOUSTON ROCKETS","INDIANA PACERS","LOS ANGELES CLIPPERS","LOS ANGELES LAKERS",
        "MEMPHIS GRIZZLIES","MIAMI HEAT","MILWAUKEE BUCKS","MINNESOTA TIMBERWOLVES","NEW ORLEANS PELICANS","NEW YORK KNICKS",
        "OKLAHOMA CITY THUNDER","ORLANDO MAGIC","PHILADELPHIA 76ERS","PHOENIX SUNS","PORTLAND TRAIL BLAZERS","SACRAMENTO KINGS",
        "SAN ANTONIO SPURS","TORONTO RAPTORS","UTAH JAZZ","WASHINGTON WIZARDS"]

def team_creations():    
    team_names = []
    for i in range(len(teams)):
        teams_names = Team(team_name=teams[i])
        team_names.append(teams_names)

    db.session.add_all(team_names)
    db.session.commit()

# def player_additions():
#     player_names = []
#     for i in range(len(x)):
#         # print(x[i]['name'])
#         print(x[i]['team'])
y = client.players_season_totals(2023)
# print(y)
def adding_players():
    players = []
    for i in range(len(y)):
        if y[i]['minutes_played'] > 1000:
            players_add = Player(
                name = y[i]['name'],
                team = str(y[i]['team']).replace('Team.','').replace('_',' ')                     
            )
            players.append(players_add)
            # print(x[i]['team'])

    db.session.add_all(players)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        Player.query.delete()
        Team.query.delete()
        Bet.query.delete()
        Favorite.query.delete()
        User.query.delete()
        team_creations()
        adding_players()

