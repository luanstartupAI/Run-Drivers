from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import random

gamification_bp = Blueprint('gamification', __name__)

# Mock data for gamification
LEADERBOARD_DATA = [
    {"id": 1, "driver_id": "driver_001", "name": "João Silva", "points": 1250, "rank": 1, "trips": 45, "rating": 4.8},
    {"id": 2, "driver_id": "driver_002", "name": "Maria Santos", "points": 1180, "rank": 2, "trips": 42, "rating": 4.9},
    {"id": 3, "driver_id": "driver_003", "name": "Pedro Costa", "points": 1100, "rank": 3, "trips": 38, "rating": 4.7},
    {"id": 4, "driver_id": "driver_004", "name": "Ana Oliveira", "points": 1050, "rank": 4, "trips": 35, "rating": 4.6},
    {"id": 5, "driver_id": "driver_005", "name": "Carlos Lima", "points": 980, "rank": 5, "trips": 32, "rating": 4.5},
]

ACHIEVEMENTS_DATA = [
    {"id": 1, "name": "Primeira Viagem", "description": "Complete sua primeira viagem", "icon": "🚗", "unlocked": True, "points": 50},
    {"id": 2, "name": "Motorista Experiente", "description": "Complete 50 viagens", "icon": "🏆", "unlocked": True, "points": 200},
    {"id": 3, "name": "Avaliação Perfeita", "description": "Receba 5 estrelas em 10 viagens", "icon": "⭐", "unlocked": False, "points": 150},
    {"id": 4, "name": "Piloto Noturno", "description": "Complete 20 viagens à noite", "icon": "🌙", "unlocked": False, "points": 100},
    {"id": 5, "name": "Campeão da Semana", "description": "Seja o melhor da semana", "icon": "👑", "unlocked": False, "points": 300},
]

REWARDS_DATA = [
    {"id": 1, "name": "Desconto 10% Combustível", "description": "Desconto em postos parceiros", "points_required": 500, "available": True},
    {"id": 2, "name": "Dia de Folga", "description": "Um dia livre com pagamento", "points_required": 1000, "available": True},
    {"id": 3, "name": "Bonus R$ 50", "description": "Bonus direto na carteira", "points_required": 800, "available": True},
    {"id": 4, "name": "Treinamento Premium", "description": "Curso de direção defensiva", "points_required": 1500, "available": False},
]

@gamification_bp.route('/api/gamification/leaderboard', methods=['GET'])
@jwt_required()
def get_leaderboard():
    """Get driver leaderboard"""
    try:
        # Get current user
        current_user = get_jwt_identity()
        
        # Return leaderboard data
        return jsonify({
            "success": True,
            "data": LEADERBOARD_DATA,
            "message": "Leaderboard retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving leaderboard"
        }), 500

@gamification_bp.route('/api/gamification/achievements', methods=['GET'])
@jwt_required()
def get_achievements():
    """Get driver achievements"""
    try:
        current_user = get_jwt_identity()
        
        # Filter achievements for current user
        user_achievements = ACHIEVEMENTS_DATA.copy()
        
        return jsonify({
            "success": True,
            "data": user_achievements,
            "message": "Achievements retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving achievements"
        }), 500

@gamification_bp.route('/api/gamification/points', methods=['POST'])
@jwt_required()
def add_points():
    """Add points to driver"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        points = data.get('points', 0)
        reason = data.get('reason', 'Trip completed')
        
        # Mock points addition
        new_points = random.randint(10, 50)
        
        return jsonify({
            "success": True,
            "data": {
                "points_added": new_points,
                "total_points": 1250 + new_points,
                "reason": reason
            },
            "message": f"Added {new_points} points"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error adding points"
        }), 500

@gamification_bp.route('/api/gamification/rewards', methods=['GET'])
@jwt_required()
def get_rewards():
    """Get available rewards"""
    try:
        current_user = get_jwt_identity()
        
        return jsonify({
            "success": True,
            "data": REWARDS_DATA,
            "message": "Rewards retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving rewards"
        }), 500

@gamification_bp.route('/api/gamification/progress', methods=['GET'])
@jwt_required()
def get_progress():
    """Get driver progress"""
    try:
        current_user = get_jwt_identity()
        
        progress_data = {
            "total_points": 1250,
            "level": 8,
            "level_progress": 75,
            "points_to_next_level": 250,
            "total_trips": 45,
            "total_distance": 1250.5,
            "total_earnings": 3250.75,
            "current_streak": 7,
            "best_streak": 15,
            "weekly_goal": 1000,
            "weekly_progress": 850
        }
        
        return jsonify({
            "success": True,
            "data": progress_data,
            "message": "Progress retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving progress"
        }), 500

@gamification_bp.route('/api/gamification/claim-reward/<int:reward_id>', methods=['POST'])
@jwt_required()
def claim_reward(reward_id):
    """Claim a reward"""
    try:
        current_user = get_jwt_identity()
        
        # Find reward
        reward = next((r for r in REWARDS_DATA if r['id'] == reward_id), None)
        
        if not reward:
            return jsonify({
                "success": False,
                "message": "Reward not found"
            }), 404
        
        if not reward['available']:
            return jsonify({
                "success": False,
                "message": "Reward not available"
            }), 400
        
        # Mock claim
        return jsonify({
            "success": True,
            "data": {
                "reward_id": reward_id,
                "claimed_at": datetime.now().isoformat(),
                "message": f"Reward '{reward['name']}' claimed successfully"
            },
            "message": "Reward claimed successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error claiming reward"
        }), 500