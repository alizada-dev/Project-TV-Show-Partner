
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
const searchBox = document.getElementById("search");
const countEpisodes = document.getElementById("episode-count");

const episodes = getAllEpisodes();

function render() {
  container.textContent = "";

  const term = searchBox.value.toLowerCase();

  const filteredEpisodes = episodes.filter((episode) => {

    return (
      episode.name.toLowerCase().includes(term) ||
      episode.summary.toLowerCase().includes(term)
    )
  });

  const episodeCards = filteredEpisodes.map(createEpisodeCard);

  container.append(...episodeCards);

  if (term.length > 0) {
    countEpisodes.textContent =
      `Displaying ${filteredEpisodes.length}/${episodes.length} episodes.`;
  } else {
    countEpisodes.textContent = "";
  }
}

searchBox.addEventListener("input", handleInput);

function handleInput() {
  render();
}

render();