from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return '<List %r>' % self.title

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "tasks": [task.to_dict() for task in self.tasks]
        }


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'),
        nullable=False)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    is_complete = db.Column(db.Boolean)

    list = db.relationship('List',
        backref=db.backref('tasks', lazy=True))

    def __repr__(self):
        return '<Task %r>' % self.title

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "isComplete": self.is_complete,
            "comments": [comment.to_dict() for comment in self.comments]
        }


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'),
        nullable=False)
    text = db.Column(db.String(250), nullable=False)

    task = db.relationship('Task',
        backref=db.backref('comments', lazy=True))

    def __repr__(self):
        return '<Comment #%r>' % self.id

    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text
        }
