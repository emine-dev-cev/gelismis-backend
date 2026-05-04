from flask import Blueprint, request, jsonify
from ..services.user_service import UserService
from ..schemas.user_schema import user_schema, login_schema
from marshmallow import ValidationError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    json_data = request.get_json()
    if not json_data:
        return jsonify({'message': 'No input data provided'}), 400
    
    try:
        data = user_schema.load(json_data)
    except ValidationError as err:
        return jsonify(err.messages), 400
        
    result, status = UserService.register_user(data)
    
    if status == 201:
        return jsonify({
            'message': 'User registered successfully', 
            'user': user_schema.dump(result)
        }), 201
    
    return jsonify(result), status

@auth_bp.route('/login', methods=['POST'])
def login():
    json_data = request.get_json()
    if not json_data:
        return jsonify({'message': 'No input data provided'}), 400
        
    try:
        data = login_schema.load(json_data)
    except ValidationError as err:
        return jsonify(err.messages), 400
        
    result, status = UserService.login_user(data)
    
    if status == 200:
        return jsonify({
            'message': 'Login successful',
            'access_token': result['access_token'],
            'user': user_schema.dump(result['user'])
        }), 200
        
    return jsonify(result), status
