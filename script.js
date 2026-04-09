//const getOneEpisodes =require('./episodes')

//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  //Using map on the array of episodes to pass each as an argument to the function
  allEpisodes.map((oneEpisode) => makePageForEpisodes(oneEpisode));
}

function makePageForEpisodes(episodeList) {
  // Dom Manipulation
  const rootElem = document.getElementById("root");
  const card = document.getElementById("movie-card").content.cloneNode(true);
  card.querySelector(".season-No").textContent = episodeList.season;
  card.querySelector(".episode-name").textContent = episodeList.name;
  card.querySelector(".episode-no").textContent = episodeList.number;
  card.querySelector("img").src = episodeList.image.medium;

  //To show season code
  const seasonNo = episodeList.season.toString().padStart(2, "0");
  const episodeNo = episodeList.number.toString().padStart(2, "0");
  card.querySelector(".episode-code").textContent = `S${seasonNo}E${episodeNo}`;
  // Using innerHTML because summary contains p tag
  const summary = card.querySelector("summary");
  summary.innerHTML = episodeList.summary;
  rootElem.appendChild(card);
}

window.onload = setup;
