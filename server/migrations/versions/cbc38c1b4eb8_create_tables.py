"""Create Tables

Revision ID: cbc38c1b4eb8
Revises: 
Create Date: 2023-04-19 20:01:32.806593

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cbc38c1b4eb8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('players',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('team', sa.String(), nullable=True),
    sa.Column('points', sa.Integer(), nullable=True),
    sa.Column('rebounds', sa.Integer(), nullable=True),
    sa.Column('assists', sa.Integer(), nullable=True),
    sa.Column('threes', sa.Integer(), nullable=True),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('teams',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('team_name', sa.String(), nullable=True),
    sa.Column('points', sa.Integer(), nullable=True),
    sa.Column('team_assists', sa.Integer(), nullable=True),
    sa.Column('team_threes', sa.Integer(), nullable=True),
    sa.Column('team_fgs', sa.Integer(), nullable=True),
    sa.Column('team_rebounds', sa.Integer(), nullable=True),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('bet_name', sa.String(), nullable=True),
    sa.Column('bet_odds', sa.Integer(), nullable=True),
    sa.Column('bet_date', sa.String(), nullable=True),
    sa.Column('team_id', sa.Integer(), nullable=True),
    sa.Column('player_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], name=op.f('fk_bets_player_id_players')),
    sa.ForeignKeyConstraint(['team_id'], ['teams.id'], name=op.f('fk_bets_team_id_teams')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('favorite', sa.String(), nullable=False),
    sa.Column('bet_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['bet_id'], ['bets.id'], name=op.f('fk_favorites_bet_id_bets')),
    sa.PrimaryKeyConstraint('id', 'favorite')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorites')
    op.drop_table('bets')
    op.drop_table('users')
    op.drop_table('teams')
    op.drop_table('players')
    # ### end Alembic commands ###