from app.client.financial_modeling_prep import Client
from flask import Blueprint, request, jsonify
from datetime import datetime
import re


income_statment_bp = Blueprint('income_statment_bp', __name__)

@income_statment_bp.route('/income-statement', methods=['GET'])
def getIncomeStatement():
    returnKeys = ["date", "revenue", "netIncome", "grossProfit", "eps", "operatingIncome"]
    try:
        data = Client().getIncomeStatement()
        filteredData = []
        for item in data:
            match = True
            for key, value in request.args.items():
                rangeFilter = re.match(r'^filter_(.*)_range$', key) 
                if rangeFilter:
                    keyFilter = rangeFilter.group(1) 
                    itemValue = item[keyFilter] if keyFilter != "year" else datetime.strptime(item["date"], "%Y-%m-%d").year
                    a, b = map(int, value.split(","))
                    minRange, maxRange = min(a, b), max(a, b)
                        
                    if not (minRange <= itemValue <= maxRange):
                        match = False
                        break
            if match:
                filteredData.append(item)

        if "sort" in request.args.keys():
            sortKey = request.args["sort"]
            if "sort_order" in request.args.keys() and request.args["sort_order"] == "desc":
                filteredData = sorted(filteredData, key=lambda x: x[sortKey], reverse=True)
            else:
                filteredData = sorted(filteredData, key=lambda x: x[sortKey])
    except Exception:
        return "An unexpected error occurred. Please try again later", 500

    return jsonify([ {key: item[key] for key in returnKeys if key in item} for item in filteredData ]), 200

    
