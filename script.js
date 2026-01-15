const countryInput = document.getElementById("countryInput");
const findBtn =  document.getElementById("findBtn");
const findAllBtn =  document.getElementById("findAllBtn");
let showResult =  document.getElementById("showResult");

let countryList = [];

fetch("https://restcountries.com/v3.1/independent")
.then(response => response.json())
.then(data => {
    countryList = data;
//     data.forEach(element => {
//         console.log(element.name.common);

// document.getElementById("name").textContent=element.name.common;
//     });
})
.catch(error => console.log(error))


findBtn.addEventListener("click", () => {
    const search = countryInput.value.toLowerCase().trim();
    const country = countryList.find(c => c.name.common.toLowerCase().includes(search));
    if(!search || !country){
        showResult.innerHTML = `
    <div class = "card">
        <p><strong>No country found!</strong> <span id = "countryName"></span></p>
        <img src="https://img.freepik.com/premium-vector/child-with-map-his-hands-asks-directions_650542-1436.jpg" alt="Country Image" id="countryImage" >
        
    </div>
    
    `;
    return;
    }
    console.log(country);
showResult.innerHTML = `
    <div class = "card">
     <img src=" ${country.flags.png}" alt="Country Image" id="countryImage" >
        <div class = "left"> 
           
            <p><strong>Country:</strong> <span id = "countryName"> ${country.name.common}</span></p>
            <p><strong>Capital:</strong> <span id = "capital">${country.capital}</span></p>
            <p><strong>Language:</strong> <span id = "countryName"> ${Object.values(country.languages).join(", ")}</span></p>
            
        </div>

        <div class = "right"> 
            <p><strong>Population:</strong> <span id = "capital">${country.population}</span></p>
            <p><strong>Currency:</strong> <span id = "countryName"> ${Object.values(country.currencies)[0].name}  (${Object.values(country.currencies)[0].symbol}) </span></p>
            <p><strong>Map:</strong> <a href=${Object.values(country.maps)[0]}>Google Maps</a> <span id = "capital"></span></p>
            
        </div>

    </div>
    
    `;
})


