
// dog api
// https://dog.ceo/api/breeds/image/random
// .then - promises
// asynchorinous pprogramming 

const token = '10223569763528853';
const url = `https://www.superheroapi.com/api.php/${token}`;

const btnRandom = document.getElementById('newhero');
const btnSearch = document.getElementById('Search');
const inputSearch = document.getElementById('SearchInput');
const heroDiv = document.getElementById('hero');

const statOrder = {
  intelligence: '1',
  strength: '2',
  speed: '3',
  durability: '4',
  power: '5',
  combat: '6'
};

const getRandomHeroId = () => Math.floor(Math.random() * 731) + 1;

btnRandom.addEventListener('click', () => {
  fetchHeroById(getRandomHeroId());
});

btnSearch.addEventListener('click', () => {
  const name = inputSearch.value.trim();
  if (name) {
    fetchHeroByName(name);
  } else {
    alert("Please enter a hero name.");
  }
});

async function fetchHeroById(id) {
  try {
    const res = await fetch(`${url}/${id}`);
    const hero = await res.json();
    displayHero(hero);
  } catch (err) {
    console.error("Error fetching hero by ID:", err);
    showError("Failed to load hero.");
  }
}

async function fetchHeroByName(name) {
  try {
    const res = await fetch(`${url}/search/${name}`);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      showError("Hero not found.");
      return;
    }

    displayHero(data.results[0]);
  } catch (err) {
    console.error("Error fetching hero by name:", err);
    showError("Failed to search hero.");
  }
}

function displayHero(hero) {
  const name = `<h2>${hero.name}</h2>`;
  const image = `<img src="${hero.image.url}" alt="${hero.name}" width="200" height="200" />`;

  const stats = Object.keys(hero.powerstats)
    .map(stat => {
      return `<p><strong>${statOrder[stat]} ${stat.toUpperCase()}:</strong> ${hero.powerstats[stat]}</p>`;
    })
    .join('');

  heroDiv.innerHTML = `${name}${image}<div class="stats">${stats}</div>`;
}

function showError(message) {
  heroDiv.innerHTML = `<p style="color: red; font-weight: bold;">${message}</p>`;
}
