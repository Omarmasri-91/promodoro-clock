let timer=document.getElementById("timer");
let duration=document.getElementById("duration");
let breakduration=document.getElementById("breakduration");
let controls=document.getElementById("controls");
let setsession=document.getElementById("setsession");
let setbreak=document.getElementById("setbreak");
let currenttimer=document.getElementById("currenttimer");
let controlbuttons=controls.querySelectorAll("button");
let timerbuttons=setsession.querySelectorAll("button");
let breakbuttons=setbreak.querySelectorAll("button");
let i=00;
let minutes=25;
let session=25;
let gotimer=0;
let timerswitch=1;
let breakswitch=0;
let breaktime=5;
let displayturn="Session";
timer.style.fontFamily="monospace";
timer.textContent=minutes+":0"+i;
duration.textContent=session;
breakduration.textContent=breaktime;
currenttimer.textContent=displayturn;
 
controlbuttons.forEach(function (button) {
button.addEventListener("click", controlTimer)
});

timerbuttons.forEach(function (button){
    button.addEventListener("click", setSession)
});
breakbuttons.forEach(function (button){
    button.addEventListener("click", setBreak)
});

function controlTimer(e){
    let pressed=e.srcElement.id;
    console.log(e.srcElement.id);
    if (pressed=="start" && (gotimer==0 || gotimer==99)) {
        gotimer=setInterval(timerFun, 1000);
        if (timerswitch==1) {timer.style.color="yellowgreen";}
        else if (breakswitch==1) {timer.style.color="orangered"}
    }
    else if (pressed=="pause") {
        clearInterval(gotimer);
        gotimer=99;
        timer.style.color="white";
    }
    else if (pressed=="stop") {
        clearInterval(gotimer);
        gotimer=0;
        minutes=session;
        timerswitch=1;
        breakswitch=0;
        i=0;
        displayturn="Session";
        timer.style.color="white";
        timer.textContent=minutes+":0"+i;
        currenttimer.textContent=displayturn;
    }
    else if (pressed=="reset") {
        clearInterval(gotimer);
        gotimer=0;
        timerswitch=1;
        breakswitch=0;
        i=0;
        session=25;
        minutes=session;
        breaktime=5;
        displayturn="Session";
        timer.style.color="white";
        timer.textContent=minutes+":0"+i;
        duration.textContent=session;
        breakduration.textContent=breaktime;
        currenttimer.textContent=displayturn;
    }
};

function setSession(e){
    let pressed=e.srcElement.id;
    console.log(e.srcElement.id);
    if (gotimer==0){
        if (pressed=="increase") {
            session+=1;
            minutes=session;
        }
        else if (pressed="decrease") {
            if (session==1){return}
            else {
                session-=1;
                minutes=session;
            };
        }
        duration.textContent=session;
        timer.textContent=minutes+":0"+i;
    }
};

function setBreak(e){
    let pressed=e.srcElement.id;
    console.log(e.srcElement.id);
    if (gotimer==0){
        if (pressed=="increasebreak") {
            breaktime+=1;
            minutes=breaktime;
        }
        else if (pressed=="decreasebreak") {
            if (breaktime==1){return}
            else {
                breaktime-=1;
                minutes=breaktime;
            };   
        }
        breakduration.textContent=breaktime;
    }
};
function timerFun(){
    if (i<10){timer.textContent=minutes+":0"+i;}
    else {timer.textContent=minutes+":"+i;}
    currenttimer.textContent=displayturn;
    i--;
    if (i<0 && minutes<=0){
        if (timerswitch==1){
            i=59;
            timerswitch=0;
            minutes=breaktime-1;
            breakswitch=1;
            displayturn="Break";
            timer.style.color="orangered";
        }
        else if (breakswitch==1){
            i=59;
            breakswitch=0;
            minutes=session-1;
            timerswitch=1;
            displayturn="Session";
            timer.style.color="yellowgreen";
        }
    }
    else if (i<0 && minutes>0) {
        minutes--;
        i=59;
    }
};
