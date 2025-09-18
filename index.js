const listPokemon = document.querySelector('#listPokemon');
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";


const showPokemon = (pokemon) => {

   /**
    * Se accede a los types, se hace un map para iterar en
      cada "type" que venga dentro de "types" y de cada type obtener su nombre, 
      por cada elemento "type" de retorna un template    */ 
   let tipos = pokemon.types.map((t) =>  `<p class="${t.type.name} tipo">${t.type.name}</p>`);
       tipos = tipos.join('');

   let pokeId = pokemon.id.toString();
   if(pokeId.length === 1){
       pokeId = "00" + pokeId;
   }else if(pokeId.length === 2){
       pokeId = "0" + pokeId
   };
   
  

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
                            <p class="stat">${pokemon.weight / 10} kg</p>
                            <p class="stat">${pokemon.height / 10} mts</p>
                        </div>
                    </div>
                
           `
    listPokemon.append(div);

    
};

const arrayPokemon = [];


for(let i = 1; i <= 151; i++){
    fetch(URL + i)
       .then((response) => response.json())
       .then((data) => {
        arrayPokemon.push(data)
        showPokemon(data)
    })
       
};


botonesHeader.forEach((boton) => {
    boton.addEventListener('click', (event) => {
        
        listPokemon.innerHTML = '';
        const btnId = event.currentTarget.id; // se accede al id del boton
        
          
        if(btnId === "ver-todos"){
            arrayPokemon.forEach(p => showPokemon(p))
        }else{
            arrayPokemon
                .filter(p => p.types.some(t => t.type.name === btnId))
                .forEach(p => showPokemon(p))
        }
    })      
})
