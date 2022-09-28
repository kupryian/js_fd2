    //== описание переменных
    const field = document.getElementById("field"); //== поле
    
    const tapBoxLeft = document.getElementsByClassName("tapBoxleft"); //== массив блоков левой дорожки
    const tapBoxCenter = document.getElementsByClassName("tapBoxCenter"); //== массив блоков центральной дорожки
    const tapBoxRight = document.getElementsByClassName("tapBoxRight"); //== массив блоков правой дорожки
    const finalBox = document.getElementById("final_box"); //== последний блок (для завершения)
    
    const allBoxes = document.getElementsByClassName("tapBoxes"); //== все блоки
    const testZone = document.getElementById("testzone"); //== окно калибровки
    const radioCalibr = document.getElementsByName("radioCalibr"); //== радиокноки
    let checkedRadio = window.localStorage.getItem('calibrSide'); //== нажатая радиокнопка
    let howMuchPx = +window.localStorage.getItem('calibrPX'); //== насколько пикселей сместить при калибровке

    const btnLeft = document.querySelector('[class="btnLeft"]'); //== левая кнопка пуш для мобильного
    const btnCenter = document.querySelector('[class="btnCenter"]'); //== центральная кнопка пуш для мобильного
    const btnRigth = document.querySelector('[class="btnRigth"]'); //== правая кнопка пуш для мобильного

    const minus1 = document.getElementById("minus1"); //== очки вывод на экран
    const plus1 = document.getElementById("plus1"); //== очки вывод на экран
    const plus3 = document.getElementById("plus3"); //== очки вывод на экран
    const plus7 = document.getElementById("plus7"); //== очки вывод на экран
    const howMuchScore = document.getElementById("howMuchScore"); //== очки вывод на экран

    let playerName; //==имя игрока
    let objRecords = [//== тут база рекордов
        {name: "Чувак",
        points: 500},
        {name: "Кто-то",
        points: 300},
        {name: "Иван",
        points: 100},
        {name: "Новичек",
        points: 50},
        {name: "Дровосек",
        points: 250},
        {name: "Страшила",
        points: 99},
        {name: "Петров",
        points: 450},
        {name: "Player3000",
        points: 20},
        {name: "Неизвестный",
        points: -100}
    ];
    let jsonRecords; //== для перевода рекордов в локалсторедж
    const recordUl = document.getElementById("recordUl"); //== сюда формируются строки имен победителей и их очки в рекордах

    let score = 0; //== очки
    let comboScore = 0; //== есть ли комбо
 
    let timer; //== таймер

    //музыка
    const audio = document.getElementById("track_rock");
    audio.loop = false;
    const soundCombo = document.getElementById("sound_combo");
    soundCombo.loop = false;

    //== мобильная адаптация размеров блоков
    let mobScreeen = window.screen.width;
        
        if (mobScreeen<600) {
            for (let i = 0; i< tapBoxLeft.length; i++) {
                tapBoxLeft[i].style.left = (mobScreeen/3)/10 + "px";
                tapBoxLeft[i].style.width = (mobScreeen/3)/10*8 + "px";
            }
            for (let i = 0; i< tapBoxCenter.length; i++) {
                tapBoxCenter[i].style.left = (mobScreeen/3)/10+mobScreeen/3 + "px";
                tapBoxCenter[i].style.width = (mobScreeen/3)/10*8 + "px";
            }
            for (let i = 0; i< tapBoxRight.length; i++) {
                tapBoxRight[i].style.left = (mobScreeen/3)/10+(mobScreeen/3)*2 + "px";
                tapBoxRight[i].style.width = (mobScreeen/3)/10*8 + "px";
            }
            btnLeft.style.width = (mobScreeen/3) + "px";
            btnCenter.style.left = (mobScreeen/3) + "px";
            btnCenter.style.width = (mobScreeen/3) + "px";
            btnRigth.style.left = (mobScreeen/3)+(mobScreeen/3) + "px";
            btnRigth.style.width = (mobScreeen/3) + "px";
        }

//=====вспомогательные функции

    //== условие для начала игры - заполненый инпут с именем
    
    function checkName () {
        playerName = document.querySelector('input[name="yourName"]').value;
        if (playerName) startNewGame()
    }

    //=====функция смены координаты у бокса 
    function boxChangeCoor(tapBoxSide) {
        for (let i = 0; i< tapBoxSide.length; i++) {
            //== перебираем боксы опускаем вних на 3 пикселя
            tapBoxSide[i].style.top = parseInt(tapBoxSide[i].style.top.split("px").join("")) +3 +"px";
            //== если бокс набрал координату 540 (после поля нажатия) и он не зеленый (не нажат правильно) снимаем балл и комбо 0
            if ((+tapBoxSide[i].style.top.split("px").join("") ) >= 540 && (+tapBoxSide[i].style.top.split("px").join("") ) <= 542 && tapBoxSide[i].style.backgroundColor !== "rgb(83, 216, 132)"  ) {
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
    //=== если игрок нажал чуть выше или ниже зоны - блок горит красным, снимается 1 очко, обнуляется комбо
    function badToch(TapBoxSide) {
        TapBoxSide.style.backgroundColor = "#FF0909";
        comboScore = 0;
        score -= 1
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
    //=== нажатие на мобильном (смена стиля)
    function mobilePres(whatBtn) {
        whatBtn.style.backgroundColor = 'rgba(132, 247, 109, 0.61)';
        window.navigator.vibrate(20)
    }
    function mobileUnPres(whatBtn) {
        whatBtn.style.backgroundColor = "";
    }

    //== сбор начальниых координат 
    const boxCoorArr = [];
    for (let i = 0; i < allBoxes.length; i ++) {
        boxCoorArr.push(allBoxes[i].style.top)
    } 
    window.localStorage.setItem('boxCoorArr', boxCoorArr)

    //калибровка
    function showCalibr() {
        testZone.style.display = "block";
        if (window.localStorage.getItem('calibrPX')) {
            document.querySelector('input[name="howMuchPx"]').value = howMuchPx;
        } else {
            howMuchPx = document.querySelector('input[name="howMuchPx"]').value;
        }
    }

    function calibr() {
        
            howMuchPx = +document.querySelector('input[name="howMuchPx"]').value;
            // for (let k of radioCalibr) {
            //     if (k.checked) {
            //         checkedRadio = k.value;
            //     }
            // }

        testZone.style.display = "none";
        window.localStorage.setItem('calibrPX', howMuchPx);
        // window.localStorage.setItem('calibrSide', checkedRadio);
        stop();
        audio.currentTime = 0;
        startNewGame();
    }

    //=== стоп игра
    function stop() {
        audio.pause();
        clearInterval(timer);
    }
    
    //== конец игры

    const overDiv = document.querySelector('div[class="overDiv"]');

    function gameOver () {
        overDiv.style.display = "block";
        document.getElementById("showScoreOver").innerHTML = score;
    }

    //== показать рекорды 
    const divRecords = document.querySelector('div[class="records"]');
    function records () {
        // localStorage.removeItem('jsonRecords')
        objRecords = JSON.parse(window.localStorage.getItem('jsonRecords'));
        objRecords.push({ //==добавляем свой результат
            name: playerName,
            points: score
        })
        objRecords.sort((prev, next) => next.points-prev.points); //== сортируем по очкам;
        jsonRecords = JSON.stringify(objRecords);
        window.localStorage.setItem('jsonRecords',jsonRecords);
        divRecords.style.display = "block"

        let jsonDone = JSON.parse(window.localStorage.getItem('jsonRecords'));
        recordUl.innerHTML = "";
        for( let i =0; i< 10; i++) {
            
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(`${jsonDone[i].name} : ${jsonDone[i].points}`) )
            console.log(li)
            recordUl.appendChild(li)  
        }

    }

    //перезапуск игры 
    const startScreen = document.querySelector('div[class="start"]');
    function startNewGame() {
        overDiv.style.display = "none"
        divRecords.style.display = "none"
        startScreen.style.display = "none"
        for (let i = 0; i < allBoxes.length; i ++) { //==сброс стилей для блоков после игры
            allBoxes[i].style.top = boxCoorArr[i];
            allBoxes[i].style.backgroundColor = "";
        }
        score = 0;
        comboScore = 0;
    }
 
//-------начало основной программы
    function startGame () {
        //===калибровка
        // if (window.localStorage.getItem('calibrSide') == "plus coordinats") {
            for (let i = 0; i < allBoxes.length; i ++) {
                allBoxes[i].style.top = parseInt(allBoxes[i].style.top.split("px").join("")) + howMuchPx + "px";
            } 
        // } else {
        //     for (let i = 0; i < allBoxes.length; i ++) {
        //         allBoxes[i].style.top = parseInt(allBoxes[i].style.top.split("px").join("")) - howMuchPx + "px";
        //     } 
        // }
        //===конец калибровки
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
                window.localStorage.setItem('Score', score);
                gameOver();       
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
            //== если нажать рядом с зоной не не в ней - будет минус очка и красный кубик       
            } else if ( (+tapBoxSide[i].style.top.split("px").join("") ) > 410 && (+tapBoxSide[i].style.top.split("px").join("") ) <449 ) {     
                badToch(tapBoxSide[i]);
            } else if ( (+tapBoxSide[i].style.top.split("px").join("") ) > 471 && (+tapBoxSide[i].style.top.split("px").join("") ) <510 ) {     
                badToch(tapBoxSide[i]);
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
       mobilePres(btnRigth);
    } );
    btnCenter.addEventListener("pointerdown", e => {
        keyPres(tapBoxCenter);
        mobilePres(btnCenter);
     } );
     btnLeft.addEventListener("pointerdown", e => {
        keyPres(tapBoxLeft);
        mobilePres(btnLeft);
     } );
     btnRigth.addEventListener("pointerup", e => {
        mobileUnPres(btnRigth);
     } );
     btnCenter.addEventListener("pointerup", e => {
        mobileUnPres(btnCenter);
     } );
     btnLeft.addEventListener("pointerup", e => {
        mobileUnPres(btnLeft);
     } );
