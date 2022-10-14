let randomNumber;
let lastNumber;
let thisTextList;
let input = document.getElementById('input');
let response = document.querySelector('.output');
const button = document.querySelector('.button');
const clearButton=document.querySelector('.clearButton');
let items=JSON.parse(localStorage.getItem('items'))||'';
response.innerText=items;
//set text
const setText = {
    setHello:["хеллоу","hi","драсте"],
    setLike:["i like","аз обичам","аз харесвам"],
    setTime:["колко е часа?","час","време","hour"],
    setWeather:["weather","прогноза","вали","градус","ракия","сняг","дъжд"]
};
//responding text
const randomText = {
    greeting:["Hey, I'm bot", "Здрастииии","Добро утроо","Heya!"],
    hello:["Hey, I'm bot", "Здрастииии","Добро утроо","Heya!","from the other side","is it me you are looking for?"],
    like:["Кондьо", "Джена" ,"Джорджано", "Гери и Никол"],
    random:["Did I mention that you speak Bulgarian?","Oh my!","", "Yeah dude, I feel that..","That's a weird thing to say,",""]};

const setCommand = 'боте, запомни в ';
const logCommand = 'боте, кво запомни?';
const deleteCommand = 'боте, махни ';
let rgxSet = new RegExp("^(".concat(setCommand, ") *\w*"));
let rgxLog = new RegExp(`${logCommand}`);
let rgxDelete = new RegExp("^(".concat(deleteCommand, ") *\w*"));
let TodoListLog=[];
 
let TodoList=JSON.parse(localStorage.getItem('TodoList'))||{};
let lowChanceResponseText=["да ъпгрейдна бота", "да си гледам работата!", "да спра да занимавам бота с глупости", "да си пусна новата песен на Криско"];

function writeOutputFunction(list){
       randomNumber=Math.round(Math.random()*list.length);
        while(randomNumber===list.length || randomNumber===lastNumber){
            randomNumber=Math.round(Math.random()*list.length);
        }
            items=items.concat(`\n${list[randomNumber]}`);
            response.innerText=items;
            localStorage.setItem('items',JSON.stringify(items));
            lastNumber=randomNumber;
}

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

    if(hour<10)hour=`0${hour}`;
    if(minutes<10)minutes=`0${minutes}`;
    
    if(trolHour<10)trolHour=`0${trolHour}`;
    if(trolMinutes<10)trolMinutes=`0${trolMinutes}`;
    
    let actualTime=`${hour}:${minutes}`;
    let trolTime=`${trolHour}:${trolMinutes}`;
    
    let time=[`Шес бес десет, няма бе, ${actualTime} е..`,`абе май е ${trolTime}`,
    `Ако умножиш ${X} по ${Y} ще получиш unix timestamp, който лесно можеш сам да си пресметнеш и да получиш текущата дата`];
    
    if(actualTime==='05:50'||actualTime==='17:50'){
        time[0]='Шес бес десет е!!!';
    }
    writeOutputFunction(time)
}

function weatherFunction(){ 
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Varna&lang=bg&APPID=5637a28789778bf15860cef0c6d5e947')
.then(response=>response.json())
.then(data => {
    console.log(data);
        logTemp(data);
})
.catch(error=>alert("Somethings wrong I can feel it"));


function logTemp(data){
    let temp=data['main']['temp'];  
    let windSpeed=data['wind']['speed'];
    let windDirection=data['wind']['deg'];
    let weatherCondition=data['weather'][0]['description'];
    let weatherDescription=data['weather'][0]['main'];

    if(windDirection>=0&&windDirection<=45)windDirection="север";
    else if(windDirection>45&&windDirection<=90)windDirection="северо-изток";
    else if(windDirection>90&&windDirection<=135)windDirection="изток";
    else if(windDirection>135&&windDirection<=180)windDirection="юго-изток";
    else if(windDirection>180&&windDirection<=225)windDirection="юг";
    else if(windDirection>225&&windDirection<=270)windDirection="юго-запад";
    else if(windDirection>270&&windDirection<=315)windDirection="запад";
    else if(windDirection>315&&windDirection<=360)windDirection="северо-запад";
    
    temp=Math.round(temp-273.15);
    
    let weather=[ 
        `weather condition is ${weatherDescription}`,
        `За тези, които ги мързи да погледнат през прозореца - вън е ${weatherCondition}`,
        `*Наплюнчва пръст и го показва през прозореца* Усещам вятър в посока ${windDirection}, около ${windSpeed} метра в секунда`,
        `Навън е ${temp} градуса`
    ];

    if(temp<=0){
        weather[weather.length-1]=`Вън е ${temp} градуса, егати студа!`;
    }
    if(temp>=30){
        weather[weather.length-1]=`${temp} градуса, как живеете вие в тая жега, добре че съм бот!`;
    }
    writeOutputFunction(weather);
}
    
}
  function TODOfunctionHub(){
    if(rgxSet.test((input.value).toLowerCase())){
        doFunction();
        localStorage.setItem('TodoList',JSON.stringify(TodoList));
    }
    else if(rgxLog.test((input.value).toLowerCase())){
        TodoListLog=[];
        logFunction(TodoList);
        writeFunction(TodoListLog);
    }
    else if(rgxDelete.test((input.value).toLowerCase())){
        let item=((input.value).split(deleteCommand));
        item.shift(0,1);
        item=item.join();
        item=item.split(' ');
        deleteFunction(TodoList,item);
        localStorage.setItem('TodoList',JSON.stringify(TodoList));
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
 
    if(Math.round(Math.random()*10)===10){
        textValue=lowChanceResponseText[Math.round(Math.random()*(lowChanceResponseText.length-1))];
    }
    nestingAdd(splitValue,TodoList,textValue);
}
function nestingAdd(items,list,text){
    if(items.length===1){
        thisTextList=items[0];
    }
    if(typeof items==='string'||items.length===0){
       if(!(Array.isArray(list.value))){
       list.value=[];
       }
        response.innerText=`successfuly added *${text}* to *${thisTextList}*`;
        list.value.push(text);
        return
    }
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
        items=items.concat(`\n${list[i]}`);
        response.innerText=items;
        localStorage.setItem('items',JSON.stringify(items));
    }
}

function deleteFunction(list, itemsList) {
    for (var childKey in list) {
        if (typeof list[childKey] === 'object' &&
            !Array.isArray(list[childKey]) &&
            list[childKey] !== null) {
            if (childKey === itemsList[0]) {
                if (typeof list[childKey].value !== 'undefined' && typeof parseInt(itemsList[1]) === 'number') {
                    itemsList[1] = parseInt(itemsList[1]);
                    if (typeof itemsList[1] === 'number') {
                        console.log(itemsList[1])
                            if(itemsList[1]!==itemsList[1])itemsList[1]=""
                        response.innerText=`\ndeleted ${childKey} ${itemsList[1]} value`;
                        list[childKey].value = list[childKey].value.filter((value, index) => index === [itemsList[1] - 1]);
                    }
                    else {
                        response.innerText=`\ndeleted ${childKey} value`;
                        delete list[childKey].value;
                    }
                }
                else if (itemsList.length === 1) {
                    delete list[childKey];
                }
                itemsList = itemsList.filter((value, index) => index > 0);
            }
            deleteFunction(list[childKey], itemsList);
        }
    }
}

function functionTree() {
    if(setText.setHello.includes((input.value).toLowerCase())){
        writeOutputFunction(randomText.greeting);
    }
    else if(input.value==="Hello"){
       writeOutputFunction(randomText.hello);
    }
    else if(setText.setLike.includes((input.value).toLowerCase())){
        writeOutputFunction(randomText.like);
    }
    else if(setText.setTime.includes((input.value).toLowerCase())){
        timeFunction();
    }
    else if(setText.setWeather.includes((input.value).toLowerCase())){
        weatherFunction();
    }
    else if(rgxSet.test((input.value).toLowerCase())||
            rgxLog.test((input.value).toLowerCase())||
            rgxDelete.test((input.value).toLowerCase())){
        TODOfunctionHub()
    }
    else{
        writeOutputFunction(randomText.random);
    }
}

function clearInputFunction(){
    items="";
    response.innerText="";
}

button.addEventListener('click',functionTree);
clearButton.addEventListener('click',clearInputFunction);
input.addEventListener('keypress',function(event){
    if (event.key === "Enter") {
        functionTree();
    }
});