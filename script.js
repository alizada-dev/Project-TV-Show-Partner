
function createEpisodeCard(episode) {

  const card = document.getElementById("episode-card").content.cloneNode(true);

  const seasonNo = episode.season.toString().padStart(2, "0");
  const episodeNo = episode.number.toString().padStart(2, "0");

  card.querySelector(".episode-name").textContent = episode.name;
  card.querySelector(".episode-code").textContent = `- S${seasonNo}E${episodeNo}`;
  card.querySelector("img").src = episode.image.medium;

  // Using innerHTML because summary contains p tag
  card.querySelector(".episode-summary").innerHTML = episode.summary;

  return card;
}


const container = document.getElementById("episode-container");

const episodes = getAllEpisodes();

function render() {
  container.textContent = "";

  const filteredEpisodes = episodes.filter((episode) => {
    const term = searchBox.value.toLowerCase();
    
    return (
      episode.name.toLowerCase().includes(term) ||
      episode.summary.toLowerCase().includes(term)
    )
  });

  const episodeCard = filteredEpisodes.map(createEpisodeCard);

  container.append(...episodeCard);
}

const searchBox = document.getElementById("search");
searchBox.addEventListener("input", handleInput);

function handleInput() {
  render();  
}

render();