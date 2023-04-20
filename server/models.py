from sqlalchemy.ext.hybrid import hybrid_property 
from sqlalchemy_serializer import SerializerMixin
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
    points = db.Column(db.Integer)
    rebounds = db.Column(db.Integer)
    assists = db.Column(db.Integer)
    threes = db.Column(db.Integer)
    date = db.Column(db.DateTime)

    @validates('name')
    def validate_name(self, key, name):
        names = db.session.query(Player.name).all()
        if not name:
            raise ValueError("Name field is required.")
        elif name in names:
            raise ValueError("Name must be unique.")
        return name

    bets = db.relationship('Bet',backref='player')
    teams = association_proxy('bets','team')

class Team(db.Model,SerializerMixin):
    __tablename__ = 'teams'

    serialize_rules = ('-bets.team','-players')

    id = db.Column(db.Integer, primary_key = True)
    team_name = db.Column(db.String)
    points = db.Column(db.Integer)
    team_assists = db.Column(db.Integer)
    team_threes = db.Column(db.Integer)
    team_fgs = db.Column(db.Integer)
    team_rebounds = db.Column(db.Integer)
    date = db.Column(db.DateTime)
    
    bets = db.relationship('Bet',backref='team')
    players = association_proxy('bets','player')

class Bet(db.Model,SerializerMixin):
    __tablename__ = 'bets'

    serialize_rules = ('-team.bets','-player.bets')

    id = db.Column(db.Integer, primary_key = True)
    bet_name = db.Column(db.String)
    bet_odds = db.Column(db.Integer)
    bet_date = db.Column(db.String)

    team_id = db.Column(db.Integer,db.ForeignKey('teams.id'))
    player_id = db.Column(db.Integer,db.ForeignKey('players.id'))

    # @validates('bet_date')
    # def validate_name(self, key, bet_date):
    #     bets = db.session.query(Bet.bet_date).all()
    #     if not bet_date:
    #         raise ValueError("Bet date field is required.")
    #     elif bet_date in bets:
    #         raise ValueError("Bet date must be unique.")
    #     return bet_date

    favorites = db.relationship('Favorite',backref='bet')

class Favorite(db.Model,SerializerMixin):
    __tablename__ = 'favorites'

    serialize_rules = ('-bet.favorites',)

    id = db.Column(db.Integer, primary_key = True)
    favorite = db.Column(db.String, primary_key = True)
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