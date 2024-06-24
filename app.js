const bells = new Audio('./mixtape.wav');
const startBtn = document.querySelector('.btn-start');
let sessionMin = 25
let myIntetrval;
let appStarts = false;

function appTimer(clickInfo){
    const buttonIdentifier = clickInfo.originalTarget.id
    const sessionAmount = Number.parseInt(sessionMin)
    let totalSeconds = sessionAmount * 60;
    const minuteDiv = document.querySelector('.minutes')
    const secondsDiv = document.querySelector('.seconds')
    const pauseResumeDiv = document.getElementById('pause-resume-button')

    function updateSeconds(clickButton){
        if (clickButton=='resume'){
            const minutes = parseInt(minuteDiv.textContent) * 60
            const seconds =  parseInt(secondsDiv.textContent)
            totalSeconds = minutes + seconds
        }

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

    if (buttonIdentifier == 'reset-button'){ 
        appStarts = false;
        pauseResumeDiv.textContent = 'pause';
        clearInterval(myIntetrval)
    }

    if (buttonIdentifier == 'pause-resume-button'){
        if (pauseResumeDiv.textContent === 'pause'){
            pauseResumeDiv.textContent = 'resume';
            clearInterval(myIntetrval)
            appStarts = true;
        }else{
            pauseResumeDiv.textContent = 'pause';
            appStarts = false;
            myIntetrval = setInterval(updateSeconds, 1000, 'resume')
        }
    }

    if (buttonIdentifier == 'start-button' && appStarts){
        alert('Session has already started.')
    }

    if((buttonIdentifier == 'start-button' && !appStarts) || buttonIdentifier == 'reset-button'){
        appStarts = true
        myIntetrval = setInterval(updateSeconds, 1000)
    }
}

function editButton(){
    document.getElementById('edit-modal').style.display='block'
}

function saveEdit(){
    clearInterval(myIntetrval)
    const editedTimeDiv = document.getElementById('minInput');
    let minutes = editedTimeDiv.value
    sessionMin = parseInt(minutes)
    document.querySelector('.minutes').textContent = minutes;
    document.querySelector('.seconds').textContent = '00';
    appStarts = false;
}

document.getElementById("start-button").addEventListener("click", appTimer);
document.getElementById("reset-button").addEventListener("click", appTimer);
document.getElementById("pause-resume-button").addEventListener("click", appTimer);
document.getElementById("edit-button").addEventListener("click", editButton);
document.getElementById("edit-save-button").addEventListener("click", saveEdit);