
    <input type="button" id="backButton" onclick="backup();" value="Back up" style="display:inline;margin-right:10px;">
    </input>
    <input type="button" id="toggleRunButton" onclick="toggleRun();" value="Run"
        style="display:inline;margin-right:10px;">
    </input>
    <input type="button" id="runOnceButton" onclick="runOnce();" value="Run once"
        style="display:inline;margin-right:10px;">
    </input>

function countNeighboringColors(box) {
    var id = box.getAttribute("id"),
        x = parseInt(id.split("_")[0]),
        y = parseInt(id.split("_")[1]),
        colorCounts = new Object();
    colorCounts.red = 0;
    colorCounts.blue = 0;
    colorCounts.green = 0;
    if (y > 0) {
        var upBox = document.getElementById(board[x][y - 1]);
        var upColor = upBox.getAttribute("fill");
    }
    if (y < size - 1) {
        var downBox = document.getElementById(board[x][y + 1]);
        var downColor = downBox.getAttribute("fill");
    }
    if (x > 0) {
        var leftBox = document.getElementById(board[x - 1][y]);
        var leftColor = leftBox.getAttribute("fill");
    }
    if (x < size - 1) {
        var rightBox = document.getElementById(board[x + 1][y]);
        var rightColor = rightBox.getAttribute("fill");
    }
    colorCounts[upColor]++;
    colorCounts[downColor]++;
    colorCounts[rightColor]++;
    colorCounts[leftColor]++;
    return colorCounts;
}

function runAutoColors(box) {
    var color;
    color = runRule(box)
    box.setAttribute("fill", color);
}

function toggleRun() {
    var toggleRunButton = document.getElementById("toggleRunButton");
    if (toggleRunButton.value == "Run") {
        toggleRunButton.value = "Stop";
        runFlag = true;
        runRules();
    } else if (toggleRunButton.value == "Stop") {
        toggleRunButton.value = "Run";
        runFlag = false;
    }
}

function runOnce(box) {
    runFlag = false;
    runRules(box);
}

function runRules(box) {
    var newBoard = [];
    var counts = Object;
    var color = "white";
    var id = box.getAttribute("id"),
        x = parseInt(id.split("_")[0]),
        y = parseInt(id.split("_")[1]);
    step++;
    counts = countNeighboringColors(box);
    thisColor = box.getAttribute("fill");
    r = counts.red;
    b = counts.blue;
    g = counts.green;

    // Situations where all four neighboring boxes are colored
    if ((r == 4) && (b == 0) && (g == 0)) {
        color = "red";
    } else if ((b == 4) && (r == 0) && (g == 0)) {
        color = "blue";
    } else if ((g == 4) && (r == 0) && (b == 0)) {
        color = "green";

    } else if (((r == 3) && (b == 1)) || ((g == 3) && (b == 1))) {
        color = "blue ";
    } else if (((b == 3) && (r == 1)) || ((g == 3) && (r == 1))) {
        color = "red";
    } else if (((g == 1) && (b == 3)) || ((r == 3) && (g == 1))) {
        color = "green";

    } else if ((r == 2) && (b == 2) && (g == 0)) {
        color = "green";
    } else if ((r == 2) && (b == 0) && (g == 2)) {
        color = "blue";
    } else if ((r == 0) && (b == 2) && (g == 2)) {
        color = "red";

    } else if ((r == 2) && (b == 1) && (g == 1)) {
        color = "red";
    } else if ((r == 1) && (b == 2) && (g == 1)) {
        color = "blue";
    } else if ((r == 1) && (b == 1) && (g == 2)) {
        color = "green";
    }

    // Situations where three of the four neighboring boxes are colored
    else if ((r == 3) && (b == 0) && (g == 0)) {
        color = "red";
    } else if ((b == 3) && (r == 0) && (g == 0)) {
        color = "blue";
    } else if ((g == 3) && (r == 0) && (b == 0)) {
        color = "green";

    } else if (((r == 2) && (b == 1) && (g == 0)) || ((r == 0) && (b == 1) && (g == 2))) {
        color = "blue";
    } else if (((r == 1) && (b == 2) && (g == 0)) || ((r == 1) && (b == 0) && (g == 2))) {
        color = "red";
    } else if (((r == 0) && (b == 2) && (g == 1)) || ((r == 2) && (b == 0) && (g == 1))) {
        color = "green";

    } else if (((r == 1) && (b == 1) && (g == 1))) {
        color = "white";
    }

    // Situations where two of the four neighboring boxes are colored
    else if ((r == 2) && (b == 0) && (g == 0)) {
        color = "red";
    } else if ((b == 2) && (r == 0) && (g == 0)) {
        color = "blue";
    } else if ((g == 2) && (r == 0) && (b == 0)) {
        color = "green";

    } else if (r == 1 && b == 1 && g == 0) {
        color = "green";
    } else if (r == 0 && b == 1 && g == 1) {
        color = "red";
    } else if (r == 1 && b == 0 && g == 1) {
        color = "blue";
    }


    // Situations where one of the four neighboring boxes is colored
    else if ((r == 1) && (b == 0) && (g == 0)) {
        color = thisColor;
    } else if ((b == 1) && (r == 0) && (g == 0)) {
        color = thisColor;
    } else if ((g == 1) && (b == 0) && (r == 0)) {
        color = thisColor;
    } else {
        color = thisColor;
    }
    newBoard[x].push(color);
    fillBoard(newBoard);
    if (runFlag) {
        step++;
        setTimeout(runRules, 100);
    }
}

function fillBoard(newBoard) {
    var colorCount = Object;
    var countPara = document.getElementById("countPara");
    var toggleRunButton = document.getElementById("toggleRunButton");
    var noChange = true;
    colorCount.red = 0;
    colorCount.blue = 0;
    colorCount.green = 0;
    colorCount.white = 0;

    countPara.innerHTML = "";
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            var box = document.getElementById(board[x][y]);
            var oldColor = box.getAttribute("fill");
            var color = newBoard[x][y];
            box.setAttribute("fill", color);
            colorCount[color]++;
            if (oldColor != color) {
                noChange = false;
            }
        }
    }
    countPara.innerHTML = "On step " + step + ", red = " + colorCount.red + ", blue = " + colorCount.blue + ", green = " + colorCount.green + ", white = " + colorCount.white + ".";
    if (noChange) {
        runFlag = false;
        toggleRunButton.value = "Run ";
    }
}