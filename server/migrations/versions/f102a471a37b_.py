"""Added Conversation model and relation table

Revision ID: f102a471a37b
Revises: eae9dd5b7858
Create Date: 2024-03-25 22:54:50.478978

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import func

# revision identifiers, used by Alembic.
revision = 'f102a471a37b'
down_revision = 'eae9dd5b7858'
branch_labels = None
depends_on = None

def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('conversation',
        sa.Column('conversation_id', sa.Integer(), nullable=False),
        sa.Column('last_used_at', sa.DateTime(), server_default=func.now(), nullable=False),
        sa.PrimaryKeyConstraint('conversation_id'),
        sa.Column('last_message_text', sa.String(length = 500), nullable = False)
    )
    op.create_table('conversation_users',
        sa.Column('conversation_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('joined_at', sa.DateTime(), server_default=func.now(), nullable=False),
        sa.ForeignKeyConstraint(['conversation_id'], ['conversation.conversation_id']),
        sa.ForeignKeyConstraint(['user_id'], ['user.user_id']),
        sa.PrimaryKeyConstraint('conversation_id', 'user_id')
    )
    op.add_column('message',
        sa.Column('conversation_id', sa.Integer(), sa.ForeignKey('conversation.conversation_id', ondelete='CASCADE'), nullable=False)
    )
    # ### end Alembic commands ###

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.drop_constraint('message_ibfk_3', type_='foreignkey')
        batch_op.drop_column('conversation_id')

    op.drop_table('conversation_users')
    op.drop_table('conversation')
    # ### end Alembic commands ###

