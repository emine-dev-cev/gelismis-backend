from ..models.user import User
from .. import db
from flask_jwt_extended import create_access_token

class UserService:
    @staticmethod
    def register_user(data):
        if User.query.filter_by(username=data['username']).first():
            return {'message': 'Username already exists'}, 400
            
        if User.query.filter_by(email=data['email']).first():
            return {'message': 'Email already exists'}, 400
            
        user = User(username=data['username'], email=data['email'])
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        return user, 201

    @staticmethod
    def login_user(data):
        user = User.query.filter_by(username=data['username']).first()
        
        if user and user.check_password(data['password']):
            access_token = create_access_token(identity=str(user.id))
            return {
                'access_token': access_token,
                'user': user
            }, 200
            
        return {'message': 'Invalid username or password'}, 401

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.get(user_id)

    @staticmethod
    def get_all_users():
        return User.query.all()

    @staticmethod
    def follow_user(follower_id, followed_id):
        follower = User.query.get(follower_id)
        followed = User.query.get(followed_id)
        if not followed:
            return {'message': 'User to follow not found'}, 404
        if follower.id == followed.id:
            return {'message': 'You cannot follow yourself'}, 400
        
        if followed not in follower.followed:
            follower.followed.append(followed)
            db.session.commit()
            return {'message': f'You are now following {followed.username}'}, 200
        return {'message': 'Already following'}, 200

    @staticmethod
    def unfollow_user(follower_id, followed_id):
        follower = User.query.get(follower_id)
        followed = User.query.get(followed_id)
        if followed in follower.followed:
            follower.followed.remove(followed)
            db.session.commit()
            return {'message': f'Unfollowed {followed.username}'}, 200
        return {'message': 'Not following this user'}, 400
