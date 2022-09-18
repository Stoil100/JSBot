let randomNumber;
let input1 = document.getElementById('input1');
const response = document.getElementById('responseArea');
const button = document.querySelector('.highlight');
const setText = ["Hello", "Хеллоу", "Hi", "драсте"];
const randomText = ["Hey, I'm bot", "Здрастииии", "Добро утроо", "Heya!", "Здравей!"];
const helloText=randomText.concat("from the other side","toaster");

function greetingsF() {
    setText.includes(input1.value)&&input1.value!=="Hello" ? 
    response.textContent=`${randomText[randomNumber = Math.round((Math.random()) * 4)]}`:input1.value==="Hello"?
    response.textContent=`${helloText[randomNumber = Math.round((Math.random()) * 6)]}`:response.textContent='';
};

button.addEventListener('click', greetingsF);
