const computerBrickClasses = ['.one', '.two', '.three', '.four', '.five', '.six', '.seven', '.eight', '.nine', '.ten', '.eleven', '.twelve']

const playerBrickClasses = ['.thirteen', '.fourteen', '.fifteen', '.sixteen', '.seventeen', '.eighteen', '.nineteen', '.twenty', '.t-one', '.t-two', '.t-three', '.t-four']

let playerColours = ['#e6194b', '#000075', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff']
let computerColours = ['#e6194b', '#000075', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff']
let targetColours = ['#e6194b', '#000075', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff']

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

let targetColour
const middlePanel = document.querySelector('.middle-panel')
let middlePanelClicked = false
let currentPlayerColours 
let computerInPlay
let gameOver = false
let playerColourOptions = []
let randomPlayerColour
let playerClickCount = 0

const createPlayerColourOptions = () => {
    playerColours.forEach(colour => {
        if (colour !== targetColour) playerColourOptions.push(colour)  
    })
    // Add target colour to end of array
    playerColourOptions.push(targetColour)
}

const displayDefualtPage = () => {

    shuffle(targetColours)
    targetColour = targetColours[0]
    middlePanel.style.backgroundColor = targetColour 
    
    shuffle(computerColours)
    computerBrickClasses.forEach((brick, i)=> {
        document.querySelector(brick).style.backgroundColor = computerColours[i]
    })

    shuffle(playerColours)
    playerBrickClasses.forEach((brick, i)=> {
        document.querySelector(brick).style.backgroundColor = playerColours[i]
    })    

    currentPlayerColours = [...playerColours]

    createPlayerColourOptions()

}

displayDefualtPage()


const startGame = () => {
    if (middlePanelClicked === false && gameOver === true) {
        displayDefualtPage()
        startComputerInPlay()
    } else if (middlePanelClicked === false) {
        startComputerInPlay()
    }
}

const declareWinner = winner => {
    console.log(`game over ${winner} wins`)
    middlePanelClicked = false
    gameOver = true
    clearInterval(computerInPlay)
}

const startComputerInPlay = () => {

    let idx = 0

    middlePanelClicked = true
    gameOver = false

    computerInPlay = setInterval(
        function () {
            if (idx < 12) {
                let randomComputerColour = computerColours[Math.floor(Math.random() * computerColours.length)]
                document.querySelector(computerBrickClasses[idx]).style.backgroundColor = randomComputerColour
        
                if (randomComputerColour === targetColour) {
                    idx += 1
                }
            } else {
                declareWinner('computer')
            }
        },
    200)
}

const allEqual = arr => arr.every(v => v === arr[0])

const checkIfPlayerWon = () => {
    if (currentPlayerColours[0] === targetColour && allEqual(currentPlayerColours)) {
        declareWinner('player')
    }   
}



const changePlayerBrickColour = e => {

    let randomLimit = Math.round(Math.random() * 20)

    if (middlePanelClicked === true) {

        let targetClassName = '.' + e.target.className.slice(6)
        playerClickCount ++

        if (playerClickCount > randomLimit && playerColourOptions[0] != targetColour) {
            playerColourOptions.shift()
            playerClickCount = 0
        }

        console.log(playerColourOptions)
        randomPlayerColour = playerColourOptions[Math.floor(Math.random() * playerColourOptions.length)] 
        // console.log(playerClickCount)

    
        if (playerBrickClasses.includes(targetClassName)) {
            updateCurrentPlayerColours(randomPlayerColour, targetClassName)
            e.target.style.backgroundColor = randomPlayerColour
            checkIfPlayerWon()
        }
    }
}


const bricks = document.querySelectorAll('.brick')



for (let i = 0; i < bricks.length; i++) {
    bricks[i].addEventListener("click", changePlayerBrickColour)
}


middlePanel.addEventListener('click', startGame)

const updateCurrentPlayerColours = (newColour, targetClassName) => {
    currentPlayerColours.splice(playerBrickClasses.indexOf(targetClassName), 1, newColour)
}