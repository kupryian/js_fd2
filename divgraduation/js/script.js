var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

const field = new Image();
field.src = "source/img/field.png";

const tapZone = new Image();
tapZone.src = "source/img/zonedone.png";

const done = new Image();
done.src = "source/img/done.png";

let timer;
// let seconds;
let startDate;
// let endDate;
let endDate2;
let y = 0;
let arr1 = []
let arr = [{img: "source/img/done.png",coor:0},{img: "source/img/done.png",coor:-51},{img: "source/img/done.png",coor:-102},{img: "source/img/done.png",coor:-153},{img: "source/img/done.png",coor:-204},{img: "source/img/done.png",coor:-255},{img: "source/img/done.png",coor:-306},{img: "source/img/done.png",coor:-357},{img: "source/img/done.png",coor:-408},{img: "source/img/done.png",coor:-459},{img: "source/img/done.png",coor:-510},{img: "source/img/done.png",coor:-561},{img: "source/img/done.png",coor:-612},{img: "source/img/done.png",coor:-663},{img: "source/img/done.png",coor:-714},{img: "source/img/done.png",coor:-765},{img: "source/img/done.png",coor:-816},{img: "source/img/done.png",coor:-867},{img: "source/img/done.png",coor:-918},{img: "source/img/done.png",coor:-969},{img: "source/img/done.png",coor:-1020},{img: "source/img/done.png",coor:-1071},{img: "source/img/done.png",coor:-1122},{img: "source/img/done.png",coor:-1173},{img: "source/img/done.png",coor:-1224}]

function start () {
   startDate = new Date();
    timer=setInterval(drawGame,16,6666667);
    
    function drawGame() {
        ctx.drawImage(field, 0, 0);
        ctx.drawImage(tapZone, -2, 500);

        for (let i = 0; i < arr.length; i++) {
            let imgDone = new Image();
            endDate2 = new Date()
            imgDone.src = arr[i].img;
            arr[i].coor += 3;
            ctx.drawImage(imgDone, 20, arr[i].coor);   
        }
        
        y +=1;

        console.log((endDate2.getTime() - startDate.getTime()) / 1000);

        if ((endDate2.getTime() - startDate.getTime()) / 1000 > 3 ) {
            clearInterval(timer);
        } else {
            y=0;
        } 
    }
}
start();


// function newStart () {

//     startDate = new Date();
//  function drawGame() {
//      ctx.drawImage(field, 0, 0);
//      ctx.drawImage(tapZone, -2, 500);
 
 
//      for (let i = 0; i < arr1.length; i++) {
//          let imgDone = new Image();
//          imgDone.src = arr1[i].img;
//          arr1[i].coor += 1
//          ;
//          ctx.drawImage(imgDone, 20, arr1[i].coor);
         
 
//          // console.log(arr[0].coor)
 
//      }
//      y +=1;
//      // console.log(arr[0].coor);
//     //  if (y>=1500) {
//     //     window.cancelAnimationFrame();
//     //     y=0;
//     //     }
 
//      requestAnimationFrame(drawGame);
//  }
//  requestAnimationFrame(drawGame);
 
//  }
 

// function keyPres () {
//     // endDate   = new Date();
//     // seconds = (endDate.getTime() - startDate.getTime()) / 1000;
//     // console.log(seconds);

//     arr1.push({img: "source/img/done.png",coor:seconds*(-60)});

//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].coor > 500 && arr[i].coor < 600) {
//             arr[i].img = "source/img/undone.png";
//         }
//     }

// }


// window.addEventListener("keydown", e => {
//     switch (e.keyCode) {
//         //== по нажатию отправляем соответствующий массив боксов на проверку (левый, правый или центральный)
//         case 37: keyPres();
//         break;
//         // case 39: newStart();
//         // break;

//         // case 40: keyPres(tapBoxCenter);
//         // break;

//         // case 39: keyPres(tapBoxRight);
//         // break;

//     }
// } );