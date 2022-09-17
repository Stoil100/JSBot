let lastRandomNumber;

let input1=document.getElementById('input1');
const response=document.getElementById('responseArea');
const button=document.querySelector('.highlight');
const randomText=["Hey, I'm bot" , "Здрастииии" , "Добро утроо" , "Heya!" , "Здравей!"];

function greetingsF(){
let randomNumber=Math.round((Math.random())*4);

if(lastRandomNumber===randomNumber)randomNumber=Math.round((Math.random())*4);
lastRandomNumber=randomNumber;
return (input1.value==='Hello'||input1.value==='Хеллоу'||input1.value==='Hi'||input1.value==='драсте'
 ?response.textContent=`${randomText[randomNumber]}`:response.textContent='');
};

button.addEventListener('click',greetingsF);
