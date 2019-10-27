//global variables
var board = [];
var size = 16;
var colorToSet;
var runFlag = false;
var cont = document.getElementById("container");
var boardRect = document.getElementById("boardRect");
var colorRect = document.getElementById("colorRect");
var turnColor = "red",
    turnNumber = 0, //First time only gets one turn
    firstTurn = true,
    squaresAvailable = true,
    someoneWins,
    shiftKeyDown = false,
    idCursorIsIn = "";
centerColorRect();
makeBoard();
testKeyPress();
countPara.innerHTML = ("<span style='color:red; font-size:24'>" + 0 + ", </span> <span style='color:blue; font-size:24'>" + 0 + ", </span> <span style='color:hotpink; font-size:24'>" + 0 + ", </span><span style='color:cornflowerblue; font-size:24'>" + 0 + "</span >");

function centerColorRect() {
    var shift = 80 + (size * 20);
    colorRect.setAttribute("x", shift.toString());
    colorRect.setAttribute("fill", "red");
}

function testKeyPress() {
    document.addEventListener('keydown', function (event) {
        if (event.defaultPrevented) {
            return;
        }
        var key = event.key || event.keyCode;
        if (key === 'Shift') {
            shiftKeyDown = true;
     //       console.log("Control key is down.");
            drawForwardLine(idCursorIsIn);
            drawBackwardLine(idCursorIsIn);
        }
    })
    document.addEventListener('keyup', function (event) {
        if (event.defaultPrevented) {
            return;
        }
        var key = event.key || event.keyCode;
        if (key === 'Shift') {
            shiftKeyDown = false;
      //      console.log("Control key is up.");
            removeLines();
        }
    })
}

function setCursorId(id) {
    idCursorIsIn = id;
 //   console.log(id);
    drawForwardLine(id);
    drawBackwardLine(id);
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
            myRect.setAttribute("onmouseenter", "setCursorId(this.getAttribute('id'))");
            myRect.setAttribute("onmouseleave", "removeLines();setCursorId('')");
            cont.appendChild(boardRect);
            cont.appendChild(myRect);
            board[i].push(myRect.id);
        }
    }
}

function removeLines() {
    var forwardLine = document.getElementById("forward");
    var backwardLine = document.getElementById("backward");
    if (forwardLine) {
        cont.removeChild(forwardLine);
    }
    if (backwardLine) {
        cont.removeChild(backwardLine);
    }
}

function drawForwardLine(id) {
 //   console.log("In draw forward, control key down = " + shiftKeyDown);
    if ((shiftKeyDown) && (idCursorIsIn != "")) {
        var x = parseInt(id.split("_")[0]);
        var y = parseInt(id.split("_")[1]);
        if (x + y < size) {
            x1 = 100;
            y1 = 140 + 40 * (x + y);
            x2 = 140 + 40 * (x + y);
            y2 = 100;
        } else if (x + y >= size) {
            x1 = 140 + 40 * (x - (size - y));
            y1 = 100 + 40 * size;
            x2 = 100 + 40 * size;
            y2 = 140 + 40 * (y - (size - x));
        }
     //   console.log("x= " + x + " y= " + y + " x1= " + x1 + " y1= " + y1 + " x2= " + x2 + " y2= " + y2);
        drawLine(x1, y1, x2, y2, "forward");
    }
}

function drawBackwardLine(id) {
    if ((shiftKeyDown) && (idCursorIsIn != "")) {
        var x = parseInt(id.split("_")[0]);
        var y = parseInt(id.split("_")[1]);
        if (x > y) {
            x1 = 100 + 40 * (x - y);
            y1 = 100;
            x2 = 100 + 40 * size;
            y2 = y1 + x2 - x1;
        } else if (x < y) {
            x1 = 100;
            y1 = 100 + 40 * (y - x);
            y2 = 100 + 40 * size;
            x2 = x1 + y2 - y1;
        } else {
            x1 = 100;
            y1 = 100;
            x2 = 100 + 40 * size;
            y2 = 100 + 40 * size;
        }
        drawLine(x1, y1, x2, y2, "backward");
    }
}


function drawLine(x1, y1, x2, y2, id) {
    var myLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    myLine.setAttribute("id", id);
    myLine.setAttribute("x1", x1);
    myLine.setAttribute("y1", y1);
    myLine.setAttribute("x2", x2);
    myLine.setAttribute("y2", y2);
    myLine.setAttribute("stroke", "black");
    myLine.setAttribute("stroke-width", "1");
    cont.appendChild(myLine);
}

function setColorOnClick(id) {
    if (squaresAvailable && !someoneWins) {
        var boxColor,
            squares,
            diamonds;
        box = document.getElementById(id);
        boxColor = box.getAttribute("fill");
        //Do nothing if box is already either red or blue
        if (boxColor == "red" || boxColor == "blue") {} else {
            //If it's any other color, make it turnColor
            box.setAttribute("fill", turnColor);
            //Now that we have the box colored, find squares
            squares = findSquares(box);
            //and fill them.
            fillSquares(squares, turnColor);
            //Find diamonds
            diamonds = findDiamonds(box);
            //and fill them.
            fillDiamonds(diamonds, turnColor);
            //Update the score
            score();
            //If this is the first move or the second turn by the same color, toggle turnColors
            if ((turnNumber == 0) || (turnNumber == 2)) {
                //If we're switching colors...
                turnNumber = 1;
                if (turnColor == "red") {
                    turnColor = "blue";
                } else if (turnColor == "blue") {
                    turnColor = "red";
                }
                colorRect.setAttribute("fill", turnColor)
            } else {
                turnNumber = 2;
            }
            //Look to see if there are any more squares or diamonds
            if (!(anySquaresLeft())) {
          //      console.log("No squares left!");
                handleNoMoreSquares();
            }
        }
    }
}

function fillSquares(squares, c) {
    for (var i = 0; i < squares.length; i++) {
  //      console.log("Squares = " + squares);
        fillSquare(squares[i], c);
    }
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
    if (redCount > size * size / 2) {
        countPara.innerHTML += "<br><span style='font-size:32;color:red'> Red wins! </span>";
        someoneWins = true;
    } else if (blueCount > size * size / 2) {
        countPara.innerHTML += "<br><span style='font-size:32;color:blue'> Blue wins! </span>";
        someoneWins = true;
    }
}