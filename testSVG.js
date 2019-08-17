var board = [];
var colorToSet;
var runFlag = false;
var step = 0;
var size = 8;

makeBoard();

function makeBoard() {
    var cont = document.getElementById("container"),
        row = [];
    var boardRect = document.getElementById("boardRect");
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

function countColors() {
    var neighboringColorArray = [],
        colorCounts = [];
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            neighboringColorArray = getNeighboringColors(board, x, y);
            colorCounts = countNeighboringColors(neighboringColorArray);
            set
        }
    }
}

function getNeighboringColors(x, y) {
    var box = document.getElementById(board[x][y]);
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
    return [upColor, leftColor, downColor, rightColor];
}

function countNeighboringColors(colors) {
    colorCounts = Object;
    colorCounts.red = 0;
    colorCounts.blue = 0;
    colorCounts.green = 0;
    for (var i = 0; i < colors.length; i++) {
        if (colors[i] == "red") {
            colorCounts.red++;
        } else if (colors[i] == "blue") {
            colorCounts.blue++;
        } else if (colors[i] == "green") {
            colorCounts.green++;
        }
    }
    return colorCounts;
}

function runAutoColors(board) {
    var color;
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            box = document.getElementById(board[x][y]);
            color = runRule(board, x, y)
            box.setAttribute("fill", color);
        }
    }
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

function runOnce() {
    runFlag = false;
    runRules();
}

function runRules() {
    var newBoard = [];
    var color = "white";
    step++;
    for (x = 0; x < size; x++) {
        newBoard[x] = [];
        for (y = 0; y < size; y++) {
            box = document.getElementById(board[x][y]);
            colors = getNeighboringColors(x, y);
            colorCounts = countNeighboringColors(colors);
            thisColor = box.getAttribute("fill");
            r = colorCounts.red;
            b = colorCounts.blue;
            g = colorCounts.green;

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
                color = "red";
            } else if ((b == 1) && (r == 0) && (g == 0)) {
                color = "blue";
            } else if ((g == 1) && (b == 0) && (r == 0)) {
                color = "green";
            } else {
                color = thisColor;
            }
            newBoard[x].push(color);
        }
    }
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

function setNone() {
    colorToSet = "white";
    console.log("Set color to " + colorToSet + " on click.");
}

function setRed() {
    colorToSet = "red";
    console.log("Set color to " + colorToSet + " on click.");
}

function setBlue() {
    colorToSet = "blue";
    console.log("Set color to " + colorToSet + " on click.");
}

function setGreen() {
    colorToSet = "green";
    console.log("Set color to " + colorToSet + " on click.");
}

function setColorOnClick(id) {
    if (colorToSet) {
        box = document.getElementById(id);
        box.setAttribute("fill", colorToSet);
    }
}