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

function fillDiamonds(diamonds, color) {
    for (var index = 0; index < diamonds.length; index++) {
        var diamond = diamonds[index];
        var d = Math.abs(diamond[3]);
        var topBox = findTop(diamond);
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
                if (fBox) {
                    iColor = fBox.getAttribute("fill")
                    fColor = fillColor(color, iColor)
                    fBox.setAttribute("fill", fColor);
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
                    fColor = fillColor(color, iColor)
                    fBox.setAttribute("fill", fColor);
                }
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

    function findDiamondFillCorners(x, y, delta, pos) {
        var xmin,
            xmax,
            ymin,
            ymax
        switch (pos) {
            case "top":
                xmin = x - delta + 1;
                xmax = x + delta - 1;
                ymin = y + 1;
                ymax = y + 2 * delta - 1;
                break;
            case "bottom":
                xmin = x - delta + 1;
                xmax = x + delta - 1;
                ymin = y - 2 * delta - 1;
                ymax = y - 1;
                break;
            case "left":
                xmin = x + 1;
                xmax = x + 2 * delta - 1;
                ymin = y - delta + 1;
                ymax = y + delta - 1;
                break;
            case "right":
                xmin = x - 2 * delta + 1;
                xmax = x - 1;
                ymin = y - delta + 1;
                ymax = y + delta - 1;
                break;
        }
        console.log("Diamond corners found. xmin = " + xmin + " ymin = " + ymin + "xmax = " + xmax + " ymax = " + ymax);
        return [xmin, xmax, ymin, ymax];
    }

    function fillInnerSquare(fillCorners, color) {
        var xmin = fillCorners[0],
            xmax = fillCorners[1],
            ymin = fillCorners[2],
            ymax = fillCorners[3],
            id, box;
        for (var i = xmin + 1; i < xmax; i++) {
            for (var j = ymin + 1; j < ymax; j++) {
                id = i + "_" + j;
                box = document.getElementById(id);
                box.setAttribute("fill", color);
            }
        }
    }

    function fillOuterColumns(fillCorners, color) {
        var xmin = fillCorners[0],
            xmax = fillCorners[1],
            ymin = fillCorners[2],
            ymax = fillCorners[3],
            id, box;
        for (var i = ymin + 1; i <= ymax - 1; i++) {
            id = xmin + "_" + i;
            box = document.getElementById(id);
            box.setAttribute("fill", color);
            id = xmax + "_" + i;
            box = document.getElementById(id);
            box.setAttribute("fill", color);
        }
    }

    function fillOuterRows(fillCorners, color) {
        var xmin = fillCorners[0],
            xmax = fillCorners[1],
            ymin = fillCorners[2],
            ymax = fillCorners[3],
            id, box;
        for (var i = xmin + 1; i <= xmax - 1; i++) {
            id = i + "_" + ymin;
            box = document.getElementById(id);
            box.setAttribute("fill", color);
            id = i + "_" + ymax;
            box = document.getElementById(id);
            box.setAttribute("fill", color);
        }
    }
}
