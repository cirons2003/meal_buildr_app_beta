"""Created Notification Object

Revision ID: b938203626a5
Revises: 0aed79f307bf
Create Date: 2024-04-25 14:22:09.911850

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import func


# revision identifiers, used by Alembic.
revision = 'b938203626a5'
down_revision = '0aed79f307bf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('notification',
    sa.Column('notification_id', sa.Integer(), nullable=False),
    sa.Column('header', sa.String(length=100), nullable=True),
    sa.Column('body', sa.String(length=500), nullable=True),
    sa.Column('is_new', sa.Boolean(), nullable=False, server_default=sa.text('true')),
    sa.Column('timestamp', sa.DateTime(), nullable=False, server_default = func.now()),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('variant', sa.String(length=30), nullable=True),
    sa.Column('other_user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['other_user_id'], ['user.user_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('notification_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('notification')
    # ### end Alembic commands ###
