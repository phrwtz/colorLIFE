//global variables
var board = [];
var size = 14;
var colorToSet;
var runFlag = false;
var cont = document.getElementById("container");
var boardRect = document.getElementById("boardRect");
var colorRect = document.getElementById("colorRect");
var turnColor = "red",
    turnNumber = 0, //First time only gets one turn
    firstTurn = true,
    squaresAvailable = true;
centerColorRect();
makeBoard();
countPara.innerHTML = ("<span style='color:red; font-size:24'>" + 0 + ", </span> <span style='color:blue; font-size:24'>" + 0 + ", </span> <span style='color:hotpink; font-size:24'>" + 0 + ", </span><span style='color:cornflowerblue; font-size:24'>" + 0 + "</span >");

function centerColorRect() {
    var shift = 80 + (size * 20);
    colorRect.setAttribute("x", shift.toString());
    colorRect.setAttribute("fill", "red");
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

function setColorOnClick(id) {
    if (squaresAvailable) {
        var boxColor,
            squares,
            diamonds;
        box = document.getElementById(id);
        boxColor = box.getAttribute("fill");
        //Do nothing if box is already either red or blue
        if ((boxColor != "red") && (boxColor != "blue")) {
            //If it's any other color, make it turnColor
            box.setAttribute("fill", turnColor);
        }
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
            console.log("No squares left!");
            handleNoMoreSquares();
        }
    }
}

function fillSquares(squares,c) {
    for (var i = 0; i < squares.length; i++) {
        console.log("Squares = " + squares);
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
}