from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flasgger import Swagger
from .config import config_by_name

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
swagger = Swagger()

def create_app(config_name='dev'):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Initialize extensions
    db.init_app(app)
    
    # Create tables
    from .models.user import User
    from .models.post import Post
    from .models.comment import Comment
    with app.app_context():
        db.create_all()
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)
    swagger.init_app(app)

    # Error handlers
    from .utils.errors import register_error_handlers
    register_error_handlers(app)

    # Register Blueprints
    from .routes.auth import auth_bp
    from .routes.user import user_bp
    from .routes.main import main_bp
    from .routes.post import post_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(post_bp, url_prefix='/api/posts')
    app.register_blueprint(main_bp)

    return app
