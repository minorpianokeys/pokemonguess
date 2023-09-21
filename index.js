document.addEventListener('DOMContentLoaded', function() {
    const guessForm = document.querySelector("#guessForm")
    const newPokeBtn = document.querySelector("#new")
    const pokeContainer = document.querySelector("#pokemonContainer")

    newPokeBtn.addEventListener('click', function() {
        handleNewPoke()
    })
    
    function handleNewPoke() {
        //Fetch Pokemon
        const randomPokeNum = Math.floor(Math.random() * 151)
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeNum}`)
        .then(res => res.json())
        .then(function(data) {
            const pokeName = data.name;
            const pokeImage = data.sprites.other["official-artwork"].front_default;
            
            //Create Card
            pokeContainer.innerHTML = `
            <img src="${pokeImage}">
            `

            //Handle Form
            guessForm.addEventListener('submit', function(e) {
                e.preventDefault()
                const userGuess = guessForm.guess.value;
                if(userGuess == pokeName) {
                    console.log("correct")
                } else {
                    console.log("incorrect")
                }
            })  
        })
    }  
})