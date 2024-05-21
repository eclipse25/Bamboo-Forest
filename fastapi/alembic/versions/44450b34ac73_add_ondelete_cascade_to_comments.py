"""Add ondelete cascade to comments

Revision ID: 44450b34ac73
Revises: bae33caa7243
Create Date: 2024-05-22 02:22:00.355306

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '44450b34ac73'
down_revision: Union[str, None] = 'bae33caa7243'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Drop the existing comments table
    op.drop_table('comments')

    # Create a new comments table with ondelete cascade
    op.create_table(
        'comments',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('post_id', sa.Integer, sa.ForeignKey(
            'posts.id', ondelete='CASCADE')),
        sa.Column('content', sa.String),
        sa.Column('user_ip', sa.String),
        sa.Column('upvotes', sa.Integer, default=0),
        sa.Column('created_at', sa.DateTime, default=sa.func.now())
    )


def downgrade() -> None:
    # Drop the new comments table
    op.drop_table('comments')

    # Create the old comments table without ondelete cascade
    op.create_table(
        'comments',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('post_id', sa.Integer, sa.ForeignKey('posts.id')),
        sa.Column('content', sa.String),
        sa.Column('user_ip', sa.String),
        sa.Column('upvotes', sa.Integer, default=0),
        sa.Column('created_at', sa.DateTime, default=sa.func.now())
    )
