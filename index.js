document.addEventListener('DOMContentLoaded', function() {
    const newPokeBtn = document.querySelector("#new")

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
            console.log(pokeName)
        })

        //Create Card
        
    }
    
})