const bells = new Audio('./mixtape.wav');
const startBtn = document.querySelector('.btn-start');
const sessionMin = 25
let myIntetrval;
let appStarts = false;

function appTimer(clickInfo){
    const buttonIdentifier = clickInfo.originalTarget.id
    const sessionAmount = Number.parseInt(sessionMin)
    const minuteDiv = document.querySelector('.minutes')
    const secondsDiv = document.querySelector('.seconds')
    if (buttonIdentifier == 'reset-button'){ 
        appStarts = false
        clearInterval(myIntetrval)
    }

    if(!appStarts){
        appStarts = true
        let totalSeconds = sessionAmount * 60

        const updateSeconds = () =>{
            console.log('minuteDiv',minuteDiv)

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds/60);
            let secondsLeft = totalSeconds % 60 ;

            if (secondsLeft < 10){
                secondsDiv.textContent = '0' + secondsLeft;
            } else {
                secondsDiv.textContent = secondsLeft;
            }

            minuteDiv.textContent = `${minutesLeft}`

            if ( minutesLeft == 0 && secondsLeft == 0){
                bells.play()
                clearInterval(myIntetrval)
            }
        }
        myIntetrval = setInterval(updateSeconds, 1000)
    } else {
        alert('Session has already started.')
    }
    
}

document.getElementById("start-button").addEventListener("click", appTimer);
document.getElementById("reset-button").addEventListener("click", appTimer);
