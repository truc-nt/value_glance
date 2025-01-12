import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    FINANCIAL_MODELING_PREP_BASE_URL = os.getenv('FINANCIAL_MODELING_PREP_BASE_URL')
    FINANCIAL_MODELING_PREP_API_KEY = os.getenv('FINANCIAL_MODELING_PREP_API_KEY')
