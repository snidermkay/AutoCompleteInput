// walk through from: youtube.com/watch?v=OXd_wv7Qi4g

const inputEl = document.querySelector("#autocomplete-input");

inputEl.addEventListener("submit", onInputChange)

//get data on load
getCountryData();

//pull just name variable from data
let countryNames = [];

async function getCountryData(){
    const countryRes = await fetch("https://restcountries.com/v3.1/all")
    const data = await countryRes.json();


    // map similar to for each but returns and adds to new array

    countryNames = data.map((country) => {
        return country.name;
    });
    
    // console.log(countryNames);
}

function onInputChange(){
    console.log(inputEl.value);
}
