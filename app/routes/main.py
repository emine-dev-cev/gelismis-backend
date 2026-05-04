from flask import Blueprint, jsonify

main_bp = Blueprint('main', __name__)

@main_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'version': '1.0.0'}), 200

@main_bp.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Advanced Flask Backend is running!'}), 200
