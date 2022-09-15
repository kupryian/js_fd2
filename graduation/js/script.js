    //== описание переменных
    const field = document.getElementById("field"); //== поле
    
    const tapBoxLeft = document.getElementsByClassName("tapBoxleft"); //== массив блоков левой дорожки
    const tapBoxCenter = document.getElementsByClassName("tapBoxCenter"); //== массив блоков центральной дорожки
    const tapBoxRight = document.getElementsByClassName("tapBoxRight"); //== массив блоков правой дорожки
    const finalBox = document.getElementById("final_box"); //== последний блок (для завершения)
    
    const allBoxes = document.getElementsByClassName("tapBoxes"); //== все блоки
    const testZone = document.getElementById("testzone"); //== окно калибровки
    const radioCalibr = document.getElementsByName("radioCalibr"); //== радиокноки
    let checkedRadio; //== нажатая радиокнопка

    const btnLeft = document.querySelector('[class="btnLeft"]'); //== левая кнопка пуш для мобильного
    const btnCenter = document.querySelector('[class="btnCenter"]'); //== центральная кнопка пуш для мобильного
    const btnRigth = document.querySelector('[class="btnRigth"]'); //== правая кнопка пуш для мобильного

    const minus1 = document.getElementById("minus1"); //== очки вывод на экран
    const plus1 = document.getElementById("plus1"); //== очки вывод на экран
    const plus3 = document.getElementById("plus3"); //== очки вывод на экран
    const plus7 = document.getElementById("plus7"); //== очки вывод на экран
    const howMuchScore = document.getElementById("howMuchScore"); //== очки вывод на экран

    // const zoneScore = document.getElementById("zoneScore");

    let score = 0; //== очки
    let comboScore = 0; //== есть ли комбо
 
    let timer; //== таймер

    //музыка
    const audio = document.getElementById("track_rock");
    audio.loop = false;
    const soundCombo = document.getElementById("sound_combo");
    soundCombo.loop = false;
  
//=====вспомогательные функции

    //=====функция смены координаты у бокса 

    function boxChangeCoor(tapBoxSide) {
        for (let i = 0; i< tapBoxSide.length; i++) {
            //== перебираем боксы опускаем вних на 3 пикселя
            tapBoxSide[i].style.top = parseInt(tapBoxSide[i].style.top.split("px").join("")) +3 +"px";
            //== если бокс набрал координату 540 (после поля нажатия) и он не зеленый (не нажат правильно) снимаем балл
            if ((+tapBoxSide[i].style.top.split("px").join("") ) == 540 && tapBoxSide[i].style.backgroundColor !== "rgb(83, 216, 132)"  ) {
                score -= 1;
                animateScore(minus1);
                comboScore = 0;
            }
            //== если три правильно подряд то меняем стиль
            if (comboScore == 3 ) {
                soundCombo.play();
                tapBoxSide[i].classList.remove("combo0");
                tapBoxSide[i].classList.add("combo3");
            //== если семь то тоже    
            } else if (comboScore == 7 ) {
                soundCombo.play();
                tapBoxSide[i].classList.remove("combo3");
                tapBoxSide[i].classList.add("combo7")
            //== если комбо не собрано то по умолчанию стиль
            } else if (comboScore == 0 ) {
                tapBoxSide[i].classList.remove("combo7");
                tapBoxSide[i].classList.remove("combo3");
                tapBoxSide[i].classList.add("combo0");

            } else {}
        }
    }
    //=== анимация очков (просто увеличиваются в размере когда изменяются)
    function animateScore(whatScore) {
        whatScore.animate([
                    { transform: "scale(1.5, 1.5)" },
                    { transform: "scale(1, 1)" }
                  ], {
                    duration: 200,
                    iterations: 1
                  })
    }

    //калибровка
    function showCalibr() {
        testZone.style.display = "block"
    }

    function calibr() {
        let howMuchPx = +document.querySelector('input[name="howMuchPx"]').value;
        for (let k of radioCalibr) {
            if (k.checked) {
                checkedRadio = k.value;
            }
        }
        if (checkedRadio == "plus coordinats") {
            for (let i = 0; i < allBoxes.length; i ++) {
                allBoxes[i].style.top = parseInt(allBoxes[i].style.top.split("px").join("")) + howMuchPx + "px";
            } 
        } else {
            for (let i = 0; i < allBoxes.length; i ++) {
                allBoxes[i].style.top = parseInt(allBoxes[i].style.top.split("px").join("")) - howMuchPx + "px";
            } 
        }
        testZone.style.display = "none";
    }

    //=== стоп игра

    function stop() {
        audio.pause();
        clearInterval(timer);
    }
 
//-------начало основной программы

    function startGame () {
        timer=setInterval(moveBox,30);

        function moveBox () {

            audio.play();
            //== вписываем очки на страницу
            howMuchScore.innerHTML = score;
            //== гоним кубики в функцию движения
            boxChangeCoor (tapBoxLeft);
            boxChangeCoor (tapBoxCenter);
            boxChangeCoor (tapBoxRight);
            //== когда финальный кубик ушел за границу - конец
            if (finalBox.style.top.split("px").join("") > 700) {
                stop();
            }
        }
    }


    // логика действий по нажатию на клавишу

    function keyPres(tapBoxSide) {
        for (let i =0; i< tapBoxSide.length; i++) {
            //== если нажать на блок в нужных коордитанах когда он будет он загорается зеленым
            if ( (+tapBoxSide[i].style.top.split("px").join("") ) > 450 && (+tapBoxSide[i].style.top.split("px").join("") ) <470 ) {     
                tapBoxSide[i].style.backgroundColor = "rgb(83, 216, 132)";

                //== проверка сколько очков в комбо, если по условию то увеличиваем очки на комбо
                if (comboScore >=7 ) {
                    score += 7;
                    animateScore(plus7);  
                } else if (comboScore >= 3) {
                    score += 3;
                    animateScore(plus3);
                } else {
                    score += 1;
                    animateScore(plus1);
                }
                //== каждое успешное нажатие подряд увеличивает комбо на 1
                comboScore += 1;
                   
            } else if ( (+tapBoxSide[i].style.top.split("px").join("") ) > 410 && (+tapBoxSide[i].style.top.split("px").join("") ) <449 ) {     
                //== если игрок нажал чуть выше или ниже зоны - блок горит красным, снимается 1 очко, обнуляется комбо
                tapBoxSide[i].style.backgroundColor = "#FF0909";
                comboScore = 0;
                score -= 1;
            } else if ( (+tapBoxSide[i].style.top.split("px").join("") ) > 471 && (+tapBoxSide[i].style.top.split("px").join("") ) <510 ) {     

                tapBoxSide[i].style.backgroundColor = "#FF0909";
                comboScore = 0;
                score -= 1;
            };
        };
    }

    //слушатель события нажатия клавиш

    window.addEventListener("keydown", e => {
        switch (e.keyCode) {
            //== по нажатию отправляем соответствующий массив боксов на проверку (левый, правый или центральный)
            case 37: keyPres(tapBoxLeft);
            break;

            case 40: keyPres(tapBoxCenter);
            break;

            case 39: keyPres(tapBoxRight);
            break;

        }
    } );

    //== слушатель для мобильного (когда палец нажал добавляем фон, убрали - сняли фон, 
    //массив как и у кнопок отправляем в функцию проверку)

    btnRigth.addEventListener("pointerdown", e => {
       keyPres(tapBoxRight);
       btnRigth.style.backgroundColor = 'rgba(132, 247, 109, 0.61)';
    } );
    btnCenter.addEventListener("pointerdown", e => {
        keyPres(tapBoxCenter);
        btnCenter.style.backgroundColor = 'rgba(132, 247, 109, 0.61)';
     } );
     btnLeft.addEventListener("pointerdown", e => {
        keyPres(tapBoxLeft);
        btnLeft.style.backgroundColor = 'rgba(132, 247, 109, 0.61)';
     } );
     btnRigth.addEventListener("pointerup", e => {
        btnRigth.style.backgroundColor = "";
     } );
     btnCenter.addEventListener("pointerup", e => {
        btnCenter.style.backgroundColor = "";
     } );
     btnLeft.addEventListener("pointerup", e => {
        btnLeft.style.backgroundColor = "";
     } );