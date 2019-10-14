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

function fillDiamond(diamond, cornerColor) {
    var x = diamond[0],
        y = diamond[1],
        df = diamond[2],
        db = diamond[3],
        delta = Math.abs(df),
        fillCorners;
    pos = findPos(df, db);
    fillCorners = findDiamondFillCorners(x, y, delta, pos);
    console.log("xmin = " + fillCorners[0] + ",   xmax = " + fillCorners[1] + ", ymin = " + fillCorners[2] + ", ymax = " + fillCorners[3]);
    fillOuterRows(fillCorners, cornerColor);
    fillOuterColumns(fillCorners, cornerColor);
    fillInnerSquare(fillCorners, cornerColor);
}

function setWhite() {
    colorToSet = "white";
    redRect.setAttribute("fill", "pink");
    blueRect.setAttribute("fill", "lightblue");
    greenRect.setAttribute("fill", "lightgreen");
}



function setGreen() {
    colorToSet = "green";
    redRect.setAttribute("fill", "pink");
    blueRect.setAttribute("fill", "lightblue");
    greenRect.setAttribute("fill", "green");
}
function forwardMatches(x, y, color) {
    var arr = [];
    for (var i = -size; i < size; i++) {
        id = (x + i) + "_" + (y - i);
        if (document.getElementById(id));
        box = document.getElementById(id);
        searchColor = getColor(box);
        if ((searchColor === color) && (i != 0)) {
            arr.push(i);
        }
    }
    return arr;
}

function backwardMatches(x, y, color) {
    var arr = [];
    for (var i = -size; i < size; i++) {
        id = (x + i) + "_" + (y + i);
        if (document.getElementById(id));
        box = document.getElementById(id);
        searchColor = getColor(box);
        if ((searchColor === color) && (i != 0)) {
            arr.push(i);
        }
    }
    return arr;
}