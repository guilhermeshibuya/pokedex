const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImg = document.querySelector('.pokemon__img');

const pokemonType = document.querySelector('.pokemon__type');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonWeight = document.querySelector('.pokemon__weight');
const pokemonAtk = document.querySelector('.pokemon__atk');
const pokemonHp = document.querySelector('.pokemon__hp');
const pokemonDef = document.querySelector('.pokemon__def');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShiny = document.querySelector('.btn-shiny');

let searchPokemon = 1;
let shiny = false;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    // O await vai esperar o fetch concluir, não passando pra proximas linhas até concluir, 
    // porém só pode ser utilizado em funções assincronas

    if (APIResponse.status == 200)
    {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data)
    {
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonHeight.innerHTML = data.height/10 + 'm';
        pokemonWeight.innerHTML = data.weight/10 + 'kg';
        pokemonAtk.innerHTML = data['stats']['1']['base_stat'];
        pokemonHp.innerHTML = data['stats']['0']['base_stat'];
        pokemonDef.innerHTML = data['stats']['2']['base_stat'];

        if (data.types.length > 1)
        {
            for (let i = 0; i < data.types.length; i++)
            {
                if (i == 0)
                    pokemonType.innerHTML = data['types'][`${i}`]['type']['name'] + ', ';
                else
                    pokemonType.innerHTML += data['types'][`${i}`]['type']['name'];
            }
        }
        else
        {
            pokemonType.innerHTML = data['types']['0']['type']['name'];
        }


        if (shiny)
        {
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        }
        else
        {
            pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
        input.value = '';
        searchPokemon = data.id;
    }
    else
    {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not found :/';
        pokemonNumber.innerHTML = '';

        input.value = '';
    }

    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // preventDefault cancela o evento se ele for cancelável, ou seja, a ação padrão do evento não ocorrerá
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1)
    {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

buttonShiny.addEventListener('click', () => {
    if (shiny)
        shiny = false;
    else
        shiny = true;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);

