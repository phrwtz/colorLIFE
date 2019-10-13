var board = [];
var colorToSet;
var runFlag = false;
var step = 0;
var size = 9;;
var cont = document.getElementById("container");
var boardRect = document.getElementById("boardRect");
var whiteRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var redRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var blueRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var greenRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
var turnColor = "red",
    turnNumber = 1;

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
    redRect.setAttribute("fill", "red");
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
    /*greenRect.setAttribute("id", "greenRect");
    greenRect.setAttribute("width", "40");
    greenRect.setAttribute("height", "40");
    greenRect.setAttribute("x", "150");
    greenRect.setAttribute("y", "0");
    greenRect.setAttribute("stroke", "black");
    greenRect.setAttribute("stroke-width", "2");
    greenRect.setAttribute("fill", "lightgreen");
    greenRect.setAttribute("onclick", "setGreen()");
    */
    cont.appendChild(whiteRect);
    cont.appendChild(redRect);
    cont.appendChild(blueRect);
    cont.appendChild(whiteRect);
    //cont.appendChild(greenRect);
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
            //     myRect.setAttribute("onmouseover", "drawBackwardLine(this.getAttribute('id'))");;
            cont.appendChild(boardRect);
            cont.appendChild(myRect);
            board[i].push(myRect.id);
        }
    }
}

function drawLine(x1, y1, x2, y2, id) {
    var myLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    myLine.id = id;
    myLine.setAttribute("x1", x1);
    myLine.setAttribute("y1", y1);
    myLine.setAttribute("x2", x2);
    myLine.setAttribute("y2", y2);
    myLine.setAttribute("stroke", "black");
    myLine.setAttribute("stroke-width", "2");
    cont.appendChild(myLine);
}

function removeLine(id) {
    var myLine = document.getElementById(id);
    if (myLine) {
        cont.removeChild(myLine);
    }
}

function drawBackwardLine(id) {
    removeLine("backLine");
    var box = document.getElementById(id);
    var x = parseInt(id.split("_")[0]);
    var y = parseInt(id.split("_")[1]);
    if (x > y) {
        x1 = 100 + 40 * (x - y);
        y1 = 100;
        x2 = 100 + 40 * size;
        y2 = 100 + y + 40 * (x - y);
    } else if (x < y) {
        x1 = 100;
        y1 = 100 + (y - x) * 40;
        x2 = x1 + 40 * (y - x);
        y2 = y1 + 40 * size;
    } else {
        x1 = 100;
        y1 = 100;
        x2 = 100 + 40 * size;
        y2 = 100 + 40 * size;
    }
    console.log("x= " + x + " y= " + y + " x1= " + x1 + " y1= " + y1 + " x2= " + x2 + " y2= " + y2);
    drawLine(x1, y1, x2, y2, "backLine");
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

function setColorOnClick(id) {
    var boxColor;
    box = document.getElementById(id);
    boxColor = box.getAttribute("fill");
    if (!((turnColor == "red" && boxColor == "blue") || (turnColor == "blue" && boxColor == "red"))) {
        box.setAttribute("fill", turnColor);
    }
    if (turnColor != "white") {
        if (turnNumber == 1) {
            turnNumber = 2;
        } else if (turnNumber == 2) {
            turnNumber = 1;
            if (turnColor == "red") {
                turnColor = "blue";
                redRect.setAttribute("fill", "pink");
                blueRect.setAttribute("fill", "blue");
            } else if (turnColor == "blue") {
                turnColor = "red";
                redRect.setAttribute("fill", "red");
                blueRect.setAttribute("fill", "lightblue");
            }
        }
    }
    findSquaresAndDiamonds(box);
    score();
}

function score() {
    var redCount = 0,
        blueCount = 0,
        color,
        box;
        countPara.innerHTML = "";
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            box = getBox(x, y);
            color = getColor(box);
            if (color == "red") {
                redCount++;
            } else if (color == "blue") {
                blueCount++
            }
        }
    }
    countPara.innerHTML = ("<span style='color:red'>" + redCount + "</span>  <span style='color:blue'>" + blueCount + "</span>")
}