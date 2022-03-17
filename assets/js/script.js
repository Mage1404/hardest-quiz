var sq = document.querySelector("#start-quiz");
var vr = document.querySelector("#view-rank");
var q = document.querySelector("#question-name");
var c = document.querySelector("#choice");
var j = document.querySelector("#judge")
var score = document.querySelector("#score")
var n = document.querySelector("#enter-name")
var rl = document.querySelector("#ranklist")
var timerEl = document.querySelector("#countdown");
var timestop = "off"; //switch to turn off timer interval
var counter = 0;
var current = {};
var point = 0;
var board = [];
var timeLeft = 60;


var questionbase = [
    {
        question: "Commonly used data types do NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed in:",
        choices: ["Quotes", "Parenthesis", "Curly Brackets", "Square Brackets"],
        answer: "Parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables",
        choices: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        answer: "Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "Terminal Bash", "for loops", "console.log"],
        answer: "console.log"
    }
];

// function to start the game, run countdown timer interval and questions function at once
var startgame = function () {
    countdown();
    test();
}

var test = function() {
    current = questionbase[counter];
    q.textContent = current.question;
    if(counter == 0){
        // hide 2 button from main page when start quiz
        sq.style.display="none";
        vr.style.display="none";
        // for first question we add list to index.html
        for (var i = 0; i < 4; i++) {
            var listItem = document.createElement("li");
            var choicebutton = document.createElement("button");
            listItem.className = "listlist";
            listItem.setAttribute("list-id", i);
            choicebutton.className = "item";
            choicebutton.setAttribute("choice-id", i);
            choicebutton.textContent = current.choices[i]; 
            listItem.appendChild(choicebutton);
            c.appendChild(listItem);
        }
      } else {
          // for the rest questions we only change list textcontent
        for (var i = 0; i < 4; i++) {
            var idselect = document.querySelector(".item[choice-id='" + i + "']");
            idselect.textContent = current.choices[i];
        }
    }

};

var judge = function(event) {
    var targetElement = event.target || event.srcElement;
    if (targetElement.textContent == current.answer) {
        j.textContent = "Correct, + 20 points";
        point += 20;
    } else {
        timeLeft -= 5;
        j.textContent = "Incorrect, Remaining time reduced by 5 seconds";
    }
    counter = counter + 1;
    if (counter < questionbase.length) {
        test();
    } else {
        // stop interval
        timestop = "on";
        endtest();
    }
}

function countdown() {
    var timeInterval = setInterval(function() {
        if (timestop == "on") {
            return clearInterval(timeInterval);
        }
        if (timeLeft > 0) {
            timerEl.textContent = "Time Left: " + timeLeft;
            timeLeft = timeLeft - 1;
        } else {
            clearInterval(timeInterval);
            return endtest();
        }
        }, 1000)
    }

var endtest = function() {
    // remove all questions list from index
    while (c.lastElementChild) {
        c.removeChild(c.lastElementChild);
    };
    if (timeLeft > 0) {
        q.textContent = "You have finished all the questions!";
    } else {
        q.textContent = "Time Out!";
    }
    // create a new page content with input and button
    score.textContent = "you score is: " + point;
    var initials = document.createElement("input");
    initials.setAttribute("placeholder", "Please enter your initials")
    initials.setAttribute("type", "text");
    initials.setAttribute("id", "idtext");
    n.appendChild(initials);
    var namebutton = document.createElement("button");
    namebutton.setAttribute("type","click");
    namebutton.setAttribute("onclick", "rankboard()");
    namebutton.textContent = "View your rank";
    n.appendChild(namebutton);
    timerEl.textContent = null;
} 

var rankboard = function () {
    var x = document.getElementById("idtext").value;
    if (!x) {
        x = "unknown";
    }
    board.push({
        name:x,
        score:point
    });
    board.sort((a, b) => (a.score < b.score) ? 1 : -1)
    saveboard();
    for (var i = 0; i < board.length; i++) {
        var ranklistitem = document.createElement("li");
        var removebutton = document.createElement("button");
        var restartbutton = document.createElement("button");
        var clearbutton = document.createElement("button");
        removebutton.textContent = "Remove";
        restartbutton.textContent = "Restart Quiz";
        clearbutton.textContent = "Clear Record";
        ranklistitem.append(board[i].name + " " + " - " + " " + board[i].score);
        rl.appendChild(ranklistitem);
    }
    q.textContent = "Rank Board";
    score.textContent = "";
    while (n.lastElementChild) {
        n.removeChild(n.lastElementChild);
    };
    j.textContent = "";
    rl.appendChild(restartbutton);
    rl.appendChild(clearbutton);
    restartbutton.setAttribute("type","click");
    restartbutton.setAttribute("onclick", "restartgame()");
    clearbutton.setAttribute("type","click");
    clearbutton.setAttribute("onclick", "clearboard()");
}

var viewboard = function () {
    sq.style.display="none";
    vr.style.display="none";
    var restartbutton = document.createElement("button");
    var clearbutton = document.createElement("button");
    restartbutton.textContent = "Back to Main";
    clearbutton.textContent = "Clear Record";
    for (var i = 0; i < board.length; i++) {
        var ranklistitem = document.createElement("li");
        ranklistitem.append(board[i].name + " " + " - " + " " + board[i].score);
        rl.appendChild(ranklistitem);
    }
    q.textContent = "Rank Board";
    score.textContent = "";
    while (n.lastElementChild) {
        n.removeChild(n.lastElementChild);
    };
    j.textContent = "";
    rl.appendChild(restartbutton);
    rl.appendChild(clearbutton);
    restartbutton.setAttribute("type","click");
    restartbutton.setAttribute("onclick", "restartgame()");
    clearbutton.setAttribute("type","click");
    clearbutton.setAttribute("onclick", "clearboard()");
}

var restartgame = function () {
    while (rl.lastElementChild) {
        rl.removeChild(rl.lastElementChild);
    };
    q.textContent = null;
    sq.style.display="";
    vr.style.display="";
    counter = 0;
    current = {};
    point = 0;
    timestop = "off";
    timeLeft = 60;
    timerEl.textContent = "Time Left: 60"
}

var clearboard = function () {
    while (rl.lastElementChild) {
        rl.removeChild(rl.lastElementChild);
    };
    q.textContent = "Record has been cleared";
    var restartbutton = document.createElement("button");
    restartbutton.textContent = "Restart Quiz";
    restartbutton.setAttribute("type","click");
    restartbutton.setAttribute("onclick", "restartgame()");
    rl.appendChild(restartbutton);
    board = [];
    saveboard();
}

//local storage
var saveboard = function() {
    localStorage.setItem("board", JSON.stringify(board));
  };

var loadboard = function() {
  var save = localStorage.getItem("board");
  // if there are no tasks, set tasks to an empty array and return out of the function
  if (!save) {
    return false;
  }
  board = JSON.parse(save);
};

document.getElementById("start-quiz").addEventListener("click", startgame);
document.getElementById("choice").addEventListener("click", judge);
document.getElementById("view-rank").addEventListener("click", viewboard);
loadboard();



