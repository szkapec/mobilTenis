const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let wyniki = document.querySelector('.wyniki')
let wyniki2 = document.querySelector('.wyniki2')

let gr1 = 0;
let gr2 = 0;

canvas.width = 250;
canvas.height = 125;

const cw = canvas.width;
const ch = canvas.height;
const pilka = 5; 
let pilkaX = cw/2 - pilka/2;
let pilkaY = ch/2 - pilka/2;

//paletki 
const paletkaHeight = 25;
const paletkaWidth = 5;
const graczX = 17.5;
const aiX = 227.5;
let graczY = 50;
let aiY = 50;

//linie
const liniaWidth = 1.5;
const liniaHeight = 4;


let szybkoscPilkiX = -2; //kierunki itd
let szybkoscPilkiY = 2;

function gracz() { 
    ctx.fillStyle = "green";
    ctx.fillRect(graczX , graczY, paletkaWidth, paletkaHeight );
 }

 function AI() {
    ctx.fillStyle = "green";
    ctx.fillRect(aiX , aiY, paletkaWidth, paletkaHeight );
 }

function ball() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(pilkaX , pilkaY, pilka, pilka); //na poczatku jest na srodku

    pilkaX += szybkoscPilkiX;
    pilkaY += szybkoscPilkiY;

    if(pilkaY <= 0 || pilkaY+pilka>= ch) // __ 
    {
        szybkoscPilkiY = -szybkoscPilkiY;
        przyspieszenie()
    }
    if(pilkaX <= 6 && pilkaX >= -2)
    {
        gr2++;
        wyniki2.innerHTML = `Wynik: ${gr2}`;
        pilkaX = cw/2 - pilka/2;
        pilkaY = ch/2 - pilka/2;
        szybkoscPilkiX = 1; //kierunki itd
        szybkoscPilkiY = 2;
    }
    if(pilkaX >= cw- pilka+5) {
        gr1++;
        wyniki.innerHTML = `Wynik: ${gr1}`;

        pilkaX = cw/2 - pilka/2;
        pilkaY = ch/2 - pilka/2;
        szybkoscPilkiX = 2; //kierunki itd
        szybkoscPilkiY = 1;
    }

    if(graczY < pilkaY && graczY + 25 > pilkaY && pilkaX <= 20) {
        szybkoscPilkiX = -szybkoscPilkiX;
        przyspieszenie()

    }
    if(aiY < pilkaY && aiY + 25 > pilkaY && pilkaX >= 225) {
        szybkoscPilkiX = -szybkoscPilkiX;
        przyspieszenie()

    }
}
let topCanvas = canvas.offsetTop;

canvas.addEventListener('mousemove', function(event) {
    graczY = event.clientY - topCanvas - paletkaHeight/2 ;
    
    if(graczY<0) {
        graczY = 0;
       
    }
    if (graczY > ch -paletkaHeight ) {
        graczY = ch -paletkaHeight ;
       
    }

    // aiY = graczY;
});

function table() {
    //stol
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cw,ch);
    //paski
    for(let pozycjaLini = 5; pozycjaLini < ch; pozycjaLini +=7.5)
    {
        ctx.fillStyle = "grey";
        ctx.fillRect(cw/2 - liniaWidth/2, pozycjaLini, liniaWidth, liniaHeight);  //x=1000/2 - 6/2, y=20 >> 50 >> 80... 
    }

}

function przyspieszenie() {

    //predkosc x
    if(szybkoscPilkiX > 0 && szybkoscPilkiX < 16) {
        szybkoscPilkiX += .4;
    }
    else if (szybkoscPilkiX < 0 && szybkoscPilkiX > -16)
    {
        szybkoscPilkiX -= .4;
    }
    //predkosc Y
    if(szybkoscPilkiY > 0 && szybkoscPilkiY < 16) {
        szybkoscPilkiY += .2;
    }
    else if (szybkoscPilkiY < 0 && szybkoscPilkiY > -16)
    {
        szybkoscPilkiY -= .2;
    }
}

function aiPosition() {
let srodekRakietki = aiY + paletkaHeight/2;

let srodekPilki = pilkaY + pilka/2;
    if(pilkaX > 125) {
        
        if(srodekRakietki  - srodekPilki > 25) {
            //console.log(">+200")
            aiY -= 10
        }
        else if(srodekRakietki  - srodekPilki > 5) {
            //console.log("+50-200")
            aiY -= 15
        }
        else if(srodekRakietki  - srodekPilki < -25) {
            //console.log("<-200")
            aiY += 10
        }
        else if(srodekRakietki  - srodekPilki < -5) {
            //console.log("-50-(-200)")
            aiY += 15
        }
        
    }

    else if(pilkaX <= 125 && pilkaX > 37.5) {
        if(srodekRakietki  - srodekPilki > 100) {
            aiY -= 14
        }
        else if (srodekRakietki  - srodekPilki < -25) {
            aiY += 14
        }
    }

}

function game() {
    table();
    ball();
    gracz();
    AI();
    aiPosition();
}

game();
setInterval(game, 1000/60); //20x na sekunde

