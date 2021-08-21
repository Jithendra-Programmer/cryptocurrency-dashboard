from os import truncate
from flask import Flask, request, render_template
import requests as rq

app = Flask(__name__)

def remove_space(name):
    return name.replace(" ","")

@app.route('/')
def mian():
    return render_template("index.html")

@app.route('/coins/<coin>')
def render_dashboard(coin):

    coinName = remove_space(coin).lower()
    coinData = rq.get("https://api.coingecko.com/api/v3/coins/" + coinName).json()


    price = "{:,.2f}".format(coinData['market_data']['current_price']['usd'])
    market_cap = "{:,.2f}".format(coinData['market_data']['market_cap']['usd'])
    vol = "{:,.2f}".format(coinData['market_data']['market_cap_change_24h_in_currency']['usd'])
    vol_in_perpercentage = "{:,.2f}".format(coinData['market_data']['market_cap_change_percentage_24h_in_currency']['usd'])
    high_24h = "{:,.2f}".format(coinData['market_data']['high_24h']['usd'])
    low_24h = "{:,.2f}".format(coinData['market_data']['low_24h']['usd'])

    if float(vol_in_perpercentage) > 0:
        color = "green"

    elif float(vol_in_perpercentage) < 0:
        color = "red"

    else:
        color = "none"

    symbol = str(coinData['symbol']).upper()

    return render_template(

            "dashboard.html",
            data = coinData,
            price = price,
            market_cap = market_cap,
            vol = vol,
            vol_in_perpercentage = vol_in_perpercentage,
            low_24h = low_24h,
            high_24h = high_24h,
            symbol = symbol,
            color = color,
            
        )


if __name__ == "__main__":
    app.run(debug=True)
