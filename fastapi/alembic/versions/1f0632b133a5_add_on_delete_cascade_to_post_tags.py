"""Add ON DELETE CASCADE to post_tags

Revision ID: 1f0632b133a5
Revises: 45a0cad2ba58
Create Date: 2024-05-21 15:43:53.516132

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1f0632b133a5'
down_revision: Union[str, None] = '45a0cad2ba58'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Drop the existing post_tags table
    op.drop_table('post_tags')

    # Create the post_tags table with ON DELETE CASCADE
    op.create_table(
        'post_tags',
        sa.Column('post_id', sa.Integer, sa.ForeignKey(
            'posts.id', ondelete='CASCADE'), primary_key=True),
        sa.Column('tag_id', sa.Integer, sa.ForeignKey(
            'tags.id', ondelete='CASCADE'), primary_key=True),
    )


def downgrade():
    # Drop the post_tags table with ON DELETE CASCADE
    op.drop_table('post_tags')

    # Recreate the original post_tags table without ON DELETE CASCADE
    op.create_table(
        'post_tags',
        sa.Column('post_id', sa.Integer, sa.ForeignKey(
            'posts.id'), primary_key=True),
        sa.Column('tag_id', sa.Integer, sa.ForeignKey(
            'tags.id'), primary_key=True),
    )
