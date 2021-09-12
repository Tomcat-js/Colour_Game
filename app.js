console.log("app")

const aiNumberedButtons = ['.one', '.two', '.three', '.four', '.five', '.six', '.seven', '.eight', '.nine', '.ten', '.eleven', '.twelve', '.thirteen', '.fourteen', '.fifteen', '.sixteen']

const playerNumberedButtons = ['.seventeen', '.eighteen', '.nineteen', '.twenty', '.t-one', '.t-two', '.t-three', '.t-four', '.t-five', '.t-six', '.t-seven', '.t-eight', '.t-nine', '.thirty', '.th-one', '.th-two']

const aiColours = ['#e6194b', '#000075', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3']

const playerColours = ['#e6194b', '#000075', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3']



const targetColour = '#e6194b'





function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    
    while (currentIndex != 0) {
        
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        
        return array;
    }
    
    shuffle(aiColours)
    shuffle(playerColours) 
    
    
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

    if (playerNumberedButtons.includes('.' + e.target.className.slice(4))) {
        e.target.style.backgroundColor = playerRandomColour
        newPlayerColours.splice(playerNumberedButtons.indexOf('.' + e.target.className.slice(4)), 1, playerRandomColour)
        console.log(newPlayerColours)
    }
}



const btns = document.querySelectorAll('.btn')


for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", changeColour)
}


// Used like so


// console.log(playerColours);

let displayTargetColour = document.querySelector('.middle-panel').style.backgroundColor = targetColour

// document.querySelector(aiNumberedButtons[0]).style.backgroundColor = 'blue'



// let testHex = rgb2hex(testColor)


// while (newAiColours[0] !== targetColour) {

//     aiRandomColour = aiColours[Math.floor(Math.random() * aiColours.length)]

//     // newAiColours[0].style.backgroundColor = aiRandomColour

//     document.querySelector(aiNumberedButtons[0]).style.backgroundColor = aiRandomColour

// }

// for (let i = 0; i < aiColours.length; i++) {
//     document.querySelector(aiNumberedButtons[0]).style.backgroundColor = aiColours[i]   
// }





// setInterval(
// function () {
//     let colour = newAiColours[0]
//     document.querySelector(aiNumberedButtons[0]).style.backgroundColor  = colour;

//     if (colour === targetColour) return
//     newAiColours.shift()
// },1000);

let idx = 0

setInterval(
function () {
    let colour = aiColours[Math.floor(Math.random() * aiColours.length)]
    document.querySelector(aiNumberedButtons[idx]).style.backgroundColor = colour;
    
    if (colour === targetColour) {
        idx += 1
    return
    }
    newAiColours.shift()

},500);


// for (let i = 0; i < aiNumberedButtons.length; i++) {
//     setInterval(
//         function () {
//             let colour = newAiColours[0]
//             document.querySelector(aiNumberedButtons[i]).style.backgroundColor = colour;
        
//             if (colour === targetColour) return
//             newAiColours.shift()
//         },1000);
// }



    