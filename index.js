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
        if(userGuess === pokeObj.name) {
            pokeObj.answer = "correct";
            answerArr.push(pokeObj)
        } else {
            pokeObj.answer = "incorrect";
            answerArr.push(pokeObj)
        }
        guessForm.guess.value = "";
        if (answerArr.length < 10) {
            handleNewPoke();
        } else {
            handleResults();
        }
    })

    let pokeObj = {};
    let answerArr = []
    
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
        guessForm.style.visibility = "hidden";
        console.log(answerArr)
        const correctAnswers = answerArr.filter(function(answer) {
            return answer.answer === "correct";
        })
        const incorrectAnswers = answerArr.filter(function(answer) {
            return answer.answer === "incorrect";
        })
        console.log(correctAnswers)
        console.log(incorrectAnswers)
        pokeContainer.innerHTML = `
        <h2>GAME OVER</h2>
        `
    }
})



