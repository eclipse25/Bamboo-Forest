"""Add usage_count column to Tags table

Revision ID: 55ff5d630c76
Revises: 5c86e8e165b2
Create Date: 2024-05-21 14:15:26.635035

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '55ff5d630c76'
down_revision: Union[str, None] = '5c86e8e165b2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.add_column('tags', sa.Column(
        'usage_count', sa.Integer(), nullable=True))


def downgrade():
    op.drop_column('tags', 'usage_count')
