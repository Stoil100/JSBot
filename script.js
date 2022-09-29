let randomNumber;
let lastNumber;
let input = document.getElementById('input1');
const response = document.getElementById('responseArea');
const button = document.querySelector('.highlight');
//set text
const setText = {
    setHello:["Хеллоу","Hi","драсте"],
    setLike:["I like","аз обичам","аз харесвам"],
    setTime:["Колко е часа?","Час","Време","hour"],
    setWeather:["Weather","прогноза","вали","градус","ракия","сняг","дъжд"]
};
//responding text
const randomText = {
    greeting:["Hey, I'm bot", "Здрастииии","Добро утроо","Heya!"],
    hello:["Hey, I'm bot", "Здрастииии","Добро утроо","Heya!","from the other side","is it me you are looking for?"],
    like:["Кондьо", "Джена" ,"Джорджано", "Гери и Никол"],
    /*time:[`абе май е ${setInterval(trolTimeFunction,1000)}`,`Шес бес десет, няма бе, ${setInterval(actualTimeFunction,1000)} е..`],/*,`Ако умножиш ${X} по ${Y} ще получиш unix timestamp, който лесно можеш сам да си пресметнеш и да получиш текущата дата`],
    weather:[ 
        `В момента е ${weatherDescription}`,
        `За тези, които ги мързи да погледнат през прозореца - вън е ${weatherCondition}`,
        `*Наплюнчва пръст и го показва през прозореца* Усещам вятър в посока ${direction}, около ${speed} метра в секунда`,
        `Вън е ${temp} градуса, егати студа!`, (Note: When temperature is below 0 celsius)
        `${temp} градуса, как живеете вие в тая жега, добре че съм бот!`]*/
};

function timeFunction(){
    let currentTime=new Date();
    let timestamp=currentTime.getTime();
    let X;
    let Y;
    randomNumber=Math.round(Math.random()*2);
    while(randomNumber===lastNumber)randomNumber=Math.round(Math.random()*2);
    console.log(timestamp);
    let hour=currentTime.getHours();
    let minutes=currentTime.getMinutes();
    let trolHour=Math.round(Math.random()*currentTime.getHours());
    let trolMinutes=Math.round(Math.random()*currentTime.getMinutes());

    if(randomNumber===2){
    for(i=2;i<=timestamp;i++){
        if(timestamp%i==0){
            X=i;
            Y=timestamp/X;
            break;
        }
        else if(i===1_000_000){
            X=timestamp;
            Y=timestamp/X;
            break;
        }
    }
       
    }
    

    if(hour<10)hour=`0${hour}`;
    if(minutes<10)minutes=`0${minutes}`;
    
    if(trolHour<10)trolHour=`0${trolHour}`;
    if(trolMinutes<10)trolMinutes=`0${trolMinutes}`;
    
    let actualTime=`${hour}:${minutes}`;
    let trolTime=`${trolHour}:${trolMinutes}`;
    
    const time=[`Шес бес десет, няма бе, ${actualTime} е..`,`абе май е ${trolTime}`,
    `Ако умножиш ${X} по ${Y} ще получиш unix timestamp, който лесно можеш сам да си пресметнеш и да получиш текущата дата`];

    response.textContent=time[randomNumber];
    lastNumber=randomNumber;   
}

function functionTree() {
    if(setText.setHello.includes(input.value)){
        randomNumber=Math.round((Math.random()*randomText.greeting.length));
        if(randomNumber===randomText.greeting.length)randomNumber--;

            response.textContent=randomText.greeting[randomNumber];
    }
    else if(input1.value==="Hello"){
        randomNumber=Math.round(Math.random()*randomText.hello.length);
        if(randomNumber===randomText.hello.length)randomNumber--;

            response.textContent=randomText.hello[randomNumber];
    }
    else if(setText.setLike.includes(input.value)){
        randomNumber=Math.round(Math.random()*randomText.like.length);
        if(randomNumber===randomText.like.length)randomNumber--;

            response.textContent=randomText.like[randomNumber];
    }
    else if(setText.setTime.includes(input.value)){
    timeFunction();
    }
    /*else if(setText.setWeather.includes(input.value)){
        weatherFunction();
    }*/
    else{
        return;
    }
}

button.addEventListener('click', functionTree);
