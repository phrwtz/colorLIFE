var board = [];
var colorToSet;
var runFlag = false;
var step = 0;
var size = 19;
    ;
var cont = document.getElementById("container");
var boardRect = document.getElementById("boardRect");
var whiteRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var redRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var blueRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var greenRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

makeColorButtons();
makeBoard();

function makeColorButtons() {
    whiteRect.setAttribute("id", "whiteRect");
    whiteRect.setAttribute("width", "40");
    whiteRect.setAttribute("height", "40");
    whiteRect.setAttribute("x", "0px");
    whiteRect.setAttribute("y", "0px");
    whiteRect.setAttribute("stroke", "black");
    whiteRect.setAttribute("stroke-width", "2");
    whiteRect.setAttribute("fill", "white");
    whiteRect.setAttribute("onclick", "setWhite()");
    redRect.setAttribute("id", "redRect");
    redRect.setAttribute("width", "40");
    redRect.setAttribute("height", "40");
    redRect.setAttribute("x", "50px");
    redRect.setAttribute("y", "0");
    redRect.setAttribute("stroke", "black");
    redRect.setAttribute("stroke-width", "2");
    redRect.setAttribute("fill", "pink");
    redRect.setAttribute("onclick", "setRed()");
    blueRect.setAttribute("id", "blueRect");
    blueRect.setAttribute("width", "40");
    blueRect.setAttribute("height", "40");
    blueRect.setAttribute("x", "100");
    blueRect.setAttribute("y", "0");
    blueRect.setAttribute("stroke", "black");
    blueRect.setAttribute("stroke-width", "2");
    blueRect.setAttribute("fill", "lightblue");
    blueRect.setAttribute("onclick", "setBlue()");
    greenRect.setAttribute("id", "greenRect");
    greenRect.setAttribute("width", "40");
    greenRect.setAttribute("height", "40");
    greenRect.setAttribute("x", "150");
    greenRect.setAttribute("y", "0");
    greenRect.setAttribute("stroke", "black");
    greenRect.setAttribute("stroke-width", "2");
    greenRect.setAttribute("fill", "lightgreen");
    greenRect.setAttribute("onclick", "setGreen()");
    cont.appendChild(whiteRect);
    cont.appendChild(redRect);
    cont.appendChild(blueRect);
    cont.appendChild(whiteRect);
    cont.appendChild(greenRect);
}

function makeBoard() {
    var row = [];
    for (var i = 0; i < size; i++) {
        var iStr = (100 + 40 * i).toString();
        board[i] = [];
        for (var j = 0; j < size; j++) {
            var jStr = (100 + 40 * j).toString();
            myRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            myRect.setAttribute("width", "40");
            myRect.setAttribute("height", "40");
            myRect.setAttribute("x", iStr);
            myRect.setAttribute("y", jStr);
            myRect.setAttribute("stroke", "black");
            myRect.setAttribute("stroke-width", "2");
            myRect.setAttribute("fill", "white");
            myRect.setAttribute("id", i.toString() + "_" + j.toString());
            myRect.setAttribute("onclick", "setColorOnClick(this.getAttribute('id'))");
            cont.appendChild(boardRect);
            cont.appendChild(myRect);
            board[i].push(myRect.id);
        }
    }
}

function clearBoard() {
    var countPara = document.getElementById("countPara");
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            var box = document.getElementById(board[x][y]);
            box.setAttribute("fill", "white");
        }
    }
    step = 0;
    toggleRunButton.value = "Run";
    runFlag = false;
    countPara.innerHTML = "";
    console.log("Board cleared");
}

function countNeighboringColors(box) {
    var id = box.getAttribute("id"),
        x = parseInt(id.split("_")[0]),
        y = parseInt(id.split("_")[1]),
        colorCounts = new Object();
    colorCounts.red = 0;
    colorCounts.blue = 0;
    colorCounts.green = 0;
    if (y > 0) {
        var upBox = document.getElementById(board[x][y - 1]);
        var upColor = upBox.getAttribute("fill");
    }
    if (y < size - 1) {
        var downBox = document.getElementById(board[x][y + 1]);
        var downColor = downBox.getAttribute("fill");
    }
    if (x > 0) {
        var leftBox = document.getElementById(board[x - 1][y]);
        var leftColor = leftBox.getAttribute("fill");
    }
    if (x < size - 1) {
        var rightBox = document.getElementById(board[x + 1][y]);
        var rightColor = rightBox.getAttribute("fill");
    }
    colorCounts[upColor]++;
    colorCounts[downColor]++;
    colorCounts[rightColor]++;
    colorCounts[leftColor]++;
    return colorCounts;
}

function runAutoColors(box) {
    var color;
    color = runRule(box)
    box.setAttribute("fill", color);
}

function toggleRun() {
    var toggleRunButton = document.getElementById("toggleRunButton");
    if (toggleRunButton.value == "Run") {
        toggleRunButton.value = "Stop";
        runFlag = true;
        runRules();
    } else if (toggleRunButton.value == "Stop") {
        toggleRunButton.value = "Run";
        runFlag = false;
    }
}

function runOnce(box) {
    runFlag = false;
    runRules(box);
}

function runRules(box) {
    var newBoard = [];
    var counts = Object;
    var color = "white";
    var id = box.getAttribute("id"),
        x = parseInt(id.split("_")[0]),
        y = parseInt(id.split("_")[1]);
    step++;
    counts = countNeighboringColors(box);
    thisColor = box.getAttribute("fill");
    r = counts.red;
    b = counts.blue;
    g = counts.green;

    // Situations where all four neighboring boxes are colored
    if ((r == 4) && (b == 0) && (g == 0)) {
        color = "red";
    } else if ((b == 4) && (r == 0) && (g == 0)) {
        color = "blue";
    } else if ((g == 4) && (r == 0) && (b == 0)) {
        color = "green";

    } else if (((r == 3) && (b == 1)) || ((g == 3) && (b == 1))) {
        color = "blue ";
    } else if (((b == 3) && (r == 1)) || ((g == 3) && (r == 1))) {
        color = "red";
    } else if (((g == 1) && (b == 3)) || ((r == 3) && (g == 1))) {
        color = "green";

    } else if ((r == 2) && (b == 2) && (g == 0)) {
        color = "green";
    } else if ((r == 2) && (b == 0) && (g == 2)) {
        color = "blue";
    } else if ((r == 0) && (b == 2) && (g == 2)) {
        color = "red";

    } else if ((r == 2) && (b == 1) && (g == 1)) {
        color = "red";
    } else if ((r == 1) && (b == 2) && (g == 1)) {
        color = "blue";
    } else if ((r == 1) && (b == 1) && (g == 2)) {
        color = "green";
    }

    // Situations where three of the four neighboring boxes are colored
    else if ((r == 3) && (b == 0) && (g == 0)) {
        color = "red";
    } else if ((b == 3) && (r == 0) && (g == 0)) {
        color = "blue";
    } else if ((g == 3) && (r == 0) && (b == 0)) {
        color = "green";

    } else if (((r == 2) && (b == 1) && (g == 0)) || ((r == 0) && (b == 1) && (g == 2))) {
        color = "blue";
    } else if (((r == 1) && (b == 2) && (g == 0)) || ((r == 1) && (b == 0) && (g == 2))) {
        color = "red";
    } else if (((r == 0) && (b == 2) && (g == 1)) || ((r == 2) && (b == 0) && (g == 1))) {
        color = "green";

    } else if (((r == 1) && (b == 1) && (g == 1))) {
        color = "white";
    }

    // Situations where two of the four neighboring boxes are colored
    else if ((r == 2) && (b == 0) && (g == 0)) {
        color = "red";
    } else if ((b == 2) && (r == 0) && (g == 0)) {
        color = "blue";
    } else if ((g == 2) && (r == 0) && (b == 0)) {
        color = "green";

    } else if (r == 1 && b == 1 && g == 0) {
        color = "green";
    } else if (r == 0 && b == 1 && g == 1) {
        color = "red";
    } else if (r == 1 && b == 0 && g == 1) {
        color = "blue";
    }


    // Situations where one of the four neighboring boxes is colored
    else if ((r == 1) && (b == 0) && (g == 0)) {
        color = thisColor;
    } else if ((b == 1) && (r == 0) && (g == 0)) {
        color = thisColor;
    } else if ((g == 1) && (b == 0) && (r == 0)) {
        color = thisColor;
    } else {
        color = thisColor;
    }
    newBoard[x].push(color);
    fillBoard(newBoard);
    if (runFlag) {
        step++;
        setTimeout(runRules, 100);
    }
}

function fillBoard(newBoard) {
    var colorCount = Object;
    var countPara = document.getElementById("countPara");
    var toggleRunButton = document.getElementById("toggleRunButton");
    var noChange = true;
    colorCount.red = 0;
    colorCount.blue = 0;
    colorCount.green = 0;
    colorCount.white = 0;

    countPara.innerHTML = "";
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            var box = document.getElementById(board[x][y]);
            var oldColor = box.getAttribute("fill");
            var color = newBoard[x][y];
            box.setAttribute("fill", color);
            colorCount[color]++;
            if (oldColor != color) {
                noChange = false;
            }
        }
    }
    countPara.innerHTML = "On step " + step + ", red = " + colorCount.red + ", blue = " + colorCount.blue + ", green = " + colorCount.green + ", white = " + colorCount.white + ".";
    if (noChange) {
        runFlag = false;
        toggleRunButton.value = "Run ";
    }
}

function setWhite() {
    colorToSet = "white";
    redRect.setAttribute("fill", "pink");
    blueRect.setAttribute("fill", "lightblue");
    greenRect.setAttribute("fill", "lightgreen");
}

function setRed() {
    colorToSet = "red";
    redRect.setAttribute("fill", "red");
    blueRect.setAttribute("fill", "lightblue");
    greenRect.setAttribute("fill", "lightgreen");
}

function setBlue() {
    colorToSet = "blue";
    redRect.setAttribute("fill", "pink");
    blueRect.setAttribute("fill", "blue");
    greenRect.setAttribute("fill", "lightgreen");
}

function setGreen() {
    colorToSet = "green";
    redRect.setAttribute("fill", "pink");
    blueRect.setAttribute("fill", "lightblue");
    greenRect.setAttribute("fill", "green");
}

function setColorOnClick(id) {
    var boxColor;
    if (colorToSet) {
        box = document.getElementById(id);
        boxColor = box.getAttribute("fill");
        if (!((colorToSet == "red" && boxColor == "blue") || (colorToSet == "blue" && boxColor == "red"))) {
            box.setAttribute("fill", colorToSet);
            findSquares(box);
        }
    }
}