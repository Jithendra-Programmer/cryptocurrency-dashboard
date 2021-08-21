
let color;
let currency = 'usd';
// currency.toLocal
const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + currency + "&order=market_cap_desc&per_page=50&page=1&sparkline=false";

function displayData(data) {

    let htmlData = ''
    let rank = 1;
    for(let i of data) {
        htmlData += `<tr class="table-row">
        <th scope="row">${rank}</th>
        <td class="coinid" style.display="none">${i.id}</td>
        <td class="name-container">
          <img src="${i.image}" alt="coin-logo" class="coin-image">
          <span class="coinName" id="coin-name">${i.name}</span>
        </td>
        <td>${i.symbol.toString().toUpperCase()}</td>
        <td>$${i.market_cap.toLocaleString()}</td>
        <td>$${i.current_price.toLocaleString()}</td>
        <td id="percentage${rank}"><span id="24hpercentage${rank}">${i.price_change_percentage_24h.toFixed(2)}</span> %</td>
        <td>$${Math.round(i.market_cap_change_24h).toLocaleString()}</td>
        <th>$${i.ath.toLocaleString()}</th>
        <th>$${i.atl.toFixed(2)}</th>
      </tr>`
      rank++;
    }

    document.getElementById("table").innerHTML = htmlData;
    
    for (let j=1; j<51; j++) {


        percentage = document.getElementById("24hpercentage"+j);

        if (percentage.innerHTML > 0) {

            document.getElementById("percentage"+j).className = "color-green";
        }
        else if (percentage.innerHTML < 0) {

            document.getElementById("percentage"+ j).className = "color-red";
        }   
    }

}

async function getApi(url) {
    
    const response = await fetch(url);

    let coinData = await response.json();
    
    displayData(coinData);
}


// function displayDashboard(coin) {

//     console.log(coin)
// }

let coin;

function getCoin() {

    let coinID = document.getElementsByClassName("coinid");
    let table = document.getElementsByClassName("table-row");

    for (let num=0; num<50; num++) {
        
        table[num].onclick = () => {

            let coin = coinID[num].innerHTML;
            location.href="/coins/"+ coin;
        }
    }
}

async function main() {
    await getApi(url);
    getCoin();
};


