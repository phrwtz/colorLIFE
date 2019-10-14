//Search the board looking for "squares" – four tiles with the same fill color that occupy the corners of a square.
function findSquares(b) {
    var x = parseInt(b.id.split("_")[0]),
        y = parseInt(b.id.split("_")[1]),
        c = getColor(x, y),
        diamonds,
        dxArray = horiziontalMatches(x, y, c),
        dyArray = verticalMatches(x, y, c),
        squares = cornersMatch(x, y, dxArray, dyArray);
    for (var i = 0; i < squares.length; i++) {
        console.log("Squares = " + squares);
        fillSquare(squares[i], c);
    }
    /* diamonds = findDiamonds(b);
    console.log("Diamonds = " + diamonds);
    for (var j = 0; j < diamonds.length; j++) {
        fillDiamond(diamonds[j], c);
    } */
    score();
}

function fillDiamond(diamond, color) {
    var d = Math.abs(diamond[3]);
    var topBox = findTop(diamond);
    var diamondSize = Math.abs(diamond[3]);
    var x = parseInt(topBox.id.split("_")[0]);
    var y = parseInt(topBox.id.split("_")[1]);
    var fBox,
        fColor,
        iColor,
        deltaX = 1,
        id;
    for (var i = 1; i <= d; i++) {
        for (var j = -deltaX; j <= deltaX; j++) {
            id = (x + j) + "_" + (y + i);
            fBox = document.getElementById(id);
            iColor = fBox.getAttribute("fill")
            fColor = fillColor(color, iColor)
            fBox.setAttribute("fill", fColor);
        }
        deltaX++;
    }
    deltaX = d - 1;
    for (i = d + 1; i < 2 * d; i++) {
        for (var j = -deltaX; j <= deltaX; j++) {
            id = (x + j) + "_" + (y + i);
            fBox = document.getElementById(id);
            iColor = fBox.getAttribute("fill")
            fColor = fillColor(color, iColor)
            fBox.setAttribute("fill", fColor);
        }
        deltaX--;
    }
}

//Return the top box of the diamond
function findTop(diamond) {
    var x = diamond[0],
        y = diamond[1],
        df = diamond[2],
        db = diamond[3];
    var pos, id, d;
    d = Math.abs(df);
    if (df > 0 && db > 0) {
        pos = "left";
        id = (x + d) + "_" + (y - d);
        return document.getElementById(id);
    } else if (df > 0 && db < 0) {
        pos = "bottom";
        id = x + "_" + (y - 2 * d);
        return document.getElementById(id);
    } else if (df < 0 && db > 0) {
        pos = "top";
        id = x + "_" + y;
        return document.getElementById(id);
    } else if (df < 0 && db < 0) {
        pos = "right";
        id = (x - d) + "_" + (y - d);
        return document.getElementById(id);
    }
}


function findDiamonds(b) {
    var x = parseInt(b.id.split("_")[0]),
        y = parseInt(b.id.split("_")[1]),
        c = getColor(x, y);
    var forwardArray = forwardMatches(x, y, c),
        backwardArray = backwardMatches(x, y, c);
    return diamondsMatch(x, y, forwardArray, backwardArray);
}

function cornersMatch(x, y, dxArray, dyArray) {
    var c = getColor(x, y),
        dx,
        dy,
        squares = [];
    for (i = 0; i < dxArray.length; i++) {
        dx = dxArray[i];
        for (j = 0; j < dyArray.length; j++) {
            dy = dyArray[j];
            if ((dx == dy) || (dx == -dy)) {
                if (getColor(x + dx, y + dy) == c) {
                    squares.push([x, y, dx, dy]);
                }
            }
        }
    }
    return squares;
}

function diamondsMatch(x, y, dfArray, dbArray) {
    var color = getColor(x, y),
        matchColor,
        df,
        db,
        diamonds = [];
    for (i = 0; i < dfArray.length; i++) {
        df = dfArray[i];
        for (j = 0; j < dbArray.length; j++) {
            db = dbArray[j];
            if (db == df) {
                matchColor = getColor(x + 2 * db, y);
            } else if (db == -df) {
                matchColor = getColor(x, y + db * 2);
            }
            if (color == matchColor) {
                diamonds.push([x, y, df, db]);
            }
        }
    }
    return diamonds;
}

function fillSquare(square, cornerColor) {
    var x = square[0],
        y = square[1],
        dx = square[2],
        dy = square[3],
        myBox,
        insideColor;
    (dx > 0 ? sgnX = 1 : sgnX = -1);
    (dy > 0 ? sgnY = 1 : sgnY = -1);
    for (var i = 0; i < sgnX * dx + 1; i++) {
        for (var j = 0; j < sgnY * dy + 1; j++) {
            if (!corner(i, j, dx, dy)) {
                myBox = getBox(x + sgnX * i, y + sgnY * j);
                insideColor = myBox.getAttribute("fill");
                myBox.setAttribute("fill", fillColor(cornerColor, insideColor));
            }
        }
    }
}

function corner(i, j, dx, dy) {
    return ((i == 0 && j == 0) || (i == Math.abs(dx) && j == 0) || (i == 0 && j == Math.abs(dy)) || (i == Math.abs(dx) && j == Math.abs(dy)))
}

function fillColor(cornerColor, insideColor) {
    if (cornerColor === "red") {
        switch (insideColor) {
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
            case "paleturquoise":
                return "pink";
                break;
        }
    }
    if (cornerColor === "blue") {
        switch (insideColor) {
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
    redRect.setAttribute("fill", "red");
    blueRect.setAttribute("fill", "lightblue");
    //   greenRect.setAttribute("fill", "lightgreen");
}

function setBlue() {
    colorToSet = "blue";
    redRect.setAttribute("fill", "pink");
    blueRect.setAttribute("fill", "blue");
    //    greenRect.setAttribute("fill", "lightgreen");
}

//Search every box. Return true if there are  any squares left
function anySquaresLeft() {
    var thisColor,
        thatColor,
        matchingSquares;
    for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {
            thisColor = getColor(x, y);
            if (thisColor == "red") {
                thatColor = "blue";
            } else if (thisColor == "blue") {
                thatColor = "red";
            }
            for (var i = -size; i < size; i++) {
                matchingSquares = 0;
                rowColor = getColor(x + i, y);
                if (rowColor != thatColor) {
                    if (rowColor == thisColor) {
                        matchingSquares++;
                    }
                    colColor = getColor(x, y + i);
                    if (colColor != thatColor) {
                        if (colColor == thisColor) {
                            matchingSquares++;
                        }
                        diagColor = getColor(x + i, y + i);
                        if (diagColor != thatColor) {
                            if (diagColor == thisColor) {
                                matchingSquares++;
                            }
                            if (matchingSquares < 3) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }
    alert("No square left!");
    return false;
}