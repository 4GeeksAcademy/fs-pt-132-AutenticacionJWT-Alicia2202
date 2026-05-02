"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/auth', methods=['POST'])
def auth():
    # verificacion de datos
    body = request.get_json()
    if not body["email"] or not body["password"]:
        return jsonify({"success": False, "data": "missing data"}), 403
    # verificacion de si existe el usuario
    user = db.session.execute(select(User).where(
        User.email == body["email"])).scalar_one_or_none()
   
    if body['type'] == 'register':
        if user:
            return jsonify({"success": False, "data": "email taken"}), 403

        # hasheamos contraseña
        hashed = generate_password_hash(body['password'])

        new_user = User(
            email=body["email"],
            password=hashed,
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"success": True, "data": "All Ok"}), 201

    if body['type'] == 'login':
        if not user:
            return jsonify({"success": False, "data": "email not found"}), 404
        
        
        #comparación de contraseñas

        if not check_password_hash(user.password, body["password"]):
            return jsonify({"success": False, "data": "email password is wrong"}), 401
        token = create_access_token(identity= str(user.id))
        return jsonify({"success": True, "data": user.serialize(),"token":token}), 201
    return jsonify({"success":False, "data": "missing data?"}),418

@api.route('/me', methods=["GET"])
@jwt_required()
def get_me():
    id = get_jwt_identity ()  #Esto es para extraer el token=id del usuario
    user = db.session.get(User,id)
    if not user:
        return jsonify({"success": False, "data": 'what sent?'}), 418
    return jsonify({"success": True, "data":user.serialize()})