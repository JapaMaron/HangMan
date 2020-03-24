let lives = 7;
let words = [];
let buttons = [];
let blocks = [];
let wordChosen;
let buttonCheck = 0;
let score = 0;
let letter = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s",
    "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"
];

let username;
let scoreBoardArray = [];

function mainMenu() {
    let menu = document.createElement("div");
    menu.id = "main-menu";
    let menuTitle = document.createElement("h1");
    menuTitle.textContent = "Hang Man"
    let menuSubText = document.createElement("h2");
    menuSubText.textContent = "Enter Your Name";
    menu.appendChild(menuTitle);
    menu.appendChild(menuSubText);
    menu.classList.add("wrapper");

    let usernameInput = document.createElement("input");
    usernameInput.id = "username";
    usernameInput.type = "text";
    menu.appendChild(usernameInput);

    let startGameButton = document.createElement("button");
    startGameButton.innerText = "Start";
    startGameButton.onclick = start;
    menu.appendChild(startGameButton);

    document.body.appendChild(menu);
}

function wordChooser() {
    let r = Math.floor(Math.random() * words.length);
    wordChosen = r;
    return words[r];
}

function wordPlacer() {
    let r = wordChooser();
    for (let i = 0; i < r.length; i++) {
        let b = document.createElement("button");
        b.disabled = true;
        b.id = "block";
        blocks[i] = b;
        document.getElementById('word').appendChild(b);
        blocks[i].style.height = "25px";
        blocks[i].style.width = "25px";
        blocks[i].style.margin = "5px";
    }
    console.log(words[wordChosen]);
    decsriptionPlacer();
}

function generateButtons() {
    /* Keep this code in case it's not desired to re-organize keyboard*/
    /*
    for (let i = 0; i < 26; i++) {
        let b = document.createElement("button");
        b.class = letter[i];
        b.id = "button";
        b.innerHTML = letter[i];
        b.style.fontSize = "20px";
        b.onclick = function () {
            pressButton(b);
        }
        buttons[i] = b;
        document.getElementById('buttons').appendChild(b);
        buttons[i].style.height = "30px";
        buttons[i].style.width = "55px";
        buttons[i].style.margin = "2px";
    }
    */
   /* Append button to correct row using if statements.*/
   for (let i = 0; i < 26; i++) {
        let b = document.createElement("button");
        b.class = letter[i];
        b.id = "button";
        b.innerHTML = letter[i];
        b.style.fontSize = "20px";
        b.onclick = function () {
            pressButton(b);
        }
        buttons[i] = b;
        /* Append button to the first row. */
        if (i < 10){
            document.getElementById('buttonsRow1').appendChild(b);
        } else{
            if (i >= 10 && i < 19){
                /* Append button to the second row. */
                document.getElementById('buttonsRow2').appendChild(b);
            } else{
                /* Append button to the third row. */
                document.getElementById('buttonsRow3').appendChild(b);
            }
        }
        
        buttons[i].style.height = "30px";
        buttons[i].style.width = "55px";
        buttons[i].style.margin = "2px";
    }
}

function pressButton(button) {
    let r = words[wordChosen];
    let correct = false;

    for (let i = 0; i < r.length; i++) {
        if (r.charAt(i) == button.innerHTML) {
            score++;
            document.getElementById('score').innerHTML = "Score: " + score;
            blocks[i].innerHTML = button.innerHTML;
            correct = true;
        }
    }
    if (correct == false) {
        lives--;
        score--;
        document.getElementById('score').innerHTML = "Score: " + score;
    }
    button.disabled = true;
    lifeCheck();
    winCheck();

    /* Change the styling of the button to show it's pressed. */
    buttonPressed(button);
}

function buttonPressed(button){
    button.style.background = "linear-gradient(to bottom, #bab1ba 5%, #ededed 100%)";
    button.style.backgroundColor = "#bab1ba";
}

function winCheck() {
    let r = words[wordChosen]
    let word = "";
    for (let i = 0; i < r.length; i++) {
        word = word + blocks[i].innerHTML;
    }

    if (word == r) {
        for (let i = 0; i < r.length; i++) {
            let w = blocks[i];
            w.parentNode.removeChild(w);
        }
        for (let i = 0; i < buttons.length; i++) {
            let w = buttons[i];
            w.parentNode.removeChild(w);
        }
        document.getElementById("description").innerHTML = "Congradulations";
        setTimeout(function () {
            wordPlacer();
            generateButtons();
        }, 2000);
    }
}

function gameOver() {
    document.getElementById("description").innerHTML = "";
    document.getElementById("word").innerHTML = "GAME OVER";
    presentResults(username, score);

}

function lifeCheck() {
    switch (lives) {
        case 7:
            document.getElementById("platform").src = "images/11.png";
            break;
        case 6:
            document.getElementById("platform").src = "images/12.png";
            break;
        case 5:
            document.getElementById("platform").src = "images/13.png";
            break;
        case 4:
            document.getElementById("platform").src = "images/14.png";
            break;
        case 3:
            document.getElementById("platform").src = "images/15.png";
            break;
        case 2:
            document.getElementById("platform").src = "images/16.png";
            break;
        case 1:
            document.getElementById("platform").src = "images/17.png";
            break;
        case 0:
            document.getElementById("platform").src = "images/18.png";
            let r = words[wordChosen];
            for (let i = 0; i < r.length; i++) {
                let w = blocks[i];
                w.parentNode.removeChild(w);
            }
            for (let i = 0; i < buttons.length; i++) {
                let w = buttons[i];
                w.parentNode.removeChild(w);
            }
            gameOver();
            break;
        default:
            break;
    }
}

function decsriptionPlacer() {
    let desc = document.getElementById("description");
    switch (wordChosen) {
        case 0:
            desc.innerHTML = "Bureaucracies form these anytime they lift a finger";
            break;
        case 1:
            desc.innerHTML = "A kind of red fish that lives in the fraser river";
            break;
        case 2:
            desc.innerHTML = "Cause (something) to occur in a particular way; be the decisive factor in.";
            break;
        case 3:
            desc.innerHTML = "Einstein was a an absolute ...";
            break;
        case 4:
            desc.innerHTML = "City south of richmond";
            break;
        case 5:
            desc.innerHTML = "What is the meaning of it all";
            break;
        case 6:
            desc.innerHTML = "Everyone lives in their own little ...";
            break;
        case 7:
            desc.innerHTML = "You can find clowns and elephants here";
            break;
        case 8:
            desc.innerHTML = "Some describe it as linear but Its actually a big ball of wibbly wobbly ... stuff";
            break;
        case 9:
            desc.innerHTML = "The part of the alimentary canal that connects the throat to the stomach; the gullet. In humans and other vertebrates it is a muscular tube lined with mucous membrane.";
            break;
        default:
            break;
    }
}

function resetButton() {
    window.location.reload(false); 
    /* Hopefully we don't need this
    let r = words[wordChosen]
    lives = 7;
    lifeCheck();
    if (document.getElementById("word").innerHTML != "GAME OVER") {
        for (let i = 0; i < r.length; i++) {
            let w = blocks[i];
            w.parentNode.removeChild(w);
        }
        for (let i = 0; i < buttons.length; i++) {
            let w = buttons[i];
            w.parentNode.removeChild(w);
        }
    }
    document.getElementById("word").innerHTML = "";
    score = 0;
    document.getElementById('score').innerHTML = "Score: " + score;
    
    wordPlacer();
    generateButtons();
    */
}


function start() {
    username = document.getElementById("username").value;
    document.getElementById("main-menu").remove();

    let scoreDisplay = document.createElement("h1");
    scoreDisplay.id = "score";
    scoreDisplay.classList.add("wrapper");
    document.body.appendChild(scoreDisplay);

    let platform = document.createElement("div");
    platform.classList.add("wrapper");
    let innerPlatform = document.createElement("img");
    innerPlatform.id = "platform";
    innerPlatform.src = "images/3.jpg";
    platform.appendChild(innerPlatform);
    document.body.appendChild(platform);

    let word = document.createElement("div");
    word.id = "word";
    word.classList.add("wrapper");
    document.body.appendChild(word);

    let buttons = document.createElement("div");
    buttons.id = "buttons";
    buttons.classList.add("wrapper");
    document.body.appendChild(buttons);

    /* Make 3 rows of buttons to imitate QWERTY keyboard.*/
    let buttonsRow1 = document.createElement("div");
    buttonsRow1.id = "buttonsRow1";
    buttonsRow1.classList.add("wrapper");
    buttons.appendChild(buttonsRow1);

    let buttonsRow2 = document.createElement("div");
    buttonsRow2.id = "buttonsRow2";
    buttonsRow2.classList.add("wrapper");
    buttons.appendChild(buttonsRow2);

    let buttonsRow3 = document.createElement("div");
    buttonsRow3.id = "buttonsRow3";
    buttonsRow3.classList.add("wrapper");
    buttons.appendChild(buttonsRow3);

    let description = document.createElement("h1");
    description.id = "description";
    description.classList.add("wrapper");
    document.body.appendChild(description);

    let resetHolder = document.createElement("div");
    resetHolder.classList.add("wrapper");
    let resetButton = document.createElement("button");
    resetButton.id = "reset";
    resetButton.textContent = "Reset"
    resetHolder.appendChild(resetButton);
    document.body.appendChild(resetHolder);

    document.getElementById("platform").src = "images/11.png";
    document.getElementById('score').innerHTML = "Score: " + score;
    words.push("committee");
    words.push("salmon");
    words.push("determine");
    words.push("genius");
    words.push("delta");
    words.push("life");
    words.push("world");
    words.push("circus");
    words.push("time");
    words.push("esophagus");
    generateButtons();
    wordPlacer();
    document.getElementById("reset").setAttribute("onclick", "resetButton()");
}

function readDatabase() {
    db.collection('sessions').orderBy('order').limit(10).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            scoreBoardArray.push({
                "session": doc.id,
                "name": doc.data().name,
                "score": doc.data().score
            });
        });
        renderDatabase();
    });
}

function renderDatabase() {
    let scoreTitle = document.createElement("h1");
    scoreTitle.textContent = textContent = "Top 10 Players";
    scoreTitle.classList.add("wrapper");
    scoreTitle.id = "score-title";
    document.body.appendChild(scoreTitle);
    
    let table = document.createElement("table");
    table.id = "score-board";
    document.body.appendChild(table);
    
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    tdId.textContent = "SESSION";
    let tdName = document.createElement("td");
    tdName.textContent = "NAME";
    let tdScore = document.createElement("td");
    tdScore.textContent = "SCORE";
    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdScore);
    table.appendChild(tr);

    for (let score in scoreBoardArray) {
        let tr = document.createElement("tr");
        let tdId = document.createElement("td");
        tdId.textContent = scoreBoardArray[score].session;
        let tdName = document.createElement("td");
        tdName.textContent = scoreBoardArray[score].name;
        let tdScore = document.createElement("td");
        tdScore.textContent = scoreBoardArray[score].score;
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdScore);
        table.appendChild(tr);
    }
}

async function presentResults(username, score) {
    await db.collection('sessions').add({
        "order": score * -1,
        "name": username,
        "score": score
    });

    readDatabase();
}

mainMenu();
