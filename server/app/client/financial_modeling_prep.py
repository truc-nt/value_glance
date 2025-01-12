import requests
from config import Config

class Client:
    def __init__(self):
        self.base_url = Config.FINANCIAL_MODELING_PREP_BASE_URL
        self.api_key = Config.FINANCIAL_MODELING_PREP_API_KEY

    def getIncomeStatement(self):
        response = requests.get(f'{self.base_url}/v3/income-statement/AAPL?period=annual&apikey={self.api_key}')
        if response.status_code == 200:
            return response.json()
        else:
            return None
