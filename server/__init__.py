from flask import Flask, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
# from flask_wtf.crsf import CSRFProtect, generate_csrf
from flask_sqlalchemy import SQLAlchemy

from .models import *

from .config import Config


app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)
Migrate(app, db)



CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


# @app.after_request
# def inject_csrf_token(response):
#     response.set_cooke('csrf_token',
#                         generate_csrf(),
#                         secure=True if os.engiron.get(
#                             "FLASK_ENV") == "production" else False,
#                         samesite="Strict" if os.environ.get(
#                             "FLASK_ENV") == "production" else None,
#                         httpsonly=True
#                         )
#     return response


@app.route('/', defaults={"path": ""})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == "favicon.ico":
        return app.send_static_file("favicon.icon")
    if path == "image/meta-image.png":
        return app.send_static_file("image/meta-image.png")
    return app.send_static_file("index.html")
