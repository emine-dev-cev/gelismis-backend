from flask import Blueprint, jsonify
from app.models.post import Post
from app.models.user import User
from app import db
from sqlalchemy import func

api_pro_bp = Blueprint('api_pro', __name__)

@api_pro_bp.route('/api/trending', methods=['GET'])
def get_trending():
    # Trending Algoritması: En çok beğenilen ilk 10 post
    posts = Post.query.order_by(Post.likes_count.desc()).limit(10).all()
    return jsonify([p.to_dict() for p in posts])

@api_pro_bp.route('/api/analytics/summary', methods=['GET'])
def get_analytics():
    # Teknik Özet Analizi
    total_posts = Post.query.count()
    total_likes = db.session.query(func.sum(Post.likes_count)).scalar() or 0
    
    # En aktif 5 kullanıcı
    top_users = db.session.query(User.username, func.count(Post.id).label('post_count'))\
        .join(Post).group_by(User.id).order_by(db.text('post_count DESC')).limit(5).all()
        
    return jsonify({
        'total_interactions': total_likes,
        'total_content': total_posts,
        'top_performers': [{'username': u[0], 'count': u[1]} for u in top_users]
    })

@api_pro_bp.route('/api/suggestions', methods=['GET'])
def get_suggestions():
    # Basit Öneri Sistemi: En çok postu olan 5 kullanıcı
    users = User.query.limit(5).all()
    return jsonify([{'username': u.username} for u in users])
