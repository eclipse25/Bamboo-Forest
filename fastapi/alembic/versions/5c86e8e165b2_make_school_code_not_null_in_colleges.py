"""Make school_code NOT NULL in colleges

Revision ID: 5c86e8e165b2
Revises: 
Create Date: 2024-05-15 21:41:12.104645

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5c86e8e165b2'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
