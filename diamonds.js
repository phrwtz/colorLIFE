function findDiamonds(b) {
    var x = parseInt(b.id.split("_")[0]),
        y = parseInt(b.id.split("_")[1]),
        c = getColor(x, y);
    var forwardArray = forwardMatches(x, y, c),
        backwardArray = backwardMatches(x, y, c);
    var diamonds = diamondsMatch(x, y, forwardArray, backwardArray);
    return diamonds;
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

function forwardMatches(x, y, thisColor) {
    var arr = [],
        thatColor;
    for (i = -size; i < size; i++) {
        thatColor = getColor(x + i, y - i);
        if (thatColor) {
            if ((thatColor === thisColor) && (i != 0)) {
                arr.push(i);
                //              console.log("forward match found for square " + x + ", " + y + " at position " + i);
            }
        }
    }
    return arr;
}

function backwardMatches(x, y, thisColor) {
    var arr = [],
        thatColor;
    for (var i = -size; i < size; i++) {
        thatColor = getColor(x + i, y + i);
        if (thatColor) {
            if ((thatColor === thisColor) && (i != 0)) {
                arr.push(i);
                //             console.log("backward match found for square " + x + ", " + y + " at position " + i);
            }
        }
    }
    return arr;
}

function getDiamondCorners(x, y, d) {

    id0 = x.toString() + "_" + y.toString(),
        id1 = (x - d).toString() + "_" + (y + d).toString(),
        id2 = (x + d).toString() + "_" + (y + d).toString(),
        id3 = x.toString() + "_" + (y + 2 * d).toString(),
        topBox = document.getElementById(id0),
        leftBox = document.getElementById(id1),
        rightBox = document.getElementById(id2),
        bottomBox = document.getElementById(id3);
    return [topBox, leftBox, rightBox, bottomBox];
}

function fillDiamonds(diamonds, color) {
    var diamond,
        corners;
    for (let i = 0; i < diamonds.length; i++) {
        diamond = diamonds[i];
        var topBox = findTop(diamond);
        var d = Math.abs(diamond[3]);
        var x = parseInt(topBox.id.split("_")[0]);
        var y = parseInt(topBox.id.split("_")[1]);
        corners = getDiamondCorners(x, y, d);
        highlightCorners(corners);
        var fBox,
            fColor,
            iColor,
            deltaX = 1,
            id,
            boxToFill,
            boxesToFill = [];
        for (let i = 1; i <= d; i++) {
            for (let j = -deltaX; j <= deltaX; j++) {
                id = (x + j) + "_" + (y + i);
                fBox = document.getElementById(id);
                if (fBox) {
                    iColor = fBox.getAttribute("fill");
                    fColor = targetColor(color, iColor);
                    if (iColor != fColor) {
                        boxToFill = new Object;
                        boxToFill.box = fBox;
                        boxToFill.tempColors = findIntermediateColors(iColor, fColor);
                        boxesToFill.push(boxToFill);
                    }
                }
            }
            deltaX++;
        }
        deltaX = d - 1;
        for (i = d + 1; i < 2 * d; i++) {
            for (var j = -deltaX; j <= deltaX; j++) {
                id = (x + j) + "_" + (y + i);
                fBox = document.getElementById(id);
                if (fBox) {
                    iColor = fBox.getAttribute("fill")
                    fColor = targetColor(color, iColor)
                    if (iColor != fColor) {
                        boxToFill = new Object;
                        boxToFill.box = fBox;
                        boxToFill.tempColors = findIntermediateColors(iColor, fColor);
                        boxesToFill.push(boxToFill);
                    }
                }
            }
            deltaX--;
        }
        changeColors(boxesToFill);
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