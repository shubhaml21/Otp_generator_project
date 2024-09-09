const inputslider=document.querySelector("[passlength]");
const lengthdisplay=document.querySelector("[lengthdisplay]");
const displaypassword=document.querySelector(".display");
const copyBtn=document.querySelector(".displaypsw");
const copymsg=document.querySelector("[displayMsg]");
const uppercase=document.querySelector("#uppercase");
const lowercase=document.querySelector("#lowercase");
const numbers=document.querySelector("#numbers");
const symbols=document.querySelector("#Symbols");
const indicator=document.querySelector("[indicator-color]");
const generateBtn=document.querySelector(".click-generate");
const allcheckBox=document.querySelectorAll("input[type=checkbox]");
const symbol='?.@#$%^&*(}]"!~><';


let password="";
let passwordLenght=8;
let checkCount=0;
setIndicator("#ccc");
handleSlider();

//slider ahandle
function handleSlider(){
    inputslider.value=passwordLenght;
    lengthdisplay.innerText=passwordLenght;

    const min=inputslider.min;
    const max=inputslider.max;
    inputslider.style.backgroundSize = ( (passwordLenght - min) * 100 / (max - min)) + "% 100%";
}
//handle input event on length slider
inputslider.addEventListener('input', (e)=> {
    passwordLenght = e.target.value;
    handleSlider();
}); 

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.shadow=`0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRndNumber(){
    return getRndInteger(0,9);
}
function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbols(){
const randomN=getRndInteger(0,symbol.length);
return symbol.charAt(randomN);
}
function calcstrength(){
let hasUpper=false;
let hasLower=false;
let hasNum=false;
let hasSym=false;

if(uppercase.checked)hasUpper=true;
if(lowercase.checked)hasLower=true;
if(numbers.checked)hasNum=true;
if(symbols.checked)hasSym=true;

if(hasUpper && hasLower && (hasNum || hasSym) && passwordLenght >=8){
    setIndicator("#00ff00");
}
else if((hasUpper || hasLower) && (hasNum || hasSym) && passwordLenght >=6){
    setIndicator("#fff600");
}
else{
    setIndicator("#ff0000");
}
}

async function copyContent(){
    try{
    await navigator.clipboard.writeText(displaypassword.value);
   copymsg.innerText="copied";
}
catch(e){
    copymsg.innerText="failed";
}

  copymsg.classList.add("active");

  setTimeout(() => {
    copymsg.classList.remove("active");
  },2000)
}
function suffelpassword(array){
    for(let i=array.length-1; i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>{str += el});
    return str;

}

function handlecheckBox(){
    checkCount=0;
    allcheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })

    if(passwordLenght < checkCount){
        passwordLenght=checkCount;
        handleSlider();
    }
}

allcheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("change",handlecheckBox);
})


copyBtn.addEventListener("click",() =>{
    if(displaypassword.value){
        copyContent();
    }
})

generateBtn.addEventListener("click", ()=>{
    if(checkCount == 0)
        return;

    if(passwordLenght < checkCount){
        passwordLenght=checkCount;
        handleSlider();
    }
    password="";

   /* if(uppercase.checked){
        password += generateUppercase();
    }
    if(lowercase.checked){
        password += generateLowercase();
    }
    if(numbers.checked){
        password += generateRndNumber();

    }
    if(symbols.checked){
        password += generateSymbols();
    }*/
let funcArr=[];
if(uppercase.checked)
    funcArr.push(generateUppercase);
if(lowercase.checked)
    funcArr.push(generateLowercase);
if(numbers.checked)
    funcArr.push(generateRndNumber);

if(symbols.checked){
    funcArr.push(generateSymbols);}

for(let i=0; i<funcArr.length;i++){
    password += funcArr[i]();
}

for(let i=0;i<passwordLenght-funcArr.length;i++){
    let randmIndex=getRndInteger(0,funcArr.length);
    password += funcArr[randmIndex]();
}

password=suffelpassword(Array.from(password));
displaypassword.value=password;
calcstrength();
})