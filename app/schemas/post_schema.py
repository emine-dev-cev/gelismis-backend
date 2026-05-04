from marshmallow import Schema, fields, validate

class PostSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=3, max=100))
    content = fields.Str(required=True, validate=validate.Length(min=10))
    created_at = fields.DateTime(dump_only=True)
    user_id = fields.Int(dump_only=True)
    author_username = fields.Method("get_author_username", dump_only=True)
    likes_count = fields.Method("get_likes_count", dump_only=True)
    comments_count = fields.Method("get_comments_count", dump_only=True)

    def get_author_username(self, obj):
        return obj.author.username if obj.author else None

    def get_likes_count(self, obj):
        return obj.liked_by.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

post_schema = PostSchema()
posts_schema = PostSchema(many=True)
