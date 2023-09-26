document.addEventListener('DOMContentLoaded', function() {
    const guessForm = document.querySelector("#guessForm")
    const startBtn = document.querySelector("#start")
    const pokeContainer = document.querySelector("#pokemonContainer")


    startBtn.addEventListener('click', function() {
        handleNewPoke()
        startBtn.style.visibility = "hidden";
        guessForm.style.visibility = "visible";
    })

    //Handle Guess
    guessForm.addEventListener('submit', function(e) {
        e.preventDefault()
        const userGuess = guessForm.guess.value.toLowerCase();
        if(userGuess === pokeName) {
            console.log("correct")
        } else {
            console.log("incorrect")
        }
        guessForm.guess.value = "";
        handleNewPoke()
    })

    let pokeName;
    
    function handleNewPoke() {
        
        //Fetch Pokemon
        const randomPokeNum = Math.floor(Math.random() * 150 + 1)
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeNum}`)
        .then(res => res.json())
        .then(function(data) {   
            pokeName = data.name;
            const pokeImage = data.sprites.other["official-artwork"].front_default;
            const pokeType = data.types[0].type.name;
            
            const pokeObj = {
                name: pokeName,
                image: pokeImage,
                number: data.id,
                type: pokeType,
                answer: ""
            }

            console.log(pokeObj)

            //Create Card
            pokeContainer.innerHTML = `
            <img src="${pokeImage}">
            `
        })      
    }
})



