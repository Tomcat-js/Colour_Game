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
let currentPlayerBrickColours = []

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

}

displayDefualtPage()


let idx = 0

const startGame = () => {
    if (middlePanelClicked === false) {
        startComputerInPlay()
    }
}

const startComputerInPlay = () => {

    middlePanelClicked = true

    let computerInPlay = setInterval(
        function () {
            if (idx < 12) {
                let randomComputerColour = computerColours[Math.floor(Math.random() * computerColours.length)]
                document.querySelector(computerBrickClasses[idx]).style.backgroundColor = randomComputerColour
        
                if (randomComputerColour === targetColour) {
                    idx += 1
                }
            } else {
                console.log('game over computer wins')
                middlePanelClicked = false
                clearInterval(computerInPlay)
            }
        },
    5000)
}




const changePlayerBrickColour = e => {

    if (middlePanelClicked === true) {
        let randomPlayerColour = playerColours[Math.floor(Math.random() * playerColours.length)] 

        let targetClassName = '.' + e.target.className.slice(6)
    
        if (playerBrickClasses.includes(targetClassName)) {
            updateCurrentPlayerColours(randomPlayerColour, targetClassName)
            e.target.style.backgroundColor = randomPlayerColour
        }
    }
}


const bricks = document.querySelectorAll('.brick')

// const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

// for (let i = 0; i < bricks.length; i++) {
//     currentPlayerBrickColours.push(rgb2hex(bricks[i].style.backgroundColor))
// }


for (let i = 0; i < bricks.length; i++) {
    bricks[i].addEventListener("click", changePlayerBrickColour)
}


middlePanel.addEventListener('click', startGame)

const updateCurrentPlayerColours = (newColour, targetClassName) => {
    // console.log(playerBrickClasses.indexOf(targetClassName))
    console.log(newColour)
    currentPlayerBrickColours.splice(playerBrickClasses.indexOf(targetClassName), 1, newColour)
    console.log(currentPlayerBrickColours)
}