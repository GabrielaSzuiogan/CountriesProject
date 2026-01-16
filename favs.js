function saveFavorite(countryName) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(countryName)) {
    favorites.push(countryName);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}

function removeFavorite(countryName) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(fav => fav !== countryName);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

function isFavorite(countryName) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.includes(countryName);
}

async function fetchCountryDetails(countryName) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log("Error fetching country details:", error);
    return null;
  }
}

function renderFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favContainer = document.getElementById("favoritesContainer");
  
  if (favorites.length === 0) {
    favContainer.innerHTML = "<p>No favorites yet. Search and click the heart icon to add!</p>";
    return;
  }
  
  favContainer.innerHTML = "<h3>My Favorites</h3>";
  const favsList = document.createElement("div");
  favsList.className = "favorites-list";
  
  favorites.forEach(countryName => {
    const favItem = document.createElement("div");
    favItem.className = "favorite-item";
    favItem.innerHTML = `
      <div class="fav-header">
        <span class="fav-name">${countryName}</span>
        <button class="remove-fav-btn" onclick="removeFavorite('${countryName}')">✕</button>
      </div>
      <button class="expand-btn" onclick="toggleFavoriteExpand(this, '${countryName}')">Show Details</button>
      <div class="fav-details" style="display: none;"></div>
    `;
    favsList.appendChild(favItem);
  });
  
  favContainer.appendChild(favsList);
}

async function toggleFavoriteExpand(button, countryName) {
  const detailsDiv = button.nextElementSibling;
  
  if (detailsDiv.style.display === "none") {
    button.textContent = "Hide Details";
    detailsDiv.innerHTML = "<p>Loading...</p>";
    
    const country = await fetchCountryDetails(countryName);
    if (country) {
      detailsDiv.innerHTML = `
        <div class="fav-details-content">
          <p><strong>Official Name:</strong> ${country.name.official || 'N/A'}</p>
          <p><strong>Region:</strong> ${country.region || 'N/A'}</p>
          <p><strong>Subregion:</strong> ${country.subregion || 'N/A'}</p>
          <p><strong>Capital:</strong> ${country.capital ? country.capital.join(", ") : 'N/A'}</p>
          <p><strong>Population:</strong> ${country.population ? country.population.toLocaleString() : 'N/A'}</p>
          <p><strong>Area:</strong> ${country.area ? country.area.toLocaleString() : 'N/A'} km²</p>
          <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(", ") : 'N/A'}</p>
          <p><strong>Currencies:</strong> ${country.currencies ? Object.entries(country.currencies).map(([code, cur]) => `${cur.name} (${cur.symbol})`).join(", ") : 'N/A'}</p>
          <p><strong>Timezones:</strong> ${country.timezones ? country.timezones.join(", ") : 'N/A'}</p>
        </div>
      `;
    } else {
      detailsDiv.innerHTML = "<p>Error loading details</p>";
    }
    detailsDiv.style.display = "block";
  } else {
    button.textContent = "Show Details";
    detailsDiv.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", renderFavorites);