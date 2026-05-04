import os
from app import create_app, db
from flask_migrate import Migrate
from app.models.user import User
from app.models.post import Post

app = create_app(os.getenv('FLASK_CONFIG') or 'dev')
migrate = Migrate(app, db)

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Ensure tables are created for quick demo
    app.run(host='0.0.0.0', port=5000)
