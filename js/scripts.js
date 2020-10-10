let pokemonList = [
  {name: 'Squirtle', height: 0.5, types: ['water', 'monster']},
  {name: 'Pikachu', height: 0.4, types: ['electric', 'field', 'fairy']},
  {name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal']},
  {name: 'Charizard', height: 1.7, types: ['fire', 'flying', 'monster', 'dragon']},
  {name: 'Onix', height: 8.8, types: ['rock', 'ground', 'mineral']}
];

pokemonList.forEach (function (pokemon) {
  document.write (pokemon.name + ': ' + pokemon.height + ' meters, ' + 'type: ' + pokemon.types + '<br>');
});
