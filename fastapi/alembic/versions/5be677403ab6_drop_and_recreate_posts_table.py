"""Drop and recreate posts table

Revision ID: 5be677403ab6
Revises: 44450b34ac73
Create Date: 2024-05-23 02:46:15.443283

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5be677403ab6'
down_revision: Union[str, None] = '44450b34ac73'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Drop existing table
    op.drop_table('posts')

    # Create new table
    op.create_table(
        'posts',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('board_id', sa.String, sa.ForeignKey('boards.id')),
        sa.Column('start_time', sa.DateTime, default=sa.func.now()),
        sa.Column('end_time', sa.DateTime),
        sa.Column('content', sa.String),
        sa.Column('views', sa.Integer, default=0),
        sa.Column('user_ip', sa.String),
        sa.Column('upvotes', sa.Integer, default=0),
        sa.Column('created_at', sa.DateTime, default=sa.func.now()),
        sa.Column('delete_key', sa.String)
    )


def downgrade():
    # Drop the new table
    op.drop_table('posts')

    # Recreate old table if necessary (this depends on your previous state)
    op.create_table(
        'posts',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('board_id', sa.String, sa.ForeignKey('boards.id')),
        sa.Column('start_time', sa.DateTime, default=sa.func.now()),
        sa.Column('end_time', sa.DateTime),
        sa.Column('content', sa.String),
        sa.Column('views', sa.Integer, default=0),
        sa.Column('user_ip', sa.String),
        sa.Column('upvotes', sa.Integer, default=0),
        sa.Column('created_at', sa.DateTime, default=sa.func.now()),
        sa.Column('delete_key', sa.String)
    )
