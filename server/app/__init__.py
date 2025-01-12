from flask import Flask
from config import Config
from .route.income_statement import income_statment_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
app.register_blueprint(income_statment_bp)