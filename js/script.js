const winFields = [
    [1, 5, 9], [3, 5, 7],             //d_lines 
    [1, 2, 3], [4, 5, 6], [7, 8, 9], //h_lines
    [3, 6, 9], [2, 5, 8], [1, 4, 7] //v_lines
];

const gameField = document.querySelectorAll(".field");
const winLine = document.querySelectorAll(".win_line");

const classField = ".field";
const classCross = " > .cross";
const classZero = " > .zero";

let arrow = document.getElementById("arrow");
let rotateArrow = 1;
let player = 1;


function paintCross(ariaValueText) {
    let cross = classField.slice(0, classField.length) + ariaValueText + classCross;
    document.querySelector(cross).style.display = "block";
}

function paintZero(ariaValueText) {
    let zero = classField.slice(0, classField.length) + ariaValueText + classZero;
    document.querySelector(zero).style.display = "block";
}

function playerCrossIsWin() {
    let crossField;
    let crossDisplay = [];
    let numWinField = 0;
    let count = 0;
    
    for (let i = 0; i < gameField.length; i++) {

        crossField = classField + (i + 1) + classCross; 

        if (document.querySelector(crossField).style.display == "block") {
            crossDisplay.push(i + 1);
        }
    }

    for (let i = 0; i < winFields.length; i++) {
        
        for (let j = 0; j < crossDisplay.length; j++) {

            winFields[i].includes(crossDisplay[j]) ? count++ : count;

        }

        if (count === 3) {

            numWinField = ++i;
            break;

        } else {

            count = 0;

        }

    }

    if (count === 3) {

        document.querySelector(".player1").setAttribute("data", "Победитель");
        paintWinLine(numWinField);
        return true;

    } else { 

        return false;

    }
} 

function playerZeroIsWin() {
    let zeroField;
    let zeroDisplay = [];
    let numWinField = 0;
    let count = 0;
    
    for (let i = 0; i < gameField.length; i++) {

        zeroField = classField + (i + 1) + classZero; 

        if (document.querySelector(zeroField).style.display == "block") {
            zeroDisplay.push(i + 1);
        }
    }

    for (let i = 0; i < winFields.length; i++) {
        
        for (let j = 0; j < zeroDisplay.length; j++) {

            winFields[i].includes(zeroDisplay[j]) ? count++ : count;

        }

        if (count === 3) {

            numWinField = ++i;
            break;

        } else {

            count = 0;

        }

    }
   
    if (count === 3) {
        document.querySelector(".player2").setAttribute("data", "Победитель");
        paintWinLine(numWinField);
        return true;

    } else { 

        return false;

    }
}

function isDraw() {

    let crossField, zeroField;
    let crossDisplay, zeroDisplay;
    let check = 0;

    for (let i = 0; i < gameField.length; i++) {

        crossField = classField + (i + 1) + classCross;
        crossDisplay = document.querySelector(crossField).style.display;

        zeroField = classField + (i + 1) + classZero;
        zeroDisplay = document.querySelector(zeroField).style.display;

        if (crossDisplay == "block" || zeroDisplay == "block") {

            check++;

        }
    }

    if (check == gameField.length) {

        document.querySelector(".player1").setAttribute("data", "Ничья");
        document.querySelector(".player2").setAttribute("data", "Ничья");

        return true;

    } else {
        
        return false;

    }
}

function paintWinLine(numWinField) {

    if (numWinField === 1) {

        winLine[numWinField - 1].style.transform = "rotate(45deg) translateY(73px) translateX(-78px)";

    } else if (numWinField === 2) {

        winLine[numWinField - 1].style.transform = "rotate(-45deg) translateY(-75px) translateX(-72px)";

    } else if (numWinField > 2 && numWinField <= 5) {

        winLine[numWinField - 1].style.transform = "translateX(540px)";   

    } else if (numWinField > 5) {

        winLine[numWinField - 1].style.transform = "translateX(540px)";   

    } else {

        return false;

    }

}

function stopGame() {

    for (let i = 0; i < gameField.length; i++) {
        gameField[i].style.pointerEvents = "none";
    }

    player === 1 ? arrow.style.transform = "rotateY(180deg)" :
    arrow.style.transform = "rotateY(360deg)";
    
}

function restartGame() {

    window.location.reload();

}

function startGame() {
    for (let i = 0; i < gameField.length; i++) { 

        gameField[i].onclick = () => {

                if (player == 1) {
                    paintCross(gameField[i].ariaValueText);
                    arrow.style.transform = "rotateY(180deg)";            
                    
                    player++;
                    rotateArrow++;

                } else {
                    paintZero(gameField[i].ariaValueText);            

                    if (rotateArrow > 1) {
                        arrow.style.transform = "rotateY(360deg)";
                    }

                    player--;
                }
            
            gameField[i].style.pointerEvents = "none";

            if (playerCrossIsWin() || playerZeroIsWin() || isDraw()) {
            
                stopGame();
        
            }
        }
    }
}

startGame();