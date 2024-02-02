
// dog api
// https://dog.ceo/api/breeds/image/random
// .then - promises
// asynchorinous pprogramming 


const token = '10223569763528853'
const url = `https://www.superheroapi.com/api.php/${token}`

const random_Hero = document.getElementById('newhero')
const heroDiv = document.getElementById('hero')
const search = document.getElementById('Search')
const input = document.getElementById('SearchInput')



const random = () => {
  const noHero = 731
  return Math.floor(Math.random() * noHero) + 1
}

random_Hero.onclick = () => Get_Random_SuperHero(random())


const Get_Random_SuperHero = (id, name) => {
  fetch(`${url}/${id}`)
    .then(Response => Response.json())
    .then(json => {
      
      const SuperHero = json
      const stats = ShowHeroInfo(SuperHero)
      
    })
}

const numbering = {
  intelligence: '1 ',
  strength: '2 ',
  speed: '3 ',
  durability: '4 ',
  power: '5 ',
  combat: '6 '
}


const ShowHeroInfo = (character) => {

  const name = `<h2>${character.name}</h2>`
  const img = `<img src = "${character.image.url}" height = 200 width = 200 />` 
  
  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p> ${numbering[stat]} ${stat.toUpperCase()}:${character.powerstats[stat]} </p>`
  }).join('')

  console.log(stats)
  heroDiv.innerHTML = `${name}  ${img} ${stats} `

}


Search.onclick = () => Search_Superhero(input.value)


const Search_Superhero = (name) => {

  fetch(`${url}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const hero = json.results[0]
      const stats = ShowHeroInfo(hero)
    })
}








