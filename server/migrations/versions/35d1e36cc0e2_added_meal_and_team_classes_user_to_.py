"""Added Meal and Team classes. User to Meal is one-to-many with cascading, User to team involves many-to-many relationships to describe admins and athletes. Team to user has a many-to-one relationship.

Revision ID: 35d1e36cc0e2
Revises: 79e5ffdfa10f
Create Date: 2024-03-17 13:33:56.064706

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35d1e36cc0e2'
down_revision = '79e5ffdfa10f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('meal',
    sa.Column('meal_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('logged_at', sa.DateTime(), nullable=False),
    sa.Column('description', sa.DateTime(), nullable=False),
    sa.Column('image_url', sa.String(length=128), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('meal_id')
    )
    op.create_table('team',
    sa.Column('team_id', sa.Integer(), nullable=False),
    sa.Column('team_name', sa.String(length=20), nullable=False),
    sa.Column('capacity', sa.Integer(), nullable=False),
    sa.Column('num_athletes', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('team_id'),
    sa.UniqueConstraint('team_name')
    )
    op.create_table('team_admins',
    sa.Column('team_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['team_id'], ['team.team_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('team_id', 'user_id')
    )
    op.create_table('team_athletes',
    sa.Column('team_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['team_id'], ['team.team_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('team_id', 'user_id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_picture_url', sa.String(length=128), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('profile_picture_url')

    op.drop_table('team_athletes')
    op.drop_table('team_admins')
    op.drop_table('team')
    op.drop_table('meal')
    # ### end Alembic commands ###