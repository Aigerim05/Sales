"""create chats and messages tables

Revision ID: 012234eb1c33
Revises: e89c55795677
Create Date: 2025-06-18 17:09:06.984352
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import ENUM

# revision identifiers, used by Alembic.
revision: str = '012234eb1c33'
down_revision: Union[str, None] = 'e89c55795677'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # chats table
    op.create_table(
        'chats',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('character', sa.String(), nullable=False),
        sa.Column('scenario', sa.String(), nullable=False),
        sa.Column('started_at', sa.DateTime(), nullable=True),
        sa.Column('finished_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    )
    op.create_index(op.f('ix_chats_id'), 'chats', ['id'], unique=False)

    # messages table — ENUM уже существует, поэтому используем ссылку
    sender_enum = ENUM('user', 'client', 'coach', name='senderenum', create_type=False)

    op.create_table(
        'messages',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('chat_id', sa.Integer(), nullable=False),
        sa.Column('sender', sender_enum, nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['chat_id'], ['chats.id']),
    )
    op.create_index(op.f('ix_messages_id'), 'messages', ['id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_messages_id'), table_name='messages')
    op.drop_table('messages')
    op.drop_index(op.f('ix_chats_id'), table_name='chats')
    op.drop_table('chats')
