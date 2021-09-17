const aiNumberedButtons = ['.one', '.two', '.three', '.four', '.five', '.six', '.seven', '.eight', '.nine', '.ten', '.eleven', '.twelve']

const playerNumberedButtons = ['.thirteen', '.fourteen', '.fifteen', '.sixteen', '.seventeen', '.eighteen', '.nineteen', '.twenty', '.t-one', '.t-two', '.t-three', '.t-four']

let playerColours = ['#e6194b', '#000075', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff']
let aiColours = ['#e6194b', '#000075', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff']
let targetColours = ['#e6194b', '#000075', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff']

let aiPlay 

const middlePanel = document.querySelector('.middle-panel')




let middlePanelClicked = false

let gameOver = false

const shuffle = array => {
    let currentIndex = array.length,  randomIndex
    
    while (currentIndex != 0) {
        
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }
        
    return array
}


    
    
let newAiColours = [...aiColours]

let newPlayerColours = [...playerColours]

shuffle(targetColours)

let targetColour = targetColours[0]

let displayTargetColour = document.querySelector('.middle-panel').style.backgroundColor = targetColour 






const refreshGame = () => {

    shuffle(aiColours)
    shuffle(playerColours)

    newPlayerColours = [...playerColours]

    aiNumberedButtons.forEach((btn, i)=> {
        document.querySelector(btn).style.backgroundColor = aiColours[i]
    })
    
    playerNumberedButtons.forEach((btn, i)=> {
        document.querySelector(btn).style.backgroundColor = playerColours[i]
    })

    let randomColour = shuffle(targetColours)
    targetColour = randomColour[0]

    document.querySelector('.middle-panel').style.backgroundColor = targetColour
    gameOver = false

    startGame()
    
}    


const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

let playerRandomColour = playerColours[Math.floor(Math.random() * playerColours.length)] 

const changeColour = e => {

    if (middlePanelClicked === true) {
        playerRandomColour = playerColours[Math.floor(Math.random() * playerColours.length)] 

        let targetClassName = '.' + e.target.className.slice(4)
    
        if (playerNumberedButtons.includes(targetClassName)) {
            e.target.style.backgroundColor = playerRandomColour
            newPlayerColours.splice(playerNumberedButtons.indexOf(targetClassName), 1, playerRandomColour)
    
            if (listOfWrongColours().length === 0) {
                clearInterval(aiPlay)
                // middlePanelClicked = false
                console.log("game over player wins")
            }
        }    
    }    
}

const btns = document.querySelectorAll('.btn')


for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", changeColour)
}






const startGame = () => {

    if (gameOver === false && middlePanelClicked === false) {
        let idx = 0
        middlePanelClicked = true
        aiPlay = setInterval(
            function () {
                if (idx < 12) {
                    let colour = aiColours[Math.floor(Math.random() * aiColours.length)]
                    document.querySelector(aiNumberedButtons[idx]).style.backgroundColor = colour
         
                    if (colour === targetColour) {
                        idx += 1
                    }
                    newAiColours.shift()
                } else {
                    gameOver = true
                    middlePanelClicked = false
                    console.log('game over computer wins')
                    clearInterval(aiPlay)
                }
    
            },
        500)
    } else if (middlePanelClicked === false)(
        refreshGame()
    )


}


middlePanel.addEventListener('click', startGame)

const listOfWrongColours = () => {

    let wrongColours = []

    newPlayerColours.forEach(hexCode => {
        if (hexCode !== targetColour) {
            wrongColours.push(hexCode)
        }
    })

    return wrongColours
}
 

const defaultPage = () => {

    shuffle(aiColours)
    shuffle(playerColours)
    
    
    aiNumberedButtons.forEach((btn, i)=> {
        document.querySelector(btn).style.backgroundColor = aiColours[i]
    })
    
    playerNumberedButtons.forEach((btn, i)=> {
        document.querySelector(btn).style.backgroundColor = playerColours[i]
    })
}


defaultPage()