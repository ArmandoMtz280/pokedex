const listPokemon = document.querySelector('#listPokemon');
let URL = "https://pokeapi.co/api/v2/pokemon/";

for(i = 1; i <= 151; i++){
    fetch(URL + i)
       .then((response) => response.json())
       .then((data) => {showPokemon(data)})
       
};

const showPokemon = (pokemon) => {

    let tipos = pokemon.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`)
    console.log(tipos)

    let pokeId = pokemon.id.toString();
        if(pokeId.length === 1){
            pokeId = "00" + pokeId
        }else if(pokeId.length === 2){
            pokeId = "0" + pokeId 
        }

     const div = document.createElement('div');
           div.classList.add('card-pokemon');
           div.innerHTML = `
                
                    <p class="pokemon-id-back">#${pokeId}</p>
                    <div class="pokemon-img">
                        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="name-content">
                            <p class="pokemon-id">#${pokeId}</p>
                            <h2 class="pokemon-name">${pokemon.name}</h2>
                        </div>
                        <div class="pokemon-types">
                            ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${pokemon.height} kg</p>
                            <p class="stat">${pokemon.weight} cm</p>
                        </div>
                    </div>
                
           `
    listPokemon.append(div);
}