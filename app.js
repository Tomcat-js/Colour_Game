const aiNumberedButtons = ['.one', '.two', '.three', '.four', '.five', '.six', '.seven', '.eight', '.nine', '.ten', '.eleven', '.twelve']

const playerNumberedButtons = ['.thirteen', '.fourteen', '.fifteen', '.sixteen', '.seventeen', '.eighteen', '.nineteen', '.twenty', '.t-one', '.t-two', '.t-three', '.t-four']

let aiColours, playerColours, targetColours 

aiColours = playerColours = targetColours = ['#e6194b', '#000075', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff']

const middlePanel = document.querySelector('.middle-panel')

function shuffle(array) {
    let currentIndex = array.length,  randomIndex
    
    while (currentIndex != 0) {
        
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }
        
    return array
}
    
    shuffle(aiColours, playerColours, targetColours)
    

    let newAiColours = [...aiColours]
    
    let newPlayerColours = [...playerColours]
    
    

aiNumberedButtons.forEach((btn, i)=> {
    document.querySelector(btn).style.backgroundColor = aiColours[i]
})

playerNumberedButtons.forEach((btn, i)=> {
    document.querySelector(btn).style.backgroundColor = playerColours[i]
})


const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

let playerRandomColour = playerColours[Math.floor(Math.random() * playerColours.length)] 

const changeColour = e => {

    playerRandomColour = playerColours[Math.floor(Math.random() * playerColours.length)] 

    let targetClassName = '.' + e.target.className.slice(4)

    if (playerNumberedButtons.includes(targetClassName)) {
        e.target.style.backgroundColor = playerRandomColour
        newPlayerColours.splice(playerNumberedButtons.indexOf(targetClassName), 1, playerRandomColour)
        // console.log(newPlayerColours)
    }
}


const btns = document.querySelectorAll('.btn')


for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", changeColour)
}

let targetColour = targetColours[0]

let displayTargetColour = document.querySelector('.middle-panel').style.backgroundColor = targetColour

// console.log(displayTargetColour)

let idx = 0

const startGame = () => {

    const aiPlay = setInterval(
        function () {
            if (idx < 12) {
                console.log(idx)
                let colour = aiColours[Math.floor(Math.random() * aiColours.length)]
                document.querySelector(aiNumberedButtons[idx]).style.backgroundColor = colour
     
                if (colour === targetColour) {
                    idx += 1
                }
                newAiColours.shift()
            } else {
                console.log('game over')
                clearInterval(aiPlay)
            }

        },
    50)
}




middlePanel.addEventListener('click', startGame)


    