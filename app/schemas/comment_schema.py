from marshmallow import Schema, fields, validate

class CommentSchema(Schema):
    id = fields.Int(dump_only=True)
    content = fields.Str(required=True, validate=validate.Length(min=1, max=500))
    created_at = fields.DateTime(dump_only=True)
    user_id = fields.Int(dump_only=True)
    post_id = fields.Int(dump_only=True)
    author_username = fields.Method("get_author_username", dump_only=True)

    def get_author_username(self, obj):
        return obj.author.username if obj.author else None

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)
