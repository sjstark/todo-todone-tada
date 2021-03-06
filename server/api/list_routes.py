import json

from flask import Blueprint, jsonify, request
from server.models import *
from server.forms import *


list_routes = Blueprint('list', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@list_routes.route('', methods=["GET"])
def get_all_lists():
    """
    GETs all lists and returns as JSON
    """
    lists = List.query.order_by(List.id).all()
    data = [list.to_dict() for list in lists]
    return jsonify(data)


@list_routes.route('', methods=["POST"])
def create_list():
    form = ListCreateFrom()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        list = List(
            title = form.data['title']
        )

        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@list_routes.route('/<int:list_id>', methods=['GET'])
def get_list_by_id(list_id):
    if list_id:
        list = List.query.get(list_id)
        if list:
            return list.to_dict()
    return {'errors': ['The requested list does not exist']}, 404


@list_routes.route('/<int:list_id>', methods=["PUT"])
def update_list_by_id(list_id):
    if list_id:
        list = List.query.get(list_id)
        if list:
            form = ListCreateFrom()
            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit():
                list.title = form.data['title']
                db.session.commit()
            else:
                return {'errors': validation_errors_to_error_messages(form.errors)}, 400
            return list.to_dict()
    return {'errors': ['The requested list does not exist']}, 404


@list_routes.route('/<int:list_id>', methods=["DELETE"])
def delete_list(list_id):
    if list_id:
        list = List.query.get(list_id)
        db.session.delete(list)
        db.session.commit()
        return 'success'
    return {'errors': 'There was an error with your request'}, 400


@list_routes.route('/<int:list_id>/tasks', methods=["GET"])
def get_all_tasks(list_id):
    """
    GETs all tasks for a list and returns as JSON
    """
    if list_id:
        tasks = Task.query.filter_by(list_id=list_id).all()
        data = [task.to_dict() for task in tasks]
        return jsonify(data)
    return {'errors': 'There was an error with your request'}, 400


@list_routes.route('/<int:list_id>/tasks', methods=["POST"])
def create_new_task(list_id):
    if list_id:
        list = List.query.get(list_id)
        if list:
            form = TaskCreateFrom()
            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit():
                task = Task(
                    list = list,
                    title = form.title.data,
                    description = form.description.data,
                    is_complete = False
                )

                db.session.add(task)
                db.session.commit()
                return list.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return {'errors': 'There was an error with your request'}, 400


@list_routes.route('/<int:list_id>/tasks/<int:task_id>', methods=["DELETE"])
def delete_task(list_id, task_id):
    if task_id:
        task = Task.query.get(task_id)
        db.session.delete(task)
        db.session.commit()
        return 'success'
    return {'errors': 'There was an error with your request'}, 400


@list_routes.route('/<int:list_id>/tasks/<int:task_id>/toggle', methods=["POST"])
def toggle_task(list_id, task_id):
    if task_id:
        task = Task.query.get(task_id)
        task.is_complete = not task.is_complete
        db.session.commit()
        # It would be better to just return the task, but would require some rebuild on the frontend
        list = List.query.get(list_id)
        return list.to_dict()
    return {'errors': 'There was an error with your request'}, 400


@list_routes.route('/<int:list_id>/tasks/<int:task_id>/comments', methods=["GET"])
def get_all_comments(list_id, task_id):
    """
    GETs all comments for a task and returns as JSON
    """
    if task_id:
        comments = Comment.query.filter_by(task_id=task_id).all()
        data = [comment.to_dict() for comment in comments]
        return jsonify(data)
    return {'errors': 'There was an error with your request'}, 400

@list_routes.route('/<int:list_id>/tasks/<int:task_id>/comments', methods=["POST"])
def create_new_comment(list_id, task_id):
    if task_id:
        task = Task.query.get(task_id)
        print(task)
        if task:
            form = CommentCreateFrom()
            form['csrf_token'].data = request.cookies['csrf_token']
            print(form.text)

            if form.validate_on_submit():
                print('HIT HERE')
                comment = Comment(
                    task = task,
                    text = form.text.data
                )

                db.session.add(comment)
                db.session.commit()
                return comment.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    return {'errors': 'There was an error with your request'}, 400

@list_routes.route('/<int:list_id>/tasks/<int:task_id>/comments/<int:comment_id>', methods=["DELETE"])
def delete_comment(list_id, task_id, comment_id):
    if comment_id:
        comment = Comment.query.get(comment_id)
        db.session.delete(comment)
        db.session.commit()
        return 'success'
    return {'errors': 'There was an error with your request'}, 400
