// walk through from: youtube.com/watch?v=OXd_wv7Qi4g

const inputEl = document.querySelector("#autocomplete-input"); 

inputEl.addEventListener("input", onInputChange);

//get data on load
getCountryData();

//pull just name variable from data
let countryNames = [];

async function getCountryData() {
    const countryRes = await fetch("https://restcountries.com/v3.1/all")
    const data = await countryRes.json();


    // map similar to for each but returns and adds to new array

    countryNames = data.map((country) => {
        return country.name.common;
    });
    
    //console.log(countryNames);
}
 
function onInputChange() {
    removeAutocompleteDropdown(); //remove and reload each time input changed.

    const value = inputEl.value.toLowerCase();

    if (value.length === 0) return;

    const filteredNames = [];

    countryNames.forEach((countryName) => {
        if (countryName.substr(0, value.length).toLowerCase() === value)
            filteredNames.push(countryName);
    });

    createAutocompleteDropdown(filteredNames);
   // console.log(filteredNames);
}

function createAutocompleteDropdown(list) {
    const listEl = document.createElement("ul");
    listEl.className="autocomplete-list";
    listEl.id = "autocomplete-list";

    list.forEach((country) => {
        const listItem = document.createElement("li");

        const countryButton = document.createElement("button");
        countryButton.innerHTML = country;
        countryButton.addEventListener("click", onCountryButtonClick);
        listItem.appendChild(countryButton);

        listEl.appendChild(listItem);
    });

    document.querySelector("#autocomplete-wrapper").appendChild(listEl);
}

function removeAutocompleteDropdown() {
    const listEl = document.querySelector("#autocomplete-list");
    if (listEl) listEl.remove() //if list exists, then remove it.to prevent drawing over other lists.
}

function onCountryButtonClick(e) {
    e.preventDefault();

    const buttonEl = e.target;
    inputEl.value = buttonEl.innerHTML;

    removeAutocompleteDropdown();
}