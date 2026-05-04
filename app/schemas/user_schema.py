from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=3, max=64))
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True, validate=validate.Length(min=6))
    created_at = fields.DateTime(dump_only=True)
    followers_count = fields.Method("get_followers_count", dump_only=True)
    following_count = fields.Method("get_following_count", dump_only=True)

    def get_followers_count(self, obj):
        return obj.follower_users.count()

    def get_following_count(self, obj):
        return obj.followed.count()

class LoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)
login_schema = LoginSchema()
