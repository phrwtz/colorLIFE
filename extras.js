


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