let workCount = 0

let start_btn = document.querySelector('#start-btn')
let question = document.querySelector('#de-bai')
let variable_list = []
let answer = []
let minutes = 0;
let seconds = 0;
let tens = 0;
let score = 0;
let appendTens = document.getElementById("tens")
let appendSeconds = document.getElementById("seconds")
let appendMinutes = document.getElementById("minutes")
let appendScore = document.getElementById("score")
let audio = document.getElementById("audio")

// function getFraction(decimal){
//     for(var denominator = 1; (decimal * denominator) % 1 !== 0; denominator++);
//     return `"${decimal * denominator}/${denominator}"`
// }
function QuestionGenerator(max, min){
    let a = Math.floor(Math.random() * (max - min + 1)) + min;
    let b = Math.floor(Math.random() * (max - min + 1)) + min;
    let c = Math.floor(Math.random() * (max - min + 1)) + min;
    let d = Math.floor(Math.random() * (max - min + 1)) + min;
    let x0 = Math.floor(Math.random() * (max - min + 1)) + min;
    let y0 = Math.floor(Math.random() * (max - min + 1)) + min;
    let z0 = Math.floor(Math.random() * (max - min + 1)) + min;
    return [a,b,c,d,x0,y0,z0]
}
function solution([a,b,c,d,x0,y0,z0]){
    let t = - Math.abs(a*x0+b*y0+c*z0+d) / (a*a+b*b+c*c)
    let xA = a*t+x0
    let yA = b*t+y0
    let zA = c*t+z0
    console.log(xA,yA,zA,t)
    return [xA,yA,zA,t]
}
function numberPrettier(a){
    if (a>=0) {
        return "+" + a
    } else if (a<0) {
        return a
    }
}

function inputchecker(x){
    let splitDetectorIndex = 0
    let numerator = ''
    let denominator = ''
    if(!Number(x)){ // x is not number

        for(i in x){
            if(x[i] == '/' || x[i] == '÷'){
                splitDetectorIndex = Number(i)
            }
        }

        numerator = Number(x.slice(0,splitDetectorIndex))
        denominator = Number(x.slice(splitDetectorIndex+1,x.length))

        // console.log(numerator,denominator)
        return numerator/denominator

    } else {
        return Number(x)
    }
}
function mathcheck(a,b){
    return Math.floor((b-inputchecker(a))*1000000)/1000000
}
function startTimer () {
    tens++; 
    
    if(tens <= 9){
        appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
        appendTens.innerHTML = tens;
    } 
        
    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
        
    if (seconds > 9){
        appendSeconds.innerHTML = seconds;
    }
    
    if (seconds > 59){
        minutes++
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    
    if (minutes > 9){
        appendMinutes.innerHTML = minutes;
    }
}
function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id)) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

start_btn.addEventListener("click", () => {
    
    let Interval;
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    minutes = "00"
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
    Interval = setInterval(startTimer, 10);
    
    workCount++
    variable_list = QuestionGenerator(-5,5)
    answer = solution(variable_list)
    question.insertAdjacentHTML("beforeend", `
    <div class="bai bai-${workCount}">
        <h1> Trong hệ trục toạ độ Oxyz, cho điểm A(${variable_list[4]},${variable_list[5]},${variable_list[6]}) và mặt phẳng (P): ${variable_list[0]}x${numberPrettier(variable_list[1])}y${numberPrettier(variable_list[2])}z${numberPrettier(variable_list[3])}=0. Gọi H(x₀,y₀,z₀) là hình chiếu của A lên mặt phẳng (P), tìm toạ độ điểm H.</h1>
        <label for="x0">x₀ = </label> <input type="text" name="x0" id="x0-${workCount}"> <br>
        <label for="y0">y₀ = </label> <input type="text" name="y0" id="y0-${workCount}"> <br>
        <label for="z0">z₀ = </label> <input type="text" name="z0" id="z0-${workCount}"> <br>
        <button type="button" class="submit submit-btn-${workCount}"><i class="fas fa-check-circle"></i> <span class="textchange${workCount}">Submit</span></button>
        <div class="time-complete-${workCount}">
            <p class="bool boolean-${workCount}"></p>
            <p class="complete-${workCount} hide">Completed in <span id="minutes-${workCount}"></span>m <span id="seconds-${workCount}"></span>s <span id="tens-${workCount}"></span>''</p>
        </div>
    </div>
    `)

    let submit_btn = document.querySelector(`.submit-btn-${workCount}`)
    let textchange = document.querySelector(`.textchange${workCount}`)
    let exercise = document.querySelector(`.bai-${workCount}`)
    let boolean = document.querySelector(`.boolean-${workCount}`)
    let complete_check = document.querySelector(`.complete-${workCount}`)
    console.log(submit_btn)
    start_btn.disabled = true
    submit_btn.addEventListener("click", () => {
        let x0_ = document.querySelector(`#x0-${workCount}`)
        let y0_ = document.querySelector(`#y0-${workCount}`)
        let z0_ = document.querySelector(`#z0-${workCount}`)
        let minutes_complete = document.querySelector(`#minutes-${workCount}`)
        let seconds_complete = document.querySelector(`#seconds-${workCount}`)
        let tens_complete = document.querySelector(`#tens-${workCount}`)
        if(mathcheck(x0_.value,answer[0]) == 0 && mathcheck(y0_.value,answer[1]) == 0 && mathcheck(z0_.value,answer[2]) == 0 ){
            if(minutes < 2){
                score += Math.ceil((120-60*minutes-seconds)/3) * 15
            } else {
                score += 15
            }
            audio.src = './true.mp3'
            audio.play()
            exercise.classList.add("true")
            boolean.innerHTML = "🤓🤓🤓 True! U big brain! 🤓🤓🤓"
        } else {
            score -= 1000
            audio.src = './wrong.mp3'
            audio.play()
            console.log(x0_.value,y0_.value,z0_.value)
            console.log(answer)
            exercise.classList.add("wrong")
            boolean.innerHTML = "👎😭😭 Wrong haha u noob loser dumb dumb! 😭😭👎"
        }
        clearInterval(Interval);
        appendScore.innerHTML = score
        complete_check.classList.remove('hide')
        minutes_complete.innerHTML = minutes
        seconds_complete.innerHTML = seconds
        tens_complete.innerHTML = tens
        x0_.disabled = true
        y0_.disabled = true
        z0_.disabled = true
        textchange.innerHTML = "Submitted"
        submit_btn.disabled = true
        start_btn.disabled = false
    })
})

// let buttonStart = document.getElementById('button-start');
// let buttonStop = document.getElementById('button-stop');
// let buttonReset = document.getElementById('button-reset');
  
// buttonReset.onclick = function() {
// }

dragElement(document.querySelector("#timer"))
// for(i of "Hello"){
//     console.log(i)
// }
// console.log(inputchecker('120/100'))
// console.log(Number('-100'))