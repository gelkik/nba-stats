#!/usr/bin/env python3

# import sys
# sys.setrecursionlimit(1000)

# from dotenv import load_dotenv
# load_dotenv()

from flask import Flask, request, jsonify, make_response,session
from flask_migrate import Migrate
from models import db, Player, Team, Bet, Favorite, User
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource

# app = Flask(__name__)
# CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False
# migrate = Migrate(app, db)

from config import app, db, api

class ClearSession(Resource): 
    def delete(self): 
     
        session['page_views'] = None 
        session['user_id'] = None 
        return {}, 204 
class Signup(Resource): 
    def post(self): 
        username = request.get_json()['username'] 
        user = User.query.filter(User.username == username).first()
        password = request.get_json()['password'] 
        if username and password and not user: 
            new_user = User(username=username) 
            new_user.password_hash = password 
            db.session.add(new_user) 
            db.session.commit() 
            session['user_id'] = new_user.id 
            return new_user.to_dict(),201 
         
        return {'error': '422 Unprocessable Entity'}, 422 
class CheckSession(Resource): 
    def get(self): 
        print(session)
        if session.get('user_id'): 
            user = User.query.filter(User.id == session['user_id']).first() 
            return user.to_dict(),200 
        return {}, 204 
class Login(Resource): 
    def post(self): 
        username = request.get_json()['username'] 
        password = request.get_json()['password'] 
        user = User.query.filter(User.username == username).first() 
        if user.authenticate(password): 
            session['user_id'] = user.id 
            print(session)
            return user.to_dict(), 200 
        return {'error': '401 Unauthorized'}, 401 
class Logout(Resource): 
    def delete(self): 
        session['user_id'] = None 
        return {}, 204 
    
class Bets(Resource):
    def get(self):
        bets_all = [bets.to_dict() for bets in Bet.query.all()] 
        response = make_response( 
            bets_all, 
            200, 
        ) 
        return response
    def post(self):
        new_bet = Bet(
            bet_name=request.get_json()['bet_name'],
            # bet_odds=request.get_json()['bet_odds'],
            bet_date=request.get_json()['bet_date'],
        )

        if new_bet.bet_name != Bet.query.filter(Bet.name == new_bet.bet_name).first():
            db.session.add(new_bet)
            db.session.commit()

            response_dict = new_bet.to_dict()

            response = make_response(
                response_dict,
                201,
            )

        return response
    
class Favorite(Resource):
    def post(self):
        new_favorite = Favorite(
            bet_id=request.get_json()['bet_id'],
        )

        if new_favorite.bet_name != Favorite.query.filter(Favorite.bet_id == new_favorite.bet_id).first():
            db.session.add(new_favorite)
            db.session.commit()

            response_dict = new_favorite.to_dict()

            response = make_response(
                response_dict,
                201,
            )

        return response

class Teams(Resource):
    def get(self):
        teams_all = [teams.to_dict() for teams in Team.query.all()] 
        response = make_response( 
            jsonify(teams_all), 
            200, 
        ) 
        return response

class Players(Resource):
    def get(self):
        players_all = [players.to_dict() for players in Player.query.all()] 
        response = make_response( 
            jsonify(players_all), 
            200, 
        ) 
        return response
    
api.add_resource(Signup, '/signup', endpoint='signup') 
api.add_resource(Login, '/login', endpoint='login') 
api.add_resource(Logout, '/logout', endpoint='logout') 
api.add_resource(CheckSession, '/check_session', endpoint='check_session') 
api.add_resource(ClearSession, '/clear', endpoint='clear') 
api.add_resource(Bets, '/bets', endpoint='bets') 
api.add_resource(Favorite, '/favorite', endpoint='favorite') 
api.add_resource(Teams, '/teams', endpoint='teams') 
api.add_resource(Players, '/players', endpoint='players') 

if __name__ == '__main__': 
    app.run(port=5555, debug=True)