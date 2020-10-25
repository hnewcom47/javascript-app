let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Squirtle', height: 0.5, types: ['water', 'monster']},
    {name: 'Pikachu', height: 0.4, types: ['electric', 'field', 'fairy']},
    {name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal']},
    {name: 'Charizard', height: 1.7, types: ['fire', 'flying', 'monster', 'dragon']},
    {name: 'Onix', height: 8.8, types: ['rock', 'ground', 'mineral']}
  ];

  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon) === 'name', 'height', 'types'){
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');

    listItem.appendChild(button);

    list.appendChild(listItem);

    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

})();

pokemonRepository.add({name: 'Venusaur', height: 2, types: ['grass', 'poison', 'monster']});

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
