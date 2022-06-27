let btnRef = document.querySelectorAll('.button');
let alertRef = document.querySelector('.alert');
let newGameBtn = document.getElementById('new-game');
let restartBtn = document.getElementById('restart');
let messageRef = document.getElementById('message');

//Winning Pattern Arrey
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
]

//Player 'X' plays first
let xTurn = true;
let count = 0;

//Disable all  buttons
function disablaButtons() {
    btnRef.forEach((element) => (element.disablad = true));
    //enable alert 
    alertRef.classList.remove('hiden');
}

//Enable all buttons (For New Game and Restart)
function enableButtons() {
    btnRef.forEach((element) => {
        element.innerText = '';
        element.disablad = 'false';
    });
    //disable alert 
    alertRef.classList.toggle('hiden')
}

//New Game 
newGameBtn.addEventListener('click', () => {
    count = 0;
    enableButtons();
})

restartBtn.addEventListener('click', () => {
    count = 0;
    enableButtons();   
})

//This function is executed when a player wins
function winFunction(Letter) {
    disablaButtons();
    if (Letter == 'X') {
        messageRef.innerHTML = '&#x1F389; <br> "X" Wins';
    } else {
        messageRef.innerHTML = '&#x1F389; <br> "O" Wins';
    }
}

//Function for draw 
function drawFunction() {
    disablaButtons();
    messageRef.innerHTML = '&#x1F60E; <br> Its a Draw';
}

//Win logic
function winChecker() {
    //Loop through all win pattern
    for(let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText
        ];

         //Check if elements are filled
         //if 3 empty element are same and would give win as would
         if (element1 != '' && element2 != '' && element3 != '') {
            if(element1 == element2 && element2  == element3) {
                //if all 3 button have same value then pass the value to winFunction
                winFunction(element1);
            }
         }
    }
}

//Display X/O on click 
btnRef.forEach((element) => {
    element.addEventListener('click', () => {
        if (xTurn) {
            xTurn = false;
            //Display X
            element.innerText = 'X';
            element.disablad = true;
        } else {
            xTurn = true;
            //Display O
            element.innerText = 'O';
            element.disablad = true;
        }
        
        //Increment count on each click
        count ++;
        if (count == 9) {
            //It's a draw since there are a total of 9 boxed
            drawFunction();
        }

        //Check for win on every click
        winChecker();
    })
})

//Enable Button and disable alert on page Load 
window.onload = enableButtons;