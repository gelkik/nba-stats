from sqlalchemy.ext.hybrid import hybrid_property 
from sqlalchemy_serializer import SerializerMixin 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates 
from sqlalchemy import MetaData
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from sqlalchemy.ext.associationproxy import association_proxy

class Player(db.Model,SerializerMixin):
    __tablename__ = 'players'

    serialize_rules = ('-bets.player','-teams')

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    team = db.Column(db.String)

    bets = db.relationship('Bet',backref='player')
    teams = association_proxy('bets','team')

class Team(db.Model,SerializerMixin):
    __tablename__ = 'teams'

    serialize_rules = ('-bets.team','-players')

    id = db.Column(db.Integer, primary_key = True)
    team_name = db.Column(db.String)
    
    bets = db.relationship('Bet',backref='team')
    players = association_proxy('bets','player')

class Bet(db.Model,SerializerMixin):
    __tablename__ = 'bets'

    serialize_rules = ('-team.bets','-player.bets')

    id = db.Column(db.Integer, primary_key = True)
    bet_name = db.Column(db.String)
    bet_odds = db.Column(db.Integer)
    bet_date = db.Column(db.DateTime)

    team_id = db.Column(db.Integer,db.ForeignKey('teams.id'))
    player_id = db.Column(db.Integer,db.ForeignKey('players.id'))

    favorites = db.relationship('Favorite',backref='bet')

class Favorite(db.Model,SerializerMixin):
    __tablename__ = 'favorites'

    serialize_rules = ('-bet.favorites',)

    id = db.Column(db.Integer, primary_key = True)

    bet_id = db.Column(db.Integer,db.ForeignKey('bets.id'))
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'User {self.username}, ID: {self.id}'