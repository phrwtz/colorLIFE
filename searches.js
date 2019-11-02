

//Convert a color name (string) to an array of RGB values
function getRGB(color) {
    switch (color) {
        case 'red':
            return [255, 0, 0];
        case 'blue':
            return [0, 0, 255];
        case 'pink':
            return [255, 192, 203];
        case 'paleturquoise':
            return [175, 238, 238];
        case 'white':
            return [255, 255, 255];
        case 'wheat':
            return [245, 222, 179];
    }
    return null;
}



function targetColor(cornerColor, startColor) {
    if (cornerColor === "red") {
        switch (startColor) {
            case "blue":
                return "blue";
                break;
            case "red":
                return "red";
                break;
            case "pink":
                return "red";
                break;
            case "white":
                return "pink";
                break;
            case "wheat":
                return "pink";
                break;
            case "paleturquoise":
                return "pink";
                break;
        }
    }
    if (cornerColor === "blue") {
        switch (startColor) {
            case "blue":
                return "blue";
                break;
            case "red":
                return "red";
                break;
            case "pink":
                return "paleturquoise";
                break;
            case "white":
                return "paleturquoise";
                break;
            case "wheat":
                return "paleturquoise";
                break;
            case "paleturquoise":
                return "blue";
                break;
        }
    }
}

function horiziontalMatches(x, y, color) {
    var arr = [];
    for (var i = 0; i < size; i++) {
        if ((getColor(i, y) === color) && (i != x)) {
            arr.push(i - x);
        }
    }
    return arr;
}

function verticalMatches(x, y, color) {
    var arr = [];
    for (var i = 0; i < size; i++) {
        if ((getColor(x, i) === color) && (i != y)) {
            arr.push(i - y);
        }
    }
    return arr;
}

function getBox(x, y) {
    var id = x.toString() + "_" + y.toString();
    return document.getElementById(id);
}

function getColor(x, y) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
        return getBox(x, y).getAttribute("fill");
    } else {
        return "";
    }
}

function setRed() {
    colorToSet = "red";
    colorRect.setAttribute("fill", "red");
    blueRect.setAttribute("fill", "lightblue");
    //   greenRect.setAttribute("fill", "lightgreen");
}

function setBlue() {
    colorToSet = "blue";
    redRect.setAttribute("fill", "pink");
    blueRect.setAttribute("fill", "blue");
    //    greenRect.setAttribute("fill", "lightgreen");
}

//Search every box. Return true if there are any squares left to be formed
function anySquaresLeft() {
    var thisColor;
    for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {
            thisColor = getColor(x, y);
            if ((thisColor != "red") && (thisColor != "blue")) {
                return checkAllSquares(x, y)
            }
        }
    }
}

//Look for the potential of forming a square from the position x, y. In principal there are four possibilities. For any one of them to be a potential square of length i the other three corners must (a) all be on the board (color != ""), (b) not be the wrong color (for red that's blue, and vice versa), and (c) not already be the same color as the square we're examining. As soon as we find a potential square, we break out of the function.
function checkAllSquares(x, y) {
    var leftColor,
        rightColor,
        upColor,
        downColor,
        upRightColor,
        upLeftColor,
        downRightColor,
        downLeftColor,
        thisColor = getColor(x, y),
        thatColor = "";
    noPotentialSquareFound = true;
    for (var i = 2; i < size; i++) {
        leftColor = getColor(x - i, y);
        rightColor = getColor(x + i, y);
        upColor = getColor(x, y - i)
        downColor = getColor(x, y + i)
        upRightColor = getColor(x + i, y - i);
        upLeftColor = getColor(x - i, y - i);
        downRightColor = getColor(x + i, y + i);
        downLeftColor = getColor(x - i, y + i);
        if (thisColor == "red") {
            thatColor = "blue";
        } else if (thisColor == "blue") {
            thatColor = "red";
        }
        //Check the eight possible squares, one by one
        if (checkOneSquare(x, y, thisColor, thatColor, upColor, rightColor, upRightColor)) {
            //         console.log("up right square found at " + x + ", " + y + ", i = " + i);
            return true;
        }
        if (checkOneSquare(x, y, thisColor, thatColor, upColor, leftColor, upLeftColor)) {
            console.log("up left square found at " + x + ", " + y + ", i = " + i);
            return true;
        }
        if (checkOneSquare(x, y, thisColor, thatColor, downColor, rightColor, downRightColor)) {
            //        console.log("down right square found at " + x + ", " + y + ", i = " + i);
            return true;
        };
        if (checkOneSquare(x, y, thisColor, thatColor, downColor, leftColor, downLeftColor)) {
            //       console.log("down left square found at " + x + ", " + y + ", i = " + i);
            return true;
        }
    }
    return false;
}

// Check that it is possible to form a square from the input square at (x, y). For this to be true, color1, color2, and color3 must not be the empty string (meaning that they are off the board), and none of them can be equal to thatColor (which itself will be the empty string in thisColor is neither blue nor red). If thisColor is blue or red, check to see that at least one of the three corner colors is not thisColor (if all three are thisColor then the square is already formed). If thisColor is neither blue nor red, check to be sure that the other three colors don't include both red and blue. Return true if it is possible to form a square from the square (x, y).
function checkOneSquare(x, y, thisColor, thatColor, color1, color2, color3) {
    var returnVal = false,
        redCount = 0,
        blueCount = 0,
        colorArray = [color1, color2, color3];
    if (((color1 != "") && (color2 != "") && (color3 != "")) && ((color1 != thatColor) && (color2 != thatColor) && (color3 != thatColor))) {
        if ((thisColor == "red") || (thisColor == "blue")) {
            if (!((color1 == thisColor) && (color2 == thisColor) && (color3 == thisColor))) {
                returnVal = true;
            }
        } else {
            for (var i = 0; i < 3; i++) {
                if (colorArray[i] == "red") {
                    redCount++;
                } else if (colorArray[i] == "blue") {
                    blueCount++;
                }
            }
            if ((redCount > 0) && (blueCount > 0)) {
                returnVal = false;
            } else {
                returnVal = true;
            }
        }
    }
    return returnVal;
}

function handleNoMoreSquares() {
    changeLightColors();
    score();
    var messagePara = document.getElementById("messagePara");
    messagePara.style.display = "inline";
    messagePara.style.fontSize = 30;
    messagePara.innerHTML = "<b>No squares available!</b><br><br>";
    squaresAvailable = false;
}

function changeLightColors() {
    var box,
        color;
    for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {
            box = getBox(x, y);
            color = getColor(x, y);
            if (color == 'pink') {
                box.setAttribute("fill", "red");
            } else if (color == 'paleturquoise') {
                box.setAttribute("fill", "blue");
            }
        }
    }
}