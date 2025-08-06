from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

# Import blueprints
from routes.auth import auth_bp
from routes.user import user_bp
from routes.drivers import drivers_bp
from routes.payments import payments_bp
from routes.documents import documents_bp
from routes.ai import ai_bp
from routes.gamification import gamification_bp
from routes.social import social_bp
from routes.trips import trips_bp
from routes.wallet import wallet_bp

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
    
    # Initialize extensions
    CORS(app)
    jwt = JWTManager(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(drivers_bp)
    app.register_blueprint(payments_bp)
    app.register_blueprint(documents_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(gamification_bp)
    app.register_blueprint(social_bp)
    app.register_blueprint(trips_bp)
    app.register_blueprint(wallet_bp)
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        return jsonify({
            "status": "healthy",
            "message": "Run Driver Enterprise API is running",
            "version": "1.0.2"
        })
    
    # Root endpoint
    @app.route('/')
    def root():
        return jsonify({
            "message": "Run Driver Enterprise API",
            "version": "1.0.2",
            "endpoints": {
                "auth": "/api/auth/*",
                "user": "/api/user/*",
                "drivers": "/api/drivers/*",
                "payments": "/api/payments/*",
                "documents": "/api/documents/*",
                "ai": "/api/ai/*",
                "gamification": "/api/gamification/*",
                "social": "/api/social/*",
                "trips": "/api/trips/*",
                "wallet": "/api/wallet/*"
            }
        })
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "success": False,
            "message": "Endpoint not found"
        }), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            "success": False,
            "message": "Internal server error"
        }), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)