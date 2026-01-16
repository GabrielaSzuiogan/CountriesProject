console.log("tatatata");

function saveHistory(searchTerm) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  history.unshift(searchTerm);
  history = history.slice(0, 10);
  history = [...new Set(history)];
  localStorage.setItem("searchHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  const pillsContainer = document.getElementById("historyPills");
  pillsContainer.innerHTML = "";
  history.forEach((term) => {
    const pill = document.createElement("button");
    pill.className = "pill";
    pill.textContent = term;
    pill.addEventListener("click", () => searchCountryByName(term));
    pillsContainer.appendChild(pill);
  });
}

document.addEventListener("DOMContentLoaded", renderHistory);
