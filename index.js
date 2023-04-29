// import * as math from "https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.js"

// import { create, all } from "https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.js"

// const config = { }
// const math = create(all, config)

// import fractional from 'fractional'

let workCount = 0

let start_btn = document.querySelector('#start-btn')
let question = document.querySelector('#de-bai')
let variable_list = []
let answer = []

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
    return Math.floor((b-inputchecker(a))*100000)/100000
}

start_btn.addEventListener("click", () => {
    workCount++
    variable_list = QuestionGenerator(-5,5)
    answer = solution(variable_list)
    question.insertAdjacentHTML("beforeend", `
    <div class="bai bai-${workCount}">
        <h1> Trong hệ trục toạ độ Oxyz, cho toạ độ điểm A(${variable_list[4]},${variable_list[5]},${variable_list[6]}) và mặt phẳng (S): ${variable_list[0]}x${numberPrettier(variable_list[1])}y${numberPrettier(variable_list[2])}z${numberPrettier(variable_list[3])}=0. Tìm toạ độ điểm M(x0,y0,z0), biết rằng M là hình chiếu của A lên mặt phẳng (S).</h1>
        <label for="x0">x0 = </label> <input type="text" name="x0" id="x0-${workCount}"> <br>
        <label for="y0">y0 = </label> <input type="text" name="y0" id="y0-${workCount}"> <br>
        <label for="z0">z0 = </label> <input type="text" name="z0" id="z0-${workCount}"> <br>
        <button type="button" class="submit submit-btn-${workCount}"><i class="fas fa-check-circle"></i> Submit</button>
    </div>
    `)

    let submit_btn = document.querySelector(`.submit-btn-${workCount}`)
    console.log(submit_btn)
    // start_btn.disabled = true
    submit_btn.addEventListener("click", () => {
        let x0_ = document.querySelector(`#x0-${workCount}`)
        let y0_ = document.querySelector(`#y0-${workCount}`)
        let z0_ = document.querySelector(`#z0-${workCount}`)
        if(mathcheck(x0_.value,answer[0]) == 0 && mathcheck(y0_.value,answer[1]) == 0 && mathcheck(z0_.value,answer[2]) == 0 ){
            alert("Gotcha")
        } else {
            alert("Noob")
            console.log(x0_.value,y0_.value,z0_.value)
            console.log(answer)
        }
        x0_.disabled = true
        y0_.disabled = true
        z0_.disabled = true
        submit_btn.disabled = true
    })
})
// for(i of "Hello"){
//     console.log(i)
// }
// console.log(inputchecker('120/100'))
// console.log(Number('-100'))