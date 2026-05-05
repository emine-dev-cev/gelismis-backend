import os
from flask import Blueprint, jsonify, send_from_directory

main_bp = Blueprint('main', __name__)

@main_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'version': '1.0.0'}), 200

@main_bp.route('/nexnet/')
def nexnet_index():
    path = os.path.join(os.getcwd(), 'nexnet')
    return send_from_directory(path, 'index.html')

@main_bp.route('/nexnet/<path:path>')
def nexnet_proxy(path):
    base_path = os.path.join(os.getcwd(), 'nexnet')
    return send_from_directory(base_path, path)

@main_bp.route('/v2/')
@main_bp.route('/v2/<path:path>')
def v2_proxy(path=None):
    base_path = os.path.join(os.getcwd(), 'nexnet_v2')
    if not path or not os.path.exists(os.path.join(base_path, path)):
        return send_from_directory(base_path, 'index.html')
    return send_from_directory(base_path, path)

@main_bp.route('/v3/')
@main_bp.route('/v3/<path:path>')
def v3_proxy(path=None):
    base_path = os.path.join(os.getcwd(), 'nexnet_v3')
    if not path or not os.path.exists(os.path.join(base_path, path)):
        return send_from_directory(base_path, 'index.html')
    return send_from_directory(base_path, path)

@main_bp.route('/v4/')
@main_bp.route('/v4/<path:path>')
def v4_proxy(path=None):
    base_path = os.path.join(os.getcwd(), 'nexnet_v4')
    if not path or not os.path.exists(os.path.join(base_path, path)):
        return send_from_directory(base_path, 'index.html')
    return send_from_directory(base_path, path)
