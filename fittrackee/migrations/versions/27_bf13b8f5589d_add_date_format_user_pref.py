"""Add date_format for date display to user preferences in DB

Revision ID: bf13b8f5589d
Revises: 84d840ce853b
Create Date: 2022-10-25 18:53:59.378423

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bf13b8f5589d'
down_revision = '5b936821326d'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        'users', sa.Column('date_format', sa.String(length=50), nullable=True)
    )
    op.execute("UPDATE users SET date_format = 'MM/dd/yyyy'")
    op.alter_column('users', 'date_format', nullable=False)



def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'date_format')
    # ### end Alembic commands ###
