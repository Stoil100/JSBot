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
    setWeather:["weather","прогноза","вали","градус","ракия","сняг","дъжд"]
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

function weatherFunction(){
    let temp;
    let windSpeed;
    let weatherCondition;
    let windDirection;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Varna&lang=bg&APPID=5637a28789778bf15860cef0c6d5e947')
.then(response=>response.json())
.then(data => {
    temp=data['main']['temp'];  
    windSpeed=data['wind']['speed'];
    windDirection=data['wind']['deg'];
    weatherCondition=data['weather'][0]['description']
    console.log(data);
})
.catch(error=>alert("Somethings wrong I can feel it"));

setTimeout(logTemp,200); 

function logTemp(){

    if(windDirection<=45&&windDirection>=0)windDirection="север";
    else if(windDirection>45&&windDirection<=90)windDirection="северо-изток";
    else if(windDirection>90&&windDirection<=135)windDirection="изток";
    else if(windDirection>135&&windDirection<=180)windDirection="юго-изток";
    else if(windDirection>180&&windDirection<=225)windDirection="юг";
    else if(windDirection>225&&windDirection<=270)windDirection="юго-запад";
    else if(windDirection>270&&windDirection<=315)windDirection="запад";
    else if(windDirection>315&&windDirection<=360)windDirection="северо-запад";


    let weather=[ 
        `В момента е ${weatherCondition}`,
        `За тези, които ги мързи да погледнат през прозореца - вън е ${weatherCondition}`,
        `*Наплюнчва пръст и го показва през прозореца* Усещам вятър в посока ${windDirection}, около ${windSpeed} метра в секунда`,
        `Навън е ${Math.floor(temp/10)} градуса`
    ];

    if(Math.floor(temp/10)<=0){
        weather[weather.length-1]=`Вън е ${Math.round(temp/10)} градуса, егати студа!`;
    }
    if(Math.floor(temp/10)>=30){
        weather[weather.length-1]=`${Math.round(temp/10)} градуса, как живеете вие в тая жега, добре че съм бот!`;
    }
        randomNumber=Math.floor(Math.random()*(weather.length));
        while(randomNumber===weather.length||randomNumber===lastNumber)randomNumber=Math.floor(Math.random()*(weather.length));

        response.textContent=weather[randomNumber];
    lastNumber=randomNumber;  
}
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
    else if(setText.setWeather.includes(input.value)){
        weatherFunction();
    }
    else{
        return;
    }
}

button.addEventListener('click', functionTree);
