let gameName = "Guess the word "
document.title=gameName;
document.querySelector("h1").innerHTML=gameName
document.querySelector("footer").innerHTML=`${gameName} create by tony maged`
// ###############################################################
let numberoftries = 10;
let numberoflitter = 6;
let currect = 1;
let numberofhints = 2
let wordtoguess = ""
document.querySelector(".hint span").innerHTML = numberofhints;
let gethintbutton = document.querySelector(".hint");
gethintbutton.addEventListener("click",gethint);


// ############################
let messagearea = document.querySelector(".message")
let words=["Create","Updata","Delete","master","school"]
wordtoguess= words[Math.floor(Math.random()*words.length)].toLocaleLowerCase(); 
console.log(wordtoguess)
function generateinput (){
    let inputcontainer = document.querySelector(".inputs")
    for(let i=1; i <= numberoftries ; i++){
        let trydiv = document.createElement("div");
        trydiv.classList.add(`try-${i}`)
        trydiv.innerHTML =`<span>Try ${i}</span>`
        if (i!==1){
            trydiv.classList.add("display-input")
        }
        for(let j = 1;j<= numberoflitter;j++){
            let input = document.createElement("input")
            input.type = "text";
            input.id =`guess${i}-letter${j}`
            input.setAttribute("maxlength",1)
            trydiv.appendChild(input)
        }
        inputcontainer.appendChild(trydiv);
    }
    inputcontainer.children[0].children[1].focus()
    let inputIndispalyDiv = document.querySelectorAll(".display-input input")
    inputIndispalyDiv.forEach((input) => (input.disabled =true))
    let inputs = document.querySelectorAll("input")
    inputs.forEach((input,index)=>{
        input.addEventListener("input",function(){
            this.value=this.value.toUpperCase();
            let nextInput = inputs[index+1]
            if(nextInput){
                nextInput.focus();
            }
            
        })
        input.addEventListener("keydown",function(event){
            // console.log(event)
            let currectindex = Array.from(inputs).indexOf(event.target)
            if(event.key==="ArrowLeft"){
                backInput = currectindex-1
                if(backInput >=0){
                    inputs[backInput].focus()
                }
            }
            if(event.key==="ArrowRight"){
                nextInput = currectindex+1
                if(nextInput <inputs.length){
                    inputs[nextInput].focus()
                }
            }
        })
    })
} 
let guessButton = document.querySelector(".check");
guessButton.addEventListener("click",handleGuesses)
function handleGuesses(){
    let successGuess= true
    for(let i = 1;i<= numberoflitter;i++){
        let inputfieldvalue=document.querySelector(`#guess${currect}-letter${i}`)
        let letter =inputfieldvalue.value.toLocaleLowerCase();
        let actualletter = wordtoguess[i-1]
        if (letter === actualletter){
            inputfieldvalue.classList.add("yes-in-place")
        }
        else if (wordtoguess.includes(letter)&&letter!==""){
            inputfieldvalue.classList.add("not-in-place")
            successGuess =false
        }
        else{
            inputfieldvalue.classList.add("no")
            successGuess =false     

        }
    }
    if(successGuess){
        messagearea.innerHTML=`you win the word <span>${wordtoguess}</span>`
        gethintbutton.disabled=true

        // alltries =document.querySelectorAll(".inputs > div");
        // alltries.forEach((trydiv) => trydiv.classList.add(".display-input"))

        guessButton.disabled=true
        
    }
    else{
        document.querySelector(`.try-${currect}`).classList.add("display-input")
        let currecttryinput = document.querySelectorAll(`.try-${currect} input`)
        currecttryinput.forEach((input)=>(input.disabled=true))

        currect++
        let nexttryinput = document.querySelectorAll(`.try-${currect} input`)
        nexttryinput.forEach((input)=>(input.disabled=false))
        let el = document.querySelector(`.try-${currect}`)
        if(el){
        document.querySelector(`.try-${currect}`).classList.remove("display-input")
            el.children[1].focus();
        }
        else{
            guessButton.disabled = true
            messagearea.innerHTML = "looo<span>loser</span>oooosrer "
        }
    }
}   
function gethint(){
    if( numberofhints > 0){
        numberofhints--
        document.querySelector(".hint span").innerHTML=numberofhints
        // console.log(numberofhints)
    }
    else if (numberofhints === 0){
        gethintbutton.disabled=true
        // console.log(numberofhints)


    }
    let enabledinput = document.querySelectorAll("input:not([disabled])")
    let empbledinput =Array.from(enabledinput).filter((input)=> input.value==="")
    // console.log(empbledinput)
    if(empbledinput.length>0){
        let randomss = Math.floor(Math.random()*empbledinput.length);
        let randominput = empbledinput[randomss]
        // console.log(randomss)
        // console.log(randominput)
        let indexfill = Array.from(enabledinput).indexOf(randominput);
        if (indexfill !== -1){
            randominput.value = wordtoguess[indexfill].toUpperCase()
        }
    }
}
function handlebackspace(event){
    if(event.key ==="Backspace")
    {
        let inputs = document.querySelectorAll("input:not([disable])")
        let currentindex =Array.from(inputs).indexOf(document.activeElement)
        if(currentindex>0){
            // inputs[currentindex-1].focus();
            let currentinput = inputs[currentindex]
            let previnpuy = inputs[currentindex-1]
            currentinput.value = ""
            previnpuy.value=""
            previnpuy.focus()
        }

    }

}
document.addEventListener("keydown",handlebackspace)
window.onload = function(){
    generateinput()
}