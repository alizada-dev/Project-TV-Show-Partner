
//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  //Using map on the array of episodes to pass each as an argument to the function
  allEpisodes.forEach((oneEpisode) => createEpisodeCard(oneEpisode));
}

const container = document.getElementById("episode-container");

function createEpisodeCard(episode) {

  // Dom Manipulation
  const card = document.getElementById("episode-card").content.cloneNode(true);

  //To show season code
  const seasonNo = episode.season.toString().padStart(2, "0");
  const episodeNo = episode.number.toString().padStart(2, "0");

  card.querySelector(".episode-name").textContent = episode.name;
  card.querySelector(".episode-code").textContent = `- S${seasonNo}E${episodeNo}`;
  card.querySelector("img").src = episode.image.medium;

  // Using innerHTML because summary contains p tag
  const summary = card.querySelector(".episode-summary");
  summary.innerHTML = episode.summary;

  container.appendChild(card);
}

window.onload = setup;
