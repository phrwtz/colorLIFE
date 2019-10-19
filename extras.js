


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

function drawBackwardLine(id) {
    removeLine("backLine");
    var box = document.getElementById(id);
    var x = parseInt(id.split("_")[0]);
    var y = parseInt(id.split("_")[1]);
    if (x > y) {
        x1 = 100 + 40 * (x - y);
        y1 = 100;
        x2 = 100 + 40 * size;
        y2 = 100 + y + 40 * (x - y);
    } else if (x < y) {
        x1 = 100;
        y1 = 100 + (y - x) * 40;
        x2 = x1 + 40 * (y - x);
        y2 = y1 + 40 * size;
    } else {
        x1 = 100;
        y1 = 100;
        x2 = 100 + 40 * size;
        y2 = 100 + 40 * size;
    }
    console.log("x= " + x + " y= " + y + " x1= " + x1 + " y1= " + y1 + " x2= " + x2 + " y2= " + y2);
    drawLine(x1, y1, x2, y2, "backLine");
}
function drawLine(x1, y1, x2, y2, id) {
    var myLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    myLine.id = id;
    myLine.setAttribute("x1", x1);
    myLine.setAttribute("y1", y1);
    myLine.setAttribute("x2", x2);
    myLine.setAttribute("y2", y2);
    myLine.setAttribute("stroke", "black");
    myLine.setAttribute("stroke-width", "2");
    cont.appendChild(myLine);
}

function removeLine(id) {
    var myLine = document.getElementById(id);
    if (myLine) {
        cont.removeChild(myLine);
    }
}

function clearBoard() {
    var countPara = document.getElementById("countPara");
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            var box = document.getElementById(board[x][y]);
            box.setAttribute("fill", "white");
        }
    }
    step = 0;
    toggleRunButton.value = "Run";
    runFlag = false;
    countPara.innerHTML = "";
}

function fillDiamonds(diamonds, color) {
    for (var i = 0; i < diamonds.length; i++) {
        var diamond = diamonds[i];
        fillDiamond(diamond, color);
        x = diamond[0],
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

    
}