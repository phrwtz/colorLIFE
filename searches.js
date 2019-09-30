//Search the board looking for "squares" – four tiles with the same fill color that occupy the corners of a square.
function findSquares(b) {
    var x = parseInt(b.id.split("_")[0]),
        y = parseInt(b.id.split("_")[1]),
        c = getColor(x, y);
    var dxArray = horiziontalMatches(x, y, c),
        dyArray = verticalMatches(x, y, c),
        squares = cornersMatch(x, y, dxArray, dyArray);
    console.log(squares);
    for (var i = 0; i < squares.length; i++) {
        fillSquare(squares[i], c);
    }
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
    return getBox(x, y).getAttribute("fill");
}