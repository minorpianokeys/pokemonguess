document.addEventListener('DOMContentLoaded', function() {
    const guessForm = document.querySelector("#guessForm")
    const startBtn = document.querySelector("#start")
    const pokeContainer = document.querySelector("#pokemonContainer")
    const resultsContainer = document.querySelector("#resultsContainer")


    startBtn.addEventListener('click', function() {
        handleNewPoke()
        startBtn.remove();
        guessForm.style.visibility = "visible";
    })

    //Handle Guess
    guessForm.addEventListener('submit', function(e) {
        e.preventDefault()
        const userGuess = guessForm.guess.value.toLowerCase();
        if(userGuess === pokeObj.name) {
            pokeObj.answer = "correct";
            allPokeArr.push(pokeObj)
        } else {
            pokeObj.answer = "incorrect";
            allPokeArr.push(pokeObj)
        }
        guessForm.guess.value = "";
        if (allPokeArr.length < 5) {
            handleNewPoke();
        } else {
            handleResults();
        }
    })

    let pokeObj = {};
    let allPokeArr = []
    
    function handleNewPoke() {
        
        //Fetch Pokemon
        const randomPokeNum = Math.floor(Math.random() * 150 + 1)
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeNum}`)
        .then(res => res.json())
        .then(function(data) {   
            const pokeName = data.name;
            const pokeImage = data.sprites.other["official-artwork"].front_default;
            const pokeType = data.types[0].type.name;
            
            //Create Pokemon Object
            pokeObj = {
                name: pokeName,
                image: pokeImage,
                number: data.id,
                type: pokeType,
                answer: ""
            }

            //Create Pokemon Image
            pokeContainer.innerHTML = `
            <img src="${pokeObj.image}">
            `
        })      
    }

    function handleResults() {
        pokeContainer.remove();
        guessForm.remove();

        allPokeArr.map(function(poke) {
            handleCard(poke);
        })
    }

    function handleCard(poke) {
        const card = document.createElement('div');
        resultsContainer.appendChild(card)
        const pokeNameCapital = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
        card.innerHTML = `
        <h2>#${poke.number} ${pokeNameCapital}: ${poke.answer}</h2>
        <img src="${poke.image}">
        `
        if (poke.answer === "correct") {
            card.classList = "correct";
        } else {
            card.classList = "incorrect";
        }
    }
})



