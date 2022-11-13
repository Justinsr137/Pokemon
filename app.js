const CARDS = 10;




for(i = 1; i <= CARDS; i++){
    let id = getRandomId(150);
    searchPokemon(id);
}

let draggableElements = document.querySelector('.draggable-elements')
let dropableElements = document.querySelector('.dropable-elements');
let pokemonSearched = [];
let pokemonNames = [];
async function searchPokemon(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();
    pokemonSearched.push(data);
    pokemonNames.push(data.name);

    pokemonNames = pokemonNames.sort(()=> Math.random()-0.5);

    draggableElements.innerHTML = '';
    pokemonSearched.forEach(pokemon =>{
        draggableElements.innerHTML += `<div class="pokemon">
        <img id="${pokemon.name}" draggable="true" class="image" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="">
    </div>`
    })
    dropableElements.innerHTML = '';
    pokemonNames.forEach(names => {
        dropableElements.innerHTML += `<div class="names">
        <p>${names}</p>
    </div>`
    })

    let pokemons = document.querySelectorAll('.image');
    pokemons = [...pokemons];
    pokemons.forEach(pokemon =>{
        pokemon.addEventListener('dragstart', event=>{
            event.dataTransfer.setData('text', event.target.id)
        })
    })

    let names = document.querySelectorAll('.names');
    let wrongMsg = document.querySelector('.wrong');
    let point = 0;
    names = [...names];
    names.forEach(name => {
        name.addEventListener('dragover', event=>{
            event.preventDefault();
        })
        name.addEventListener('drop', event=>{
            const draggableElementsData = event.dataTransfer.getData('text');
            let pokemonElement = document.querySelector(`#${draggableElementsData}`)
            if(event.target.innerText == draggableElementsData){
                point++;
                wrongMsg.innerText = ''
                event.target.innerHTML = ''
                event.target.appendChild(pokemonElement)
                if(point == CARDS){
                    draggableElements.innerHTML = `<p class="win">Ganaste</p>`
                }
            }else{
                wrongMsg.innerText = 'UPS'
            }
        })
    })


}

function getRandomId(max){
    return Math.floor(Math.random()*max)+1;
}