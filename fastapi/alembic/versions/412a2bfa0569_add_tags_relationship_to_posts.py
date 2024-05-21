"""Add tags_relationship to posts

Revision ID: 412a2bfa0569
Revises: 1f0632b133a5
Create Date: 2024-05-22 01:42:13.896922

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '412a2bfa0569'
down_revision: Union[str, None] = '1f0632b133a5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
