//Dom Elements
//Boxes
const inputBox = document.getElementById('input-area');
const displayBox = document.getElementById('display-area');
//Buttons
const confirmBtn = document.getElementById('confirm-button')
const startBtn = document.getElementById('start-button');
const resetBtn = document.getElementById('reset-button');
//display elements
const timeDisplay = document.getElementById('time-display');
const difficultyDisplay = document.getElementById('difficulty-display');
const wordsPerMinuteDisplay = document.getElementById('words-per-minute-display');
const displayAccuracy = document.getElementById('display-accuracy');

//constants
const second = 1000;
const minute = second * 60;
const hour = minute *60;

//State
let sampleText = "";
let sampleLength = "";
let wordCount = "";
let textConfirmed = false;
let timerInProgress = false;
let time = 0;
let wordsPerMinute = 0;

 
function stopTyping (){
    if(textConfirmed===false){
        return false;
    }
    inputLength = inputBox.value.length;
    
    if(inputLength ===sampleLength){
        wordsTyped = inputBox.value.split(/\s+/).length;
                textConfirmed= false;
        clearInterval(interval);
        timerInProgress = false;
        wordsPerMinute = Math.round(wordsTyped / (time/ 1000) * 60);
        wordsPerMinuteDisplay.innerText = wordsPerMinute;
        wordsTypedArray = inputBox.value.split("");
        wordsDisplayArray = sampleText.split("");
        
        let errors = 0;
        for (i=0; i< wordsTypedArray.length; i++){
            if(wordsTypedArray[i] != wordsDisplayArray[i]){
                errors++
            }
        }   
        let accuracy =  Math.round((100 - ((errors / sampleLength) * 100)));        
        displayAccuracy.innerText = `${accuracy}%`;
        alert("Finished, check out your scores on the right hand side");
        }
    }

function toggleEdit(){
    if(displayBox.value === ""){
        alert("Please put a value in and confirm");
        return;
    }
        //if text hasn't been confirmed, confirm and change edit box
    if(!textConfirmed){
        displayBox.readOnly = true; 
        confirmBtn.innerText = "EDIT";
        textConfirmed = true;
    }else{
        displayBox.readOnly = false; 
        confirmBtn.innerText = "CONFIRM"        
        textConfirmed = false;
    }
        displayBox.classList.toggle('read-only');
        
        // //record text for use in later function
        sampleText = displayBox.value.trim();
        sampleLength = sampleText.length;
        wordCount = sampleText.split(/\s+/).length;
        //change variable to enable later functions
        difficultyAlgorithm(sampleText);
        } 

function timer(){
    time = time +1000;
    const minutes = Math.floor((time % hour) / minute);
    const seconds = Math.floor((time % minute) / second) < 10 ? `0${Math.floor((time % minute) / second)}` : Math.floor((time % minute) / second);
    timeDisplay.innerText = `${minutes}:${seconds}`; 
}

function start(){
    //If timer is already on, ignore
    if(timerInProgress){
        return;
    };
    //If we have sample text. start the clock
    if(textConfirmed){
        //prepare input box
        inputBox.readOnly= false;
        inputBox.classList.toggle('read-only');
        inputBox.focus();
        //start timer
        interval = setInterval( timer ,second);
        timerInProgress = true;
    }else{
        alert("please enter some text and press confirm")
    }
}

//difficulty algorithm
function difficultyAlgorithm(sampleText){
    
    regexCaps = /[A-Z]/g;
    foundCaps = sampleText.match(regexCaps) ? sampleText.match(regexCaps).length : 0;
    regexLower = /[a-z]/g;
    foundLower = sampleText.match(regexLower) ? sampleText.match(regexLower).length : 0;
    regexInt = /[0-9]/g;
    foundInt = sampleText.match(regexInt) ? sampleText.match(regexInt).length : 0; 
    regexPunc = /[.,;']/g;
    foundPunc = sampleText.match(regexPunc) ? sampleText.match(regexPunc).length: 0;
    regexChars = /[!"£$%^&*#:+-?)()=]/g;
    foundChars = sampleText.match(regexChars) ? sampleText.match(regexChars).length: 0;

    totalCharacters = foundCaps + foundInt + foundLower + foundChars
    difficultyScore = (foundLower + (foundCaps * 2) + (foundInt * 3) + (foundPunc *3) + (foundChars * 5))/totalCharacters;
    let difficultyRating = "   "

    switch (true) {
        case difficultyScore < 1.2:
            difficultyRating = "Easy";
        break;
        case difficultyScore < 1.45:
            difficultyRating = "Medium";
        break;
        case difficultyScore < 1.75:
            difficultyRating = "Hard";
        break;
        case difficultyScore >= 1.75:
            difficultyRating = "Very Hard";
        break;
    }
    difficultyDisplay.innerText = difficultyRating;
}
//Reset function
function reset(){
    //reset text boxes and button
    console.log("hello");
    displayBox.value = "";
    displayBox.readOnly = false; 
    displayBox.classList.remove('read-only');
    confirmBtn.innerText = "CONFIRM ";

    inputBox.value = "";
    inputBox.readOnly = true;
    inputBox.classList.add('read-only');
    
    //reset state
    sampleText = "";
    sampleLength = "";
    wordCount = "";
    textConfirmed = false;
    time = 0;
    wordsPerMinute = 0;
    if (timerInProgress){
        clearInterval(interval);
        timerInProgress = false;
    }
    //reset scores
    timeDisplay.innerText = "0:00";
    difficultyDisplay.innerText = "----"
    wordsPerMinuteDisplay.innerText  = "--";
    displayAccuracy.innerText = "--%";
}

//Event Listeners
inputBox.addEventListener('keyup', stopTyping);
confirmBtn.addEventListener('click', toggleEdit);
startBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);