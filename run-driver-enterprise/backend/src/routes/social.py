from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import random

social_bp = Blueprint('social', __name__)

# Mock data for social
FEED_DATA = [
    {
        "id": 1,
        "driver_id": "driver_001",
        "driver_name": "João Silva",
        "driver_avatar": "https://via.placeholder.com/50",
        "content": "Acabei de completar minha 100ª viagem! 🚗✨",
        "image": "https://via.placeholder.com/400x200",
        "likes": 24,
        "comments": 8,
        "created_at": "2024-08-05T10:30:00Z",
        "type": "achievement"
    },
    {
        "id": 2,
        "driver_id": "driver_002",
        "driver_name": "Maria Santos",
        "driver_avatar": "https://via.placeholder.com/50",
        "content": "Dica do dia: Sempre mantenha o carro limpo e organizado! 🧹",
        "image": None,
        "likes": 15,
        "comments": 12,
        "created_at": "2024-08-05T09:15:00Z",
        "type": "tip"
    },
    {
        "id": 3,
        "driver_id": "driver_003",
        "driver_name": "Pedro Costa",
        "driver_avatar": "https://via.placeholder.com/50",
        "content": "Encontrei um passageiro super legal hoje! Conversa boa durante toda a viagem 😊",
        "image": "https://via.placeholder.com/400x200",
        "likes": 31,
        "comments": 5,
        "created_at": "2024-08-05T08:45:00Z",
        "type": "experience"
    }
]

EVENTS_DATA = [
    {
        "id": 1,
        "title": "Encontro de Motoristas",
        "description": "Encontro mensal para networking e troca de experiências",
        "date": "2024-08-15T19:00:00Z",
        "location": "Restaurante Central, São Paulo",
        "attendees": 45,
        "max_attendees": 50,
        "image": "https://via.placeholder.com/400x200",
        "type": "meetup"
    },
    {
        "id": 2,
        "title": "Workshop de Direção Defensiva",
        "description": "Aprenda técnicas avançadas de direção segura",
        "date": "2024-08-20T14:00:00Z",
        "location": "Centro de Treinamento, Rio de Janeiro",
        "attendees": 28,
        "max_attendees": 30,
        "image": "https://via.placeholder.com/400x200",
        "type": "workshop"
    },
    {
        "id": 3,
        "title": "Competição de Motoristas",
        "description": "Competição de eficiência e segurança na direção",
        "date": "2024-08-25T10:00:00Z",
        "location": "Autódromo de Interlagos, São Paulo",
        "attendees": 15,
        "max_attendees": 20,
        "image": "https://via.placeholder.com/400x200",
        "type": "competition"
    }
]

COMMUNITY_DATA = [
    {
        "id": 1,
        "name": "Motoristas SP",
        "description": "Comunidade de motoristas de São Paulo",
        "members": 1250,
        "image": "https://via.placeholder.com/200x200",
        "type": "regional"
    },
    {
        "id": 2,
        "name": "Dicas de Direção",
        "description": "Compartilhamento de dicas e experiências",
        "members": 890,
        "image": "https://via.placeholder.com/200x200",
        "type": "tips"
    },
    {
        "id": 3,
        "name": "Motoristas Noturnos",
        "description": "Especialistas em viagens noturnas",
        "members": 456,
        "image": "https://via.placeholder.com/200x200",
        "type": "specialized"
    }
]

MESSAGES_DATA = [
    {
        "id": 1,
        "sender_id": "driver_001",
        "sender_name": "João Silva",
        "receiver_id": "driver_002",
        "content": "Oi! Viu o novo evento de direção defensiva?",
        "timestamp": "2024-08-05T10:30:00Z",
        "read": True
    },
    {
        "id": 2,
        "sender_id": "driver_002",
        "sender_name": "Maria Santos",
        "receiver_id": "driver_001",
        "content": "Sim! Vou participar. Você também?",
        "timestamp": "2024-08-05T10:32:00Z",
        "read": True
    },
    {
        "id": 3,
        "sender_id": "driver_003",
        "sender_name": "Pedro Costa",
        "receiver_id": "driver_001",
        "content": "Dica: Use o Waze para rotas mais eficientes!",
        "timestamp": "2024-08-05T09:15:00Z",
        "read": False
    }
]

@social_bp.route('/api/social/feed', methods=['GET'])
@jwt_required()
def get_feed():
    """Get social feed"""
    try:
        current_user = get_jwt_identity()
        
        return jsonify({
            "success": True,
            "data": FEED_DATA,
            "message": "Feed retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving feed"
        }), 500

@social_bp.route('/api/social/feed', methods=['POST'])
@jwt_required()
def create_post():
    """Create a new post"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        content = data.get('content', '')
        image = data.get('image', None)
        post_type = data.get('type', 'general')
        
        new_post = {
            "id": len(FEED_DATA) + 1,
            "driver_id": current_user,
            "driver_name": "Current User",
            "driver_avatar": "https://via.placeholder.com/50",
            "content": content,
            "image": image,
            "likes": 0,
            "comments": 0,
            "created_at": datetime.now().isoformat(),
            "type": post_type
        }
        
        FEED_DATA.insert(0, new_post)
        
        return jsonify({
            "success": True,
            "data": new_post,
            "message": "Post created successfully"
        }), 201
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error creating post"
        }), 500

@social_bp.route('/api/social/events', methods=['GET'])
@jwt_required()
def get_events():
    """Get events"""
    try:
        current_user = get_jwt_identity()
        
        return jsonify({
            "success": True,
            "data": EVENTS_DATA,
            "message": "Events retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving events"
        }), 500

@social_bp.route('/api/social/events', methods=['POST'])
@jwt_required()
def create_event():
    """Create a new event"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        title = data.get('title', '')
        description = data.get('description', '')
        date = data.get('date', '')
        location = data.get('location', '')
        max_attendees = data.get('max_attendees', 50)
        event_type = data.get('type', 'meetup')
        
        new_event = {
            "id": len(EVENTS_DATA) + 1,
            "title": title,
            "description": description,
            "date": date,
            "location": location,
            "attendees": 0,
            "max_attendees": max_attendees,
            "image": "https://via.placeholder.com/400x200",
            "type": event_type
        }
        
        EVENTS_DATA.append(new_event)
        
        return jsonify({
            "success": True,
            "data": new_event,
            "message": "Event created successfully"
        }), 201
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error creating event"
        }), 500

@social_bp.route('/api/social/community', methods=['GET'])
@jwt_required()
def get_communities():
    """Get communities"""
    try:
        current_user = get_jwt_identity()
        
        return jsonify({
            "success": True,
            "data": COMMUNITY_DATA,
            "message": "Communities retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving communities"
        }), 500

@social_bp.route('/api/social/messages', methods=['GET'])
@jwt_required()
def get_messages():
    """Get messages for current user"""
    try:
        current_user = get_jwt_identity()
        
        # Filter messages for current user
        user_messages = [
            msg for msg in MESSAGES_DATA 
            if msg['sender_id'] == current_user or msg['receiver_id'] == current_user
        ]
        
        return jsonify({
            "success": True,
            "data": user_messages,
            "message": "Messages retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving messages"
        }), 500

@social_bp.route('/api/social/messages', methods=['POST'])
@jwt_required()
def send_message():
    """Send a new message"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        receiver_id = data.get('receiver_id', '')
        content = data.get('content', '')
        
        new_message = {
            "id": len(MESSAGES_DATA) + 1,
            "sender_id": current_user,
            "sender_name": "Current User",
            "receiver_id": receiver_id,
            "content": content,
            "timestamp": datetime.now().isoformat(),
            "read": False
        }
        
        MESSAGES_DATA.append(new_message)
        
        return jsonify({
            "success": True,
            "data": new_message,
            "message": "Message sent successfully"
        }), 201
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error sending message"
        }), 500

@social_bp.route('/api/social/feed/<int:post_id>/like', methods=['POST'])
@jwt_required()
def like_post(post_id):
    """Like a post"""
    try:
        current_user = get_jwt_identity()
        
        # Find post
        post = next((p for p in FEED_DATA if p['id'] == post_id), None)
        
        if not post:
            return jsonify({
                "success": False,
                "message": "Post not found"
            }), 404
        
        # Mock like
        post['likes'] += 1
        
        return jsonify({
            "success": True,
            "data": {
                "post_id": post_id,
                "likes": post['likes']
            },
            "message": "Post liked successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error liking post"
        }), 500