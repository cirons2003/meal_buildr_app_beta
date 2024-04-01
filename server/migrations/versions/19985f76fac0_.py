"""Added cascading in conversation_users table to enable conversation deletions

Revision ID: 19985f76fac0
Revises: 3b8b56daa0e4
Create Date: 2024-03-30 20:33:28.109214

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '19985f76fac0'
down_revision = '3b8b56daa0e4'
branch_labels = None
depends_on = None


def upgrade():
     # Drop the existing foreign key constraints
    op.drop_constraint('conversation_users_ibfk_1', 'conversation_users', type_='foreignkey')
    op.drop_constraint('conversation_users_ibfk_2', 'conversation_users', type_='foreignkey')

    # Recreate the foreign key constraints with CASCADE on delete
    op.create_foreign_key(None, 'conversation_users', 'conversation', ['conversation_id'], ['conversation_id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'conversation_users', 'user', ['user_id'], ['user_id'], ondelete='CASCADE')

def downgrade():
    # Drop the modified foreign key constraints
    op.drop_constraint(None, 'conversation_users', type_='foreignkey')
    op.drop_constraint(None, 'conversation_users', type_='foreignkey')

    # Recreate the original foreign key constraints
    op.create_foreign_key('conversation_users_ibfk_1', 'conversation_users', 'conversation', ['conversation_id'], ['conversation_id'])
    op.create_foreign_key('conversation_users_ibfk_2', 'conversation_users', 'user', ['user_id'], ['user_id'])