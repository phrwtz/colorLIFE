//Search the board looking for "squares" – four tiles with the same fill color that occupy the corners of a square.
function findSquares(b) {
    var x = parseInt(b.id.split("_")[0]),
        y = parseInt(b.id.split("_")[1]),
        c = getColor(x, y),
        diamonds,
        dxArray = horiziontalMatches(x, y, c),
        dyArray = verticalMatches(x, y, c),
        squares = cornersMatch(x, y, dxArray, dyArray);
    diamonds = findDiamonds(b);
    console.log("Squares = " + squares);
    console.log("Diamonds = " + diamonds);
    for (var i = 0; i < squares.length; i++) {
        fillSquare(squares[i], c);
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
                matchColor = getColor(x + 2 * bf, y);
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
                return "white";
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
                return "white";
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

function forwardMatches(x, y, color) {
    var arr = [];
    //Check boxes in a forward diagonal line up to the borders
    for (var i = 1 - size; i < size; i++) {
        if ((x + i >= 0) && (x + i < size) && (y - i >= 0) && (y - i < size))
        var checkColor = getColor(x + i, y - i);
        if ((color === checkColor) && (i != 0)) {
            arr.push(i);
        }
        i++;
    }
    return arr;
}

function backwardMatches(x, y, color) {
    var arr = [];
    //Check boxes in a backward diagonal line up to the borders
    for (var i = 1 - size; i < size; i++) {
        if ((x + i >= 0) && (x + i < size) && (y + i >= 0) && (y + i < size))
        var checkColor = getColor(x + i, y + i);
        if ((color === checkColor) && (i != 0)) {
            arr.push(i);
        }
        i++;
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
    if (getBox(x, y)) {
        return getBox(x, y).getAttribute("fill");
    } else {
        return null;
    }
}