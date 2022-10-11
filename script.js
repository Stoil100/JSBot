let randomNumber;
let lastNumber;
let input = document.getElementById('input1');
const response = document.getElementById('responseArea');
const button = document.querySelector('.button');
const itemsList=document.querySelector('.place');
const items = JSON.parse(localStorage.getItem('items'))||[];
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
    random:["Did I mention that you speak Bulgarian?","Oh my!"," ", "Yeah dude, I feel that..","That's a weird thing to say,"," "]
    /*time:[`абе май е ${setInterval(trolTimeFunction,1000)}`,`Шес бес десет, няма бе, ${setInterval(actualTimeFunction,1000)} е..`],/*,`Ако умножиш ${X} по ${Y} ще получиш unix timestamp, който лесно можеш сам да си пресметнеш и да получиш текущата дата`],
    weather:[ 
        `В момента е ${weatherDescription}`,
        `За тези, които ги мързи да погледнат през прозореца - вън е ${weatherCondition}`,
        `*Наплюнчва пръст и го показва през прозореца* Усещам вятър в посока ${direction}, около ${speed} метра в секунда`,
        `Вън е ${temp} градуса, егати студа!`, (Note: When temperature is below 0 celsius)
        `${temp} градуса, как живеете вие в тая жега, добре че съм бот!`]*/
};

const setCommand = 'боте, запомни в ';
const logCommand = 'боте, кво запомни?';
const deleteCommand = 'боте, махни ';
let rgxSet = new RegExp("^(".concat(setCommand, ") *\w*"));
let rgxLog = new RegExp(`${logCommand}`);
let rgxDelete = new RegExp("^(".concat(deleteCommand, ") *\w*"));
let TodoListLog=[];

console.log("боте, запомни в баба си - си да",
"боте, кво запомни?","боте, махни баба си value");
 
let TodoList={};
let lowChanceResponseText=["да ъпгрейдна бота", "да си гледам работата!", "да спра да занимавам бота с глупости", "да си пусна новата песен на Криско"];

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

    if(windDirection>=0&&windDirection<=45)windDirection="север";
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
  function TODOfunctionHub(){
    if(rgxSet.test(input.value)){
        doFunction();
    }
    else if(rgxLog.test(input.value)){
        TodoListLog=[];
        logFunction(TodoList);
        writeFunction(TodoListLog);
    }
    else if(rgxDelete.test(input.value)){
        let item=((input.value).split(deleteCommand));
        item.shift(0,1);
        item=item.join();
        item=item.split(' ');
        deleteFunction(TodoList,item);
    }
}
function doFunction(){
    let splitValue=((input.value).split(" в "));
 
        splitValue.shift(0,1);
        splitValue=splitValue.join();
        splitValue=splitValue.split(' - ');
 
    let textValue=splitValue.splice(1,1);
 
        textValue=textValue.join();
        splitValue=splitValue.join();
        splitValue=splitValue.split(' ');
 
    if(Math.random()===Math.random()){
        textValue=lowChanceResponseText[Math.round(Math.random()*(lowChanceResponseText.length-1))];
    }
 
    nestingAdd(splitValue,TodoList,textValue);
    console.log(TodoList);
}
function nestingAdd(items,list,text){
    if(typeof items==='string'||items.length===0){
       if(!(Array.isArray(list.value))){
       list.value=[];
       }
       list.value.push(text);
       return
    }
    console.log(list);
    if(typeof list[`${items[0]}`]==='undefined'){
    list[`${items[0]}`]={};
    }
    let lastlist=items[0];
        items=items.filter((value,index)=>
            index>0
        );
        nestingAdd(items,list[`${lastlist}`],text);   
}
 
function logFunction(list){
    for (var childKey in list) {    
        if (typeof list[childKey] === 'object' &&
            !Array.isArray(list[childKey]) &&
            list[childKey] !== null) {
            if(typeof list[childKey].value!=='undefined'){
                if (list[childKey].value.length > 0) {
                    var currentValues = [];
                    currentValues.push(`${childKey}: ${list[childKey].value}`);
                    currentValues=currentValues.join();
                    TodoListLog.push(currentValues);
                }
            }
            logFunction(list[childKey]);
        }
    }
}
function writeFunction(list){
    for(i=0;i<list.length;i++){
        console.log(list[i]);
    }
}
function deleteFunction(list,items){
   for (var childKey in list) {   
        if (typeof list[childKey] === 'object' &&
            !Array.isArray(list[childKey]) &&
            list[childKey] !== null) {
            if(childKey===items[0]){
                if(typeof list[childKey].value!=='undefined'&& items[1]==='value'){
                    console.log(items[1]);
                    delete list[childKey].value
                }
                else if(items.length===1){
                    delete list[childKey];
                }
                items=items.filter((value,index)=>index>0);
            }
            deleteFunction(list[childKey],items);
        }
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
    else if(rgxSet.test(input.value)||rgxLog.test(input.value)||rgxDelete.test(input.value)){
        TODOfunctionHub()
    }
    else{

        randomNumber=Math.floor(Math.random()*(randomText.random.length));
        while(randomNumber===randomText.random.length||randomNumber===lastNumber){
            randomNumber=Math.floor(Math.random()*(randomText.random.length));
        }

        response.textContent=randomText.random[randomNumber];
        lastNumber=randomNumber;
    }
}

button.addEventListener('click', functionTree);
//боте, запомни в баба си - си да
//боте, кво запомни?
//боте, махни баба си value