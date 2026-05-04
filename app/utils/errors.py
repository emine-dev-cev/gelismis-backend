from flask import jsonify

def register_error_handlers(app):
    @app.errorhandler(400)
    def bad_request(e):
        return jsonify(error="Bad Request", message=str(e.description)), 400

    @app.errorhandler(401)
    def unauthorized(e):
        return jsonify(error="Unauthorized", message="Invalid credentials or missing token"), 401

    @app.errorhandler(404)
    def not_found(e):
        return jsonify(error="Not Found", message="The requested resource was not found"), 404

    @app.errorhandler(405)
    def method_not_allowed(e):
        return jsonify(error="Method Not Allowed", message="This HTTP method is not allowed for this endpoint"), 405

    @app.errorhandler(500)
    def internal_server_error(e):
        return jsonify(error="Internal Server Error", message="An unexpected error occurred on the server"), 500

    @app.errorhandler(Exception)
    def handle_exception(e):
        # Log the actual exception here if needed
        return jsonify(error="Unexpected Error", message=str(e)), 500
