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

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.add({name: 'Venusaur', height: 2, types: ['grass', 'poison', 'monster']});

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write (pokemon.name + ': ' + pokemon.height + ' meters, ' + 'type: ' + pokemon.types + '<br>');
});
