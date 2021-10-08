const computerBricks = document.querySelectorAll("[data-computer-brick]");
const playerBricks = document.querySelectorAll("[data-player-brick]");


const defaultColours = ['#e6194b', '#000075', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff']
let playerColours = [...defaultColours]
let computerColours = [...defaultColours]
let targetColours = [...defaultColours]


const shuffle = array => {

    let duplicateArray = [...array]

    let currentIndex = duplicateArray.length,  randomIndex
    
    while (currentIndex != 0) {
        
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        
        [duplicateArray[currentIndex], duplicateArray[randomIndex]] = [
            duplicateArray[randomIndex], duplicateArray[currentIndex]]
    }
        
    return duplicateArray
}

let targetColour
const middlePanel = document.querySelector('.middle-panel')
let middlePanelClicked = false
let currentPlayerColours 
let computerInPlay
let gameOver = false
let playerColourOptions = []
let randomPlayerColour
let playerClickCount = 0
let gameSpeed = 350 
let totalNumberOfComputerBricks = 12
let computerBrickIdx = 0
let limitOfClicksBeforePlayerColourOptionsIsReduced = 20
let classNameNumberPosition = 6
let randomLimitOfClicks

const createPlayerColourOptions = () => {

    playerColours.forEach(colour => {
        if (colour !== targetColour) playerColourOptions.push(colour)  
    })
    // Add target colour to end of array
    playerColourOptions.push(targetColour)
}

const displayDefualtPage = () => {

    targetColour = targetColours[Math.floor(Math.random() * targetColours.length)]
    middlePanel.style.backgroundColor = targetColour 
    
    let shuffledComputerColours = shuffle(computerColours)
    computerBricks.forEach((brick, i)=> {
        (brick).style.backgroundColor = shuffledComputerColours[i]
    })

    let shuffledPlayerColours = shuffle(playerColours)
    playerBricks.forEach((brick, i)=> {
        (brick).style.backgroundColor = shuffledPlayerColours[i]
    })    

    currentPlayerColours = [...shuffledPlayerColours]

    createPlayerColourOptions()
}

displayDefualtPage()


const startGame = () => {

    if (middlePanelClicked === false && gameOver === true) {
        computerBrickIdx = 0
        displayDefualtPage()
        startComputerInPlay()
    } else if (middlePanelClicked === false) {
        startComputerInPlay()
    }
}

const increaseGameSpeed = () => {

    gameSpeed -= 15
}

const declareWinner = winner => {

    console.log(`game over ${winner} wins`)
    prepareForNextGame(winner)

}

const prepareForNextGame = winner => {
    middlePanelClicked = false
    gameOver = true
    clearInterval(computerInPlay)

    if (winner === 'player') {
       increaseGameSpeed()
    } 
}

const moveToNextBrick = (brickId) => {

    return brickId += 1
}

const startComputerInPlay = () => {

    middlePanelClicked = true
    gameOver = false

    computerInPlay = setInterval(
        function () {
            if (computerBrickIdx < totalNumberOfComputerBricks) {
                let randomComputerColour = computerColours[Math.floor(Math.random() * computerColours.length)]

                computerBricks[computerBrickIdx].style.backgroundColor = randomComputerColour
        
                if (randomComputerColour === targetColour) {
                    computerBrickIdx = moveToNextBrick(computerBrickIdx)
                }
            } else {
                declareWinner('computer')
            }
        },
    gameSpeed)
}

const allEqual = arr => arr.every(v => v === arr[0])

const checkIfPlayerWon = () => {

    if (currentPlayerColours[0] === targetColour && allEqual(currentPlayerColours)) {
        declareWinner('player')
    }   
}


const reducePlayerColourOptions = () => {
    if (playerClickCount > randomLimitOfClicks && playerColourOptions[0] != targetColour) {
        playerColourOptions.shift()
        playerClickCount = 0
    }
}


const changePlayerBrickColour = event => {

    randomLimitOfClicks = Math.round(Math.random() * limitOfClicksBeforePlayerColourOptionsIsReduced)

    if (middlePanelClicked === true) {

        let targetIdx = Array.from(playerBricks).findIndex((brick) => brick === event.target)

        playerClickCount ++

        randomPlayerColour = playerColourOptions[Math.floor(Math.random() * playerColourOptions.length)] 

        reducePlayerColourOptions()
        updateCurrentPlayerColours(randomPlayerColour, targetIdx)
        event.target.style.backgroundColor = randomPlayerColour
        checkIfPlayerWon()
    }
}


for (let i = 0; i < playerBricks.length; i++) {
    playerBricks[i].addEventListener("click", changePlayerBrickColour)
}


middlePanel.addEventListener('click', startGame)

const updateCurrentPlayerColours = (newColour, targetIdx) => {
    currentPlayerColours.splice(targetIdx, 1, newColour)
    console.log(playerColourOptions)
}
