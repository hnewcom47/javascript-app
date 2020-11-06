//modified pokemonList to be an array with  objects created inside said array
let pokemonRepository = (function () {  //start of an IIFE (immediately invoked function expression)
  let pokemonList = []; //empty array
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/'; //the URL of the Pokemon API

  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon) === 'name', 'detailsUrl') { //checks to make sure that each item added is an object, and has the types "name" and "detailsUrl"
      pokemonList.push(pokemon);  //add a new pokemon item to the array
    }
  }

  function getAll() {
    return pokemonList; //returns the pokemonList array
  }

  function addListItem(pokemon) {
    let list = document.querySelector('.list-group'); //selecting the "pokemon-list" unordered list (using bootstrap)

    let listItem = document.createElement('li');  //create list item

    let button = document.createElement('button');  //create button, with pokemon name (taken from the pokemon parameter)
    button.innerText = pokemon.name;  //the name is taken from the pokemon parameter
    button.classList.add('btn', 'btn-secondary', 'btn-block');  //adds classes to button
    button.setAttribute('data-target', '#pokedexmodal');  //adds attribute to button
    button.setAttribute('data-toggle', 'modal');

    listItem.appendChild(button); //appends the completed button (including the pokemon's name) to the list item

    list.appendChild(listItem); //appends the list item to the unordered list

    //this listens for the user to click on a pokemon button on the site, then runs the showDetails() function
    button.addEventListener('click', (e) => { //callback function. (e) is a shorthand reference for event
      showDetails(pokemon);
    }); //see showDetails function below: 'showDetails' is the event handler function created herein used as the second parameter of 'addEventListener'
  }

  function loadList() { //loadList function
    return fetch(apiUrl).then(function (response) { //fetches data from apiUrl (defined at the top)...
      return response.json(); //...then, returns the response/data in json format
    }).then(function (json) { //...then, executes this function
      json.results.forEach(function (item) {  //for each loop which takes in an item parameter
        let pokemon = { //creates an object for the pokemon
          name: item.name,  //name key is given the value of the pokemon item's name
          detailsUrl: item.url  //detailsUrl key is given the value of the url of the pokemon item (abilities, base points, etc.)
        };
        add(pokemon); //adds in the pokemon
      });
    }).catch(function (e) { //checks if the data is not in json format (i think)
      console.error(e); //logs an error message
    });
  }

  function loadDetails(item) {  //loadDetails function, parameter=item
    let url = item.detailsUrl;  //item = detailsUrl of the item here
    return fetch(url).then(function (response) {  //fetches url (detailsUrl)...
      return response.json(); //...then, returns the response in json format
    }).then(function (details) {  //...then, executes this function
      //Adding the details to the item
      item.imageUrl = details.sprites.front_default;  //image url.  within the details, there is a sprite image here
      item.height = details.height; //height
      item.types = [];  //types
      for (let i = 0; i < details.types.length; i++) {
        item.types.push(' ' + details.types[i].type.name);
      }
    }).catch(function (e) { //checks for errors
      console.error(e); //logs an error message
    });
  }

  //this right here is where the EVENT HANDLER FUNCTION 'showDetails' is defined. It is used in the "addListItem" function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon); //another function is called to run the modal in the browser
    });
  }

  function showModal(pokemon) {
    let modalTitle = document.querySelector('.modal-title');
    modalTitle.innerText = pokemon.name;

    let modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = '';

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Types: ' + pokemon.types;

    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }

  //returning an object with the public functions "getAll","add", "addListItem", "loadList", "loadDetails", "showDetails" and "showModal" as the object keys.
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };

})(); //the end of this function })() -- this indicates an IIFE

pokemonRepository.loadList().then(function () { //from the IIFE(pokemonRepository), executes loadList, then executes this function...
  pokemonRepository.getAll().forEach(function (pokemon) { //Now the data is loaded
    pokemonRepository.addListItem(pokemon); //adds pokemon to list
  });
});
