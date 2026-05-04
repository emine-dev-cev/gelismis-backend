from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.user_service import UserService
from ..schemas.user_schema import user_schema, users_schema

user_bp = Blueprint('user', __name__)

@user_bp.route('/me', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = UserService.get_user_by_id(user_id)
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
        
    return jsonify(user_schema.dump(user)), 200

@user_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_users():
    users = UserService.get_all_users()
    return jsonify(users_schema.dump(users)), 200

@user_bp.route('/<int:user_id>/follow', methods=['POST'])
@jwt_required()
def follow(user_id):
    """Follow a user"""
    follower_id = get_jwt_identity()
    result, status = UserService.follow_user(follower_id, user_id)
    return jsonify(result), status

@user_bp.route('/<int:user_id>/unfollow', methods=['POST'])
@jwt_required()
def unfollow(user_id):
    """Unfollow a user"""
    follower_id = get_jwt_identity()
    result, status = UserService.unfollow_user(follower_id, user_id)
    return jsonify(result), status
