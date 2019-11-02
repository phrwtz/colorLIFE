function fillSquares(squares, c) {
    for (var i = 0; i < squares.length; i++) {
        //      console.log("Squares = " + squares);
        highlightCorners(squares[i], c);
        fillSquare(squares[i], c);
    }
}

function highlightCorners(square, c) {
    var corners = getSquareCorners(square);
    for (let j = 0; j < corners.length; j++) {
        corners[j].setAttribute("stroke-width", 5);
        corners[j].setAttribute("stroke", "gold");
    }
    setTimeout(function () {
        for (let j = 0; j < corners.length; j++) {
            corners[j].setAttribute("stroke-width", 2);
            corners[j].setAttribute("stroke", "black");
        }
    }, 2000);
}

function getSquareCorners(square) {
    var x = square[0],
        y = square[1],
        dx = square[2],
        dy = square[3],
        id0 = x.toString() + "_" + y.toString();
    id1 = x.toString() + "_" + (y + dy).toString(),
        id2 = (x + dx).toString() + "_" + (y + dy).toString(),
        id3 = (x + dx).toString() + "_" + y.toString(),
        box0 = document.getElementById(id0),
        box1 = document.getElementById(id1),
        box2 = document.getElementById(id2),
        box3 = document.getElementById(id3);
    return [box0, box1, box2, box3];
}

//Search the board looking for "squares" – four tiles with the same fill color that occupy the corners of a square.
function findSquares(b) {
    var x = parseInt(b.id.split("_")[0]),
        y = parseInt(b.id.split("_")[1]),
        c = getColor(x, y),
        dxArray = horiziontalMatches(x, y, c),
        dyArray = verticalMatches(x, y, c),
        squares = cornersMatch(x, y, dxArray, dyArray);
    return squares;
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
//Given a square and the corner color of the square, find all the interior boxes to fill and give each an array of 10 colors from the start color to the end color. Don't actually fill the boxes so that we can fill then all at once, once the colors have been computed.
function fillSquare(square, thisColor) {
    var x = square[0],
        y = square[1],
        dx = square[2],
        dy = square[3],
        myBox,
        boxesToFill = [],
        startColor,
        endColor;
    (dx > 0 ? sgnX = 1 : sgnX = -1);
    (dy > 0 ? sgnY = 1 : sgnY = -1);
    for (var i = 0; i < sgnX * dx + 1; i++) {
        for (var j = 0; j < sgnY * dy + 1; j++) {
            if (!corner(i, j, dx, dy)) {
                myBox = getBox(x + sgnX * i, y + sgnY * j);
                startColor = myBox.getAttribute("fill");
                endColor = targetColor(thisColor, startColor);
                if (endColor != startColor) {
                    boxToFill = new Object;
                    boxToFill.box = myBox;
                    boxToFill.startColor = startColor;
                    boxToFill.endColor = endColor;
                    boxToFill.tempColors = findIntermediateColors(startColor, endColor);
                    boxesToFill.push(boxToFill);
                }
            }
        }
    }
    changeColors(boxesToFill);
}

function corner(i, j, dx, dy) {
    return ((i == 0 && j == 0) || (i == Math.abs(dx) && j == 0) || (i == 0 && j == Math.abs(dy)) || (i == Math.abs(dx) && j == Math.abs(dy)))
}