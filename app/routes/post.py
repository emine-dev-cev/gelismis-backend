from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.post_service import PostService
from ..schemas.post_schema import post_schema, posts_schema
from marshmallow import ValidationError

post_bp = Blueprint('post', __name__)

@post_bp.route('/', methods=['POST'])
@jwt_required()
def create_post():
    """
    Create a new post
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: Post
          required:
            - title
            - content
          properties:
            title:
              type: string
              description: The post title.
            content:
              type: string
              description: The post content.
    responses:
      201:
        description: Post created successfully
    """
    json_data = request.get_json()
    try:
        data = post_schema.load(json_data)
    except ValidationError as err:
        return jsonify(err.messages), 400
        
    user_id = get_jwt_identity()
    post = PostService.create_post(data, user_id)
    
    return jsonify(post_schema.dump(post)), 201

@post_bp.route('/', methods=['GET'])
def get_posts():
    """
    Get all posts (with optional search)
    ---
    parameters:
      - name: q
        in: query
        type: string
        description: Search query for title or content.
    responses:
      200:
        description: A list of posts
    """
    search_query = request.args.get('q')
    posts = PostService.get_all_posts(search_query)
    return jsonify(posts_schema.dump(posts)), 200

@post_bp.route('/<int:post_id>/comments', methods=['POST'])
@jwt_required()
def add_comment(post_id):
    """
    Add a comment to a post
    ---
    parameters:
      - name: post_id
        in: path
        type: integer
        required: true
      - name: body
        in: body
        required: true
        schema:
          properties:
            content:
              type: string
    responses:
      201:
        description: Comment added successfully
    """
    from ..schemas.comment_schema import comment_schema
    json_data = request.get_json()
    try:
        data = comment_schema.load(json_data)
    except ValidationError as err:
        return jsonify(err.messages), 400
        
    user_id = get_jwt_identity()
    comment = PostService.add_comment(data, user_id, post_id)
    
    return jsonify(comment_schema.dump(comment)), 201

@post_bp.route('/<int:post_id>/like', methods=['POST'])
@jwt_required()
def like_post(post_id):
    """Like a post"""
    user_id = get_jwt_identity()
    result, status = PostService.like_post(user_id, post_id)
    return jsonify(result), status

@post_bp.route('/<int:post_id>/unlike', methods=['POST'])
@jwt_required()
def unlike_post(post_id):
    """Unlike a post"""
    user_id = get_jwt_identity()
    result, status = PostService.unlike_post(user_id, post_id)
    return jsonify(result), status
