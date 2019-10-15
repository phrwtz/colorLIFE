var board = [];
var colorToSet;
var runFlag = false;
var step = 0;
var size = 17;
var cont = document.getElementById("container");
var boardRect = document.getElementById("boardRect");
var colorRect = document.getElementById("colorRect");
var turnColor = "red",
    turnNumber = 0, //First time only gets one turn
    firstTurn = true;
centerColorRect();
makeBoard();

function centerColorRect() {
    var shift = 80 + (size * 20);
    colorRect.setAttribute("x", shift.toString());
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
    //If first time or second try switch colors
    if ((turnNumber == 0) || (turnNumber == 2)) {
        turnNumber = 1;
        if (turnColor == "red") {
            turnColor = "blue";
            colorRect.setAttribute("fill", "blue");
        } else if (turnColor == "blue") {
            turnColor = "red";
            colorRect.setAttribute("fill", "blue");
        }
    } else turnNumber = 2;
    findSquares(box);
    score();
}

function score() {
    var redCount = 0,
        blueCount = 0,
        lightRedCount = 0,
        lightBlueCount = 0,
        color;
    countPara.innerHTML = "";
    for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {
            color = getColor(x, y);
            switch (color) {
                case "red":
                    redCount++;
                    break;
                case "blue":
                    blueCount++;
                    break;
                case "pink":
                    lightRedCount++;
                    break;
                case "paleturquoise":
                    lightBlueCount++;
                    break;
            }
        }
    }
    countPara.innerHTML = ("<span style='color:red; font-size:24'>" + redCount + ", </span> <span style='color:blue; font-size:24'>" + blueCount + ", </span> <span style='color:hotpink; font-size:24'>" + lightRedCount + ", </span><span style='color:cornflowerblue; font-size:24'>" + lightBlueCount + "</span >");
}