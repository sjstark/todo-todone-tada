from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Optional, Length, NumberRange

class ListCreateFrom(FlaskForm):
    title = StringField(
        'title',
        validators=[
            DataRequired(),
            Length(
                min=4,
                max=80,
                message="Title must be between 4 and 80 characters in length"
            )
        ]
    )


class TaskCreateFrom(FlaskForm):
    title = StringField(
        'title',
        validators=[
            DataRequired(),
            Length(
                min=4,
                max=80,
                message="Title must be between 4 and 80 characters in length"
            )
        ]
    )

    description = StringField(
        'description',
        validators=[
            DataRequired(),
            Length(
                min=4,
                max=250,
                message="Description must be between 4 and 250 characters in length"
            )
        ]
    )

    isComplete = BooleanField(
        'isComplete'
    )


class CommentCreateFrom(FlaskForm):
    text = StringField(
        'text',
        validators=[
            DataRequired(),
            Length(
                min=4,
                max=250,
                message="Title must be between 4 and 250 characters in length"
            )
        ]
    )
