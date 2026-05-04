from ..models.post import Post
from .. import db

class PostService:
    @staticmethod
    def create_post(data, user_id):
        post = Post(
            title=data['title'],
            content=data['content'],
            user_id=user_id
        )
        db.session.add(post)
        db.session.commit()
        return post

    @staticmethod
    def get_all_posts(search_query=None):
        query = Post.query
        if search_query:
            query = query.filter(
                (Post.title.ilike(f'%{search_query}%')) | 
                (Post.content.ilike(f'%{search_query}%'))
            )
        return query.order_by(Post.created_at.desc()).all()

    @staticmethod
    def get_user_posts(user_id):
        return Post.query.filter_by(user_id=user_id).order_by(Post.created_at.desc()).all()

    @staticmethod
    def add_comment(data, user_id, post_id):
        from ..models.comment import Comment
        comment = Comment(
            content=data['content'],
            user_id=user_id,
            post_id=post_id
        )
        db.session.add(comment)
        db.session.commit()
        return comment

    @staticmethod
    def like_post(user_id, post_id):
        from ..models.user import User
        post = Post.query.get(post_id)
        user = User.query.get(user_id)
        if not post:
            return {'message': 'Post not found'}, 404
        if user not in post.liked_by:
            post.liked_by.append(user)
            db.session.commit()
            return {'message': 'Post liked'}, 200
        return {'message': 'Already liked'}, 200

    @staticmethod
    def unlike_post(user_id, post_id):
        from ..models.user import User
        post = Post.query.get(post_id)
        user = User.query.get(user_id)
        if user in post.liked_by:
            post.liked_by.remove(user)
            db.session.commit()
            return {'message': 'Post unliked'}, 200
        return {'message': 'Not liked yet'}, 400
