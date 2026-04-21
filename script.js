const state = {
  episodes: [],
  searchTerm: ""
}

function createEpisodeCard(episode) {
  const card = document.getElementById("episode-card").content.cloneNode(true);
  const seasonNo = episode.season.toString().padStart(2, "0");
  const episodeNo = episode.number.toString().padStart(2, "0");

  card.querySelector(".episode-name").textContent = episode.name;
  card.querySelector(".episode-code").textContent = `- S${seasonNo}E${episodeNo}`;
  if (episode.image != null) {
    card.querySelector("img").src = episode.image.medium;
  } else {
    card.querySelector("img").src = "placeholder.png"

  }
  if (episode.summary != null) {
    card.querySelector(".episode-summary").innerHTML = episode.summary;
  } else {
    card.querySelector(".episode-summary").innerHTML = "Episode summary";
  }

  return card;
}


const container = document.getElementById("episode-container");
const searchBox = document.getElementById("search");
const countEpisodes = document.getElementById("episode-count");
const loader = document.getElementById("loader");
const message = document.getElementById("message");


function fetchEpisodes() {
  loader.textContent = "Loading episodes...";
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then(response => response.json())
    .then(data => {
      state.episodes = data;
      loader.textContent = "";
      populateDropdownOptions();
      render();
    })
    .catch(error => {
      message.textContent = "Unable to load episodes. Please try again.";
      loader.textContent = "";
    })
}
fetchEpisodes();

function render() {
  container.textContent = "";

  const term = state.searchTerm.toLowerCase();
  const selected = dropdown.value;

  const filteredEpisodes = state.episodes.filter((episode) => {

    const seasonNo = episode.season.toString().padStart(2, "0");
    const episodeNo = episode.number.toString().padStart(2, "0");
    const code = `${seasonNo}-${episodeNo}`;

    if (episode.summary != null) {
      const matchesSearch =
      episode.name.toLowerCase().includes(term) ||
        episode.summary.toLowerCase().includes(term)
    } else {
        episode.name.toLowerCase().includes(term) ||
        episode.summary.toLowerCase().includes(term)
    }


    const matchesDropdown =
      selected === "" || selected === code;

    return matchesSearch && matchesDropdown;
  });

  if (filteredEpisodes.length === 0) {
    message.textContent = "Your search term is not matching any episodes. Try another term!"
  } else {
    message.textContent = "";
  }

  const episodeCards = filteredEpisodes.map(createEpisodeCard);

  container.append(...episodeCards);

  if (term.length > 0 || selected != "") {
    countEpisodes.textContent =
      `Displaying ${filteredEpisodes.length}/${state.episodes.length} episodes.`;
  } else {
    countEpisodes.textContent = "";
  }
}

// Search functionality
searchBox.addEventListener("input", handleInput);

function handleInput(e) {
  state.searchTerm = e.target.value;
  render();
}

// Dropdown filtering
const dropdown = document.getElementById("episodes");

function populateDropdownOptions() {
  const option = document.createElement("option");
  option.value = "";
  option.textContent = "All episodes";
  dropdown.appendChild(option);
  
  state.episodes.forEach((episode) => {
    const option = document.createElement("option");
  
    const seasonNo = episode.season.toString().padStart(2, "0");
    const episodeNo = episode.number.toString().padStart(2, "0");
    option.value = `${seasonNo}-${episodeNo}`;
  
    option.textContent = `S${seasonNo}E${episodeNo} - ${episode.name}`;
    dropdown.appendChild(option);
  });
}

dropdown.addEventListener("change", render);