from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import random

trips_bp = Blueprint('trips', __name__)

# Mock data for trips
TRIPS_HISTORY = [
    {
        "id": 1,
        "driver_id": "driver_001",
        "passenger_name": "Ana Silva",
        "origin": "Shopping Morumbi, São Paulo",
        "destination": "Avenida Paulista, 1000",
        "distance": 8.5,
        "duration": 25,
        "fare": 25.50,
        "status": "completed",
        "rating": 5,
        "start_time": "2024-08-05T14:30:00Z",
        "end_time": "2024-08-05T14:55:00Z",
        "payment_method": "credit_card"
    },
    {
        "id": 2,
        "driver_id": "driver_001",
        "passenger_name": "Carlos Santos",
        "origin": "Metrô Tatuapé, São Paulo",
        "destination": "Shopping Eldorado, São Paulo",
        "distance": 12.3,
        "duration": 35,
        "fare": 32.80,
        "status": "completed",
        "rating": 4,
        "start_time": "2024-08-05T10:15:00Z",
        "end_time": "2024-08-05T10:50:00Z",
        "payment_method": "pix"
    },
    {
        "id": 3,
        "driver_id": "driver_001",
        "passenger_name": "Maria Costa",
        "origin": "Aeroporto Congonhas, São Paulo",
        "destination": "Centro Empresarial, São Paulo",
        "distance": 15.7,
        "duration": 45,
        "fare": 45.20,
        "status": "completed",
        "rating": 5,
        "start_time": "2024-08-04T16:20:00Z",
        "end_time": "2024-08-04T17:05:00Z",
        "payment_method": "credit_card"
    }
]

ACTIVE_TRIPS = [
    {
        "id": 4,
        "driver_id": "driver_001",
        "passenger_name": "João Oliveira",
        "origin": "Shopping West Plaza, São Paulo",
        "destination": "Rua Augusta, 500",
        "distance": 6.2,
        "estimated_duration": 18,
        "estimated_fare": 20.50,
        "status": "in_progress",
        "start_time": "2024-08-05T15:30:00Z",
        "current_location": {
            "lat": -23.5505,
            "lng": -46.6333
        },
        "route": [
            {"lat": -23.5505, "lng": -46.6333},
            {"lat": -23.5510, "lng": -46.6340},
            {"lat": -23.5515, "lng": -46.6345}
        ]
    }
]

TRIP_STATISTICS = {
    "total_trips": 45,
    "total_distance": 1250.5,
    "total_earnings": 3250.75,
    "average_rating": 4.6,
    "total_time": 1250,
    "weekly_trips": 12,
    "weekly_earnings": 450.25,
    "monthly_trips": 45,
    "monthly_earnings": 3250.75,
    "best_day": "Friday",
    "peak_hours": ["08:00", "18:00"],
    "favorite_areas": [
        {"area": "Centro", "trips": 15},
        {"area": "Vila Madalena", "trips": 12},
        {"area": "Pinheiros", "trips": 8}
    ]
}

@trips_bp.route('/api/trips/history', methods=['GET'])
@jwt_required()
def get_trip_history():
    """Get trip history for driver"""
    try:
        current_user = get_jwt_identity()
        
        # Filter trips for current user
        user_trips = [trip for trip in TRIPS_HISTORY if trip['driver_id'] == current_user]
        
        return jsonify({
            "success": True,
            "data": user_trips,
            "message": "Trip history retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving trip history"
        }), 500

@trips_bp.route('/api/trips/active', methods=['GET'])
@jwt_required()
def get_active_trips():
    """Get active trips for driver"""
    try:
        current_user = get_jwt_identity()
        
        # Filter active trips for current user
        user_active_trips = [trip for trip in ACTIVE_TRIPS if trip['driver_id'] == current_user]
        
        return jsonify({
            "success": True,
            "data": user_active_trips,
            "message": "Active trips retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving active trips"
        }), 500

@trips_bp.route('/api/trips/<int:trip_id>', methods=['GET'])
@jwt_required()
def get_trip_details(trip_id):
    """Get specific trip details"""
    try:
        current_user = get_jwt_identity()
        
        # Find trip in history
        trip = next((t for t in TRIPS_HISTORY if t['id'] == trip_id), None)
        
        if not trip:
            # Check active trips
            trip = next((t for t in ACTIVE_TRIPS if t['id'] == trip_id), None)
        
        if not trip:
            return jsonify({
                "success": False,
                "message": "Trip not found"
            }), 404
        
        if trip['driver_id'] != current_user:
            return jsonify({
                "success": False,
                "message": "Unauthorized access"
            }), 403
        
        return jsonify({
            "success": True,
            "data": trip,
            "message": "Trip details retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving trip details"
        }), 500

@trips_bp.route('/api/trips/plan', methods=['POST'])
@jwt_required()
def plan_trip():
    """Plan a new trip route"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        origin = data.get('origin', '')
        destination = data.get('destination', '')
        departure_time = data.get('departure_time', '')
        
        # Mock route planning
        planned_route = {
            "id": len(TRIPS_HISTORY) + len(ACTIVE_TRIPS) + 1,
            "origin": origin,
            "destination": destination,
            "estimated_distance": random.uniform(5.0, 20.0),
            "estimated_duration": random.randint(15, 60),
            "estimated_fare": random.uniform(15.0, 50.0),
            "route_points": [
                {"lat": -23.5505, "lng": -46.6333},
                {"lat": -23.5510, "lng": -46.6340},
                {"lat": -23.5515, "lng": -46.6345}
            ],
            "traffic_conditions": "moderate",
            "alternative_routes": 2
        }
        
        return jsonify({
            "success": True,
            "data": planned_route,
            "message": "Trip planned successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error planning trip"
        }), 500

@trips_bp.route('/api/trips/statistics', methods=['GET'])
@jwt_required()
def get_trip_statistics():
    """Get trip statistics for driver"""
    try:
        current_user = get_jwt_identity()
        
        return jsonify({
            "success": True,
            "data": TRIP_STATISTICS,
            "message": "Trip statistics retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving trip statistics"
        }), 500

@trips_bp.route('/api/trips/<int:trip_id>/start', methods=['POST'])
@jwt_required()
def start_trip(trip_id):
    """Start a trip"""
    try:
        current_user = get_jwt_identity()
        
        # Find trip in active trips
        trip = next((t for t in ACTIVE_TRIPS if t['id'] == trip_id), None)
        
        if not trip:
            return jsonify({
                "success": False,
                "message": "Trip not found"
            }), 404
        
        if trip['driver_id'] != current_user:
            return jsonify({
                "success": False,
                "message": "Unauthorized access"
            }), 403
        
        # Update trip status
        trip['status'] = 'in_progress'
        trip['start_time'] = datetime.now().isoformat()
        
        return jsonify({
            "success": True,
            "data": trip,
            "message": "Trip started successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error starting trip"
        }), 500

@trips_bp.route('/api/trips/<int:trip_id>/complete', methods=['POST'])
@jwt_required()
def complete_trip(trip_id):
    """Complete a trip"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        # Find trip in active trips
        trip = next((t for t in ACTIVE_TRIPS if t['id'] == trip_id), None)
        
        if not trip:
            return jsonify({
                "success": False,
                "message": "Trip not found"
            }), 404
        
        if trip['driver_id'] != current_user:
            return jsonify({
                "success": False,
                "message": "Unauthorized access"
            }), 403
        
        # Get completion data
        actual_distance = data.get('distance', trip.get('estimated_distance', 0))
        actual_duration = data.get('duration', trip.get('estimated_duration', 0))
        actual_fare = data.get('fare', trip.get('estimated_fare', 0))
        rating = data.get('rating', 5)
        
        # Create completed trip
        completed_trip = {
            "id": trip_id,
            "driver_id": current_user,
            "passenger_name": trip.get('passenger_name', 'Passenger'),
            "origin": trip['origin'],
            "destination": trip['destination'],
            "distance": actual_distance,
            "duration": actual_duration,
            "fare": actual_fare,
            "status": "completed",
            "rating": rating,
            "start_time": trip['start_time'],
            "end_time": datetime.now().isoformat(),
            "payment_method": "credit_card"
        }
        
        # Move to history
        TRIPS_HISTORY.append(completed_trip)
        ACTIVE_TRIPS.remove(trip)
        
        return jsonify({
            "success": True,
            "data": completed_trip,
            "message": "Trip completed successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error completing trip"
        }), 500

@trips_bp.route('/api/trips/<int:trip_id>/update-location', methods=['POST'])
@jwt_required()
def update_trip_location(trip_id):
    """Update trip location"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        lat = data.get('lat', 0)
        lng = data.get('lng', 0)
        
        # Find trip in active trips
        trip = next((t for t in ACTIVE_TRIPS if t['id'] == trip_id), None)
        
        if not trip:
            return jsonify({
                "success": False,
                "message": "Trip not found"
            }), 404
        
        if trip['driver_id'] != current_user:
            return jsonify({
                "success": False,
                "message": "Unauthorized access"
            }), 403
        
        # Update location
        trip['current_location'] = {"lat": lat, "lng": lng}
        
        return jsonify({
            "success": True,
            "data": trip,
            "message": "Location updated successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error updating location"
        }), 500