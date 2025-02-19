import requests
import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta

# Function to fetch Bitcoin price data
def fetch_btc_price():
    url = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json'
    response = requests.get(url)
    
    # Debugging: Print the response status code and content
    print(f"Response Status Code: {response.status_code}")
    print("Response Content:")
    print(response.content)
    
    data = response.json()
    
    # Debugging: Print the parsed data
    print("Parsed Data:")
    print(data)
    
    return float(data['bpi']['USD']['rate'].replace(',', ''))

# Function to fetch historical Bitcoin price data
def fetch_historical_data():
    # Fetch historical data for Bitcoin (BTC-USD)
    btc = yf.Ticker("BTC-USD")
    historical_data = btc.history(period="100d")  # Fetch last 100 days of data
    return historical_data['Close']

# Function to calculate moving averages
def calculate_moving_averages(data):
    moving_averages = {}
    windows = [5, 10, 20, 50, 100]
    for window in windows:
        if len(data) >= window:
            moving_averages[f'{window}_day'] = data.rolling(window=window).mean().iloc[-1]
        else:
            moving_averages[f'{window}_day'] = None
    return moving_averages

# Function to send alert (print to console for simplicity)
def send_alert(message):
    print(message)
    # You can implement email or other notification methods here

def main():
    current_price = fetch_btc_price()
    historical_data = fetch_historical_data()

    # Debugging: Print historical data
    print("Historical Data:")
    print(historical_data)

    moving_averages = calculate_moving_averages(historical_data)

    # Debugging: Print current price and moving averages
    print(f"Current Price: ${current_price}")
    print("Moving Averages:")
    for period, ma in moving_averages.items():
        print(f"{period}: ${ma}")

    alert_message = f"BTC Price Alert: Current Price = ${current_price}\n"
    alert_needed = False

    for period, ma in moving_averages.items():
        if ma is not None:
            print(f"Comparing current price ${current_price} with {period} moving average ${ma}")
            if current_price < ma:
                alert_message += f"Current price is below the {period} moving average (${ma})\n"
                alert_needed = True

    if alert_needed:
        send_alert(alert_message)
    else:
        print("No alert needed.")
        print(f"CURRENT PRICE: {current_price}")

if __name__ == "__main__":
    main()