const swCards = (function() {

  function sItem(selector) {
    return document.querySelector(selector);
  }

  const outputSrc = {
    charName: sItem('#characterName'),
    charPhoto: sItem('#characterPhoto'),
    charYear: sItem('#characterYear'),
    charGender: sItem('#characterGender'),
    charHair: sItem('#characterHair'),
    charHeight: sItem('#characterHeight'),
    charMass: sItem('#characterMass'),
    charactersBox: sItem('#characters')
  }

  const init = function() {
    showFirstCard();
  }

  const showFirstCard = function() {
    showNewCard(1);

    printCharactersList().then( function() {
      return addBoxEvent();
    })
  }

  const showNewCard = function(id) {
    fetch('https://swapi.co/api/people/' + id + '/')
    .then( function(response){
      return response.json()
    })
    .then(function(json){
      outputSrc.charName.textContent = json.name
      outputSrc.charPhoto.style.backgroundImage = `url("img/char${id}.jpg`
      outputSrc.charYear.textContent = json.birth_year
      outputSrc.charGender.textContent = json.gender
      outputSrc.charHair.textContent = json.hair_color
      outputSrc.charHeight.textContent = json.height
      outputSrc.charMass.textContent = json.mass
    })
  }

  const printCharactersList = function() {
    return new Promise( (resolve) => {
      for (let i = 1; i < 11; i++) {
        fetch('https://swapi.co/api/people/' + i + '/')
        .then( function(response){
          return response.json()
        })
        .then(function(json){
          if (!json.name){
            return;
          }
          const box = document.createElement('div');
          box. classList.add('character-thumb');
          outputSrc.charactersBox.appendChild(box);
          box.style.backgroundImage = `url("img/char${i}.jpg`
          box.setAttribute('data-id', i);
        }) //then end
      } // for loop end


      setTimeout( () => {
        resolve()
      },2400)
    }) //promise end
  }

  const addBoxEvent = function() {
      const characterBoxes = document.querySelectorAll('.character-thumb');
      for(let box of characterBoxes) {
        box.addEventListener('click', changeCurrentCard);
        box.classList.add('click--active');
      }
  }

  const changeCurrentCard = function() {
    const characterID = this.getAttribute('data-id');
    showNewCard(characterID);
  }

  return {
    init: init,
  }
})()

swCards.init();