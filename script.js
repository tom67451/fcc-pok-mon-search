const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const results = document.getElementById("results");

const fetchData = async (userInput) => {
    try { 
      const apiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"
      const fullUrl = apiUrl + userInput.toLowerCase();
      const res = await fetch(fullUrl);
      
      const data = await res.json();
      console.log(data);
      return data;
       
    } catch (err) {
      alert("Pokémon not found");
      console.error(err);
      return null;
    }
};

const displayStats = (data) => {
  if (!data) return;

  const { name, id, weight, height, types, stats, sprites } = data;

  results.innerHTML = "";

 
  
  

  results.innerHTML = `
    <div id="pokemon-name">${name}</div>
    <div id="pokemon-id">${id}</div>
    <div id="weight">${weight}</div>
    <div id="height">${height}</div>
    <div id="types"></div>
    <div id="hp">${stats.find(stat => stat.stat.name === "hp")?.base_stat}</div>
    <div id="attack">${stats.find(stat => stat.stat.name === "attack")?.base_stat}</div>
    <div id="defense">${stats.find(stat => stat.stat.name === "defense")?.base_stat}</div>
    <div id="special-attack">${stats.find(stat => stat.stat.name === "special-attack")?.base_stat}</div>
    <div id="special-defense">${stats.find(stat => stat.stat.name === "special-defense")?.base_stat}</div>
    <div id="speed">${stats.find(stat => stat.stat.name === "speed")?.base_stat}</div>
    <img id="sprite" src="${sprites.front_default}">
  `;
  const typesDiv = document.getElementById("types");
  types.forEach((typeObj) => {
    const typeSpan = document.createElement("span");
    typeSpan.textContent = typeObj.type.name.toUpperCase();
    typesDiv.appendChild(typeSpan);

  }) 
  
  
};

button.addEventListener("click", async () => {
  const userInput = input.value.trim();
  if (userInput === "") {
    alert("Please enter a Pokémon name or ID");
    return;
  }

  const data = await fetchData(userInput); 
  if (data) {
    displayStats(data);
  }
});
