from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import random

wallet_bp = Blueprint('wallet', __name__)

# Mock data for wallet
WALLET_BALANCE = {
    "available_balance": 1250.75,
    "pending_balance": 150.25,
    "total_earnings": 3250.75,
    "currency": "BRL",
    "last_updated": "2024-08-05T15:30:00Z"
}

TRANSACTIONS_DATA = [
    {
        "id": 1,
        "driver_id": "driver_001",
        "type": "credit",
        "amount": 25.50,
        "description": "Trip completed - Ana Silva",
        "status": "completed",
        "created_at": "2024-08-05T14:55:00Z",
        "reference": "TRIP_001"
    },
    {
        "id": 2,
        "driver_id": "driver_001",
        "type": "credit",
        "amount": 32.80,
        "description": "Trip completed - Carlos Santos",
        "status": "completed",
        "created_at": "2024-08-05T10:50:00Z",
        "reference": "TRIP_002"
    },
    {
        "id": 3,
        "driver_id": "driver_001",
        "type": "debit",
        "amount": -100.00,
        "description": "Withdrawal to bank account",
        "status": "completed",
        "created_at": "2024-08-04T16:30:00Z",
        "reference": "WITHDRAWAL_001"
    },
    {
        "id": 4,
        "driver_id": "driver_001",
        "type": "credit",
        "amount": 45.20,
        "description": "Trip completed - Maria Costa",
        "status": "completed",
        "created_at": "2024-08-04T17:05:00Z",
        "reference": "TRIP_003"
    },
    {
        "id": 5,
        "driver_id": "driver_001",
        "type": "credit",
        "amount": 15.00,
        "description": "Bonus - Weekly goal achieved",
        "status": "completed",
        "created_at": "2024-08-03T12:00:00Z",
        "reference": "BONUS_001"
    }
]

PAYMENT_METHODS = [
    {
        "id": 1,
        "type": "bank_account",
        "name": "Banco do Brasil",
        "account_number": "****1234",
        "is_default": True,
        "is_verified": True
    },
    {
        "id": 2,
        "type": "pix",
        "name": "PIX Key",
        "key": "joao.silva@email.com",
        "is_default": False,
        "is_verified": True
    },
    {
        "id": 3,
        "type": "credit_card",
        "name": "Visa ****4321",
        "card_number": "****4321",
        "is_default": False,
        "is_verified": True
    }
]

WITHDRAWAL_REQUESTS = [
    {
        "id": 1,
        "driver_id": "driver_001",
        "amount": 100.00,
        "payment_method": "bank_account",
        "status": "completed",
        "created_at": "2024-08-04T16:30:00Z",
        "processed_at": "2024-08-04T17:00:00Z"
    },
    {
        "id": 2,
        "driver_id": "driver_001",
        "amount": 250.00,
        "payment_method": "pix",
        "status": "pending",
        "created_at": "2024-08-05T10:00:00Z",
        "processed_at": None
    }
]

@wallet_bp.route('/api/wallet/balance', methods=['GET'])
@jwt_required()
def get_wallet_balance():
    """Get wallet balance for driver"""
    try:
        current_user = get_jwt_identity()
        
        return jsonify({
            "success": True,
            "data": WALLET_BALANCE,
            "message": "Wallet balance retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving wallet balance"
        }), 500

@wallet_bp.route('/api/wallet/transactions', methods=['GET'])
@jwt_required()
def get_transactions():
    """Get transaction history for driver"""
    try:
        current_user = get_jwt_identity()
        
        # Filter transactions for current user
        user_transactions = [t for t in TRANSACTIONS_DATA if t['driver_id'] == current_user]
        
        return jsonify({
            "success": True,
            "data": user_transactions,
            "message": "Transactions retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving transactions"
        }), 500

@wallet_bp.route('/api/wallet/withdraw', methods=['POST'])
@jwt_required()
def request_withdrawal():
    """Request a withdrawal"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        amount = data.get('amount', 0)
        payment_method = data.get('payment_method', 'bank_account')
        
        if amount <= 0:
            return jsonify({
                "success": False,
                "message": "Invalid withdrawal amount"
            }), 400
        
        if amount > WALLET_BALANCE['available_balance']:
            return jsonify({
                "success": False,
                "message": "Insufficient balance"
            }), 400
        
        # Create withdrawal request
        withdrawal_request = {
            "id": len(WITHDRAWAL_REQUESTS) + 1,
            "driver_id": current_user,
            "amount": amount,
            "payment_method": payment_method,
            "status": "pending",
            "created_at": datetime.now().isoformat(),
            "processed_at": None
        }
        
        WITHDRAWAL_REQUESTS.append(withdrawal_request)
        
        # Update balance
        WALLET_BALANCE['available_balance'] -= amount
        WALLET_BALANCE['pending_balance'] += amount
        
        return jsonify({
            "success": True,
            "data": withdrawal_request,
            "message": "Withdrawal request created successfully"
        }), 201
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error creating withdrawal request"
        }), 500

@wallet_bp.route('/api/wallet/deposit', methods=['POST'])
@jwt_required()
def add_deposit():
    """Add deposit to wallet"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        amount = data.get('amount', 0)
        payment_method = data.get('payment_method', 'credit_card')
        description = data.get('description', 'Manual deposit')
        
        if amount <= 0:
            return jsonify({
                "success": False,
                "message": "Invalid deposit amount"
            }), 400
        
        # Create transaction
        transaction = {
            "id": len(TRANSACTIONS_DATA) + 1,
            "driver_id": current_user,
            "type": "credit",
            "amount": amount,
            "description": description,
            "status": "completed",
            "created_at": datetime.now().isoformat(),
            "reference": f"DEPOSIT_{len(TRANSACTIONS_DATA) + 1}"
        }
        
        TRANSACTIONS_DATA.append(transaction)
        
        # Update balance
        WALLET_BALANCE['available_balance'] += amount
        WALLET_BALANCE['total_earnings'] += amount
        
        return jsonify({
            "success": True,
            "data": transaction,
            "message": "Deposit added successfully"
        }), 201
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error adding deposit"
        }), 500

@wallet_bp.route('/api/wallet/payment-methods', methods=['GET'])
@jwt_required()
def get_payment_methods():
    """Get payment methods for driver"""
    try:
        current_user = get_jwt_identity()
        
        return jsonify({
            "success": True,
            "data": PAYMENT_METHODS,
            "message": "Payment methods retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving payment methods"
        }), 500

@wallet_bp.route('/api/wallet/payment-methods', methods=['POST'])
@jwt_required()
def add_payment_method():
    """Add new payment method"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        payment_type = data.get('type', '')
        name = data.get('name', '')
        account_number = data.get('account_number', '')
        
        new_payment_method = {
            "id": len(PAYMENT_METHODS) + 1,
            "type": payment_type,
            "name": name,
            "account_number": account_number,
            "is_default": False,
            "is_verified": False
        }
        
        PAYMENT_METHODS.append(new_payment_method)
        
        return jsonify({
            "success": True,
            "data": new_payment_method,
            "message": "Payment method added successfully"
        }), 201
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error adding payment method"
        }), 500

@wallet_bp.route('/api/wallet/withdrawals', methods=['GET'])
@jwt_required()
def get_withdrawal_requests():
    """Get withdrawal requests for driver"""
    try:
        current_user = get_jwt_identity()
        
        # Filter withdrawals for current user
        user_withdrawals = [w for w in WITHDRAWAL_REQUESTS if w['driver_id'] == current_user]
        
        return jsonify({
            "success": True,
            "data": user_withdrawals,
            "message": "Withdrawal requests retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving withdrawal requests"
        }), 500

@wallet_bp.route('/api/wallet/statistics', methods=['GET'])
@jwt_required()
def get_wallet_statistics():
    """Get wallet statistics"""
    try:
        current_user = get_jwt_identity()
        
        # Calculate statistics
        total_earnings = sum(t['amount'] for t in TRANSACTIONS_DATA if t['type'] == 'credit' and t['driver_id'] == current_user)
        total_withdrawals = abs(sum(t['amount'] for t in TRANSACTIONS_DATA if t['type'] == 'debit' and t['driver_id'] == current_user))
        monthly_earnings = total_earnings * 0.3  # Mock monthly calculation
        
        statistics = {
            "total_earnings": total_earnings,
            "total_withdrawals": total_withdrawals,
            "monthly_earnings": monthly_earnings,
            "average_transaction": total_earnings / len([t for t in TRANSACTIONS_DATA if t['driver_id'] == current_user]) if TRANSACTIONS_DATA else 0,
            "total_transactions": len([t for t in TRANSACTIONS_DATA if t['driver_id'] == current_user]),
            "pending_withdrawals": len([w for w in WITHDRAWAL_REQUESTS if w['driver_id'] == current_user and w['status'] == 'pending'])
        }
        
        return jsonify({
            "success": True,
            "data": statistics,
            "message": "Wallet statistics retrieved successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Error retrieving wallet statistics"
        }), 500