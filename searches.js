//Search the board looking for "squares" – four tiles with the same fill color that occupy the corners of a square.
function findSquares(box) {
    var boxX = parseInt(box.id.split("_")[0]),
        boxY = parseInt(box.id.split("_")[1]),
        color = box.getAttribute("fill");
    var upNear = findNearest(box, color, "up"),
        downNear = findNearest(box, color, "down"),
        leftNear = findNearest(box, color, "left"),
        rightNear = findNearest(box, color, "right");
    var upColor = findColor(box, 0, -upNear),
        downColor = findColor(box, 0, downNear),
        leftColor = findColor(box, -leftNear, 0),
        rightColor = findColor(box, rightNear, 0);
    console.log("up color = " + upColor + ", down color = " + downColor + ", left color = " + leftColor + " right color = " + rightColor);
}

function findColor(box, dx, dy) {
    var boxX = parseInt(box.id.split("_")[0]),
        boxY = parseInt(box.id.split("_")[1]),
        color = "white";
    if ((Math.abs(dx) != size + 1) && (Math.abs(dy) != size + 1)) {
        var id = (boxX + dx).toString() + "_" + (boxY + dy).toString();
        color = document.getElementById(id).getAttribute("fill");
    }
    return color;
}

    function findNearest(box, color, direction) { //Returns the distance of the nearest box with the fill <color> in the direction <direction> from box. If no such box exists, returns the dimention of the board plus 1.
        var boxX = parseInt(box.id.split("_")[0]),
            boxY = parseInt(box.id.split("_")[1]),
            index,
            returnIndex = size + 1;
        if (direction === "down") {
            index = 1;
            searchY = boxY + index;
            while ((searchY >= 0) && (searchY < size - 1)) {
                searchId = boxX.toString() + "_" + (boxY + index).toString();
                searchBox = document.getElementById(searchId);
                searchColor = searchBox.getAttribute("fill");
                if (searchColor === color) {
                    return index;
                } else {
                    index++;
                    searchY = boxY + index;
                }
            }
            return returnIndex;
        }
        if (direction === "up") {
            index = 1;
            searchY = boxY - index;
            while ((searchY >= 0) && (searchY < size - 1)) {
                searchId = boxX.toString() + "_" + (boxY - index).toString();
                searchBox = document.getElementById(searchId);
                searchColor = searchBox.getAttribute("fill");
                if (searchColor === color) {
                    return index;
                } else {
                    index++;
                    searchY = boxY - index;
                }
            }
            return returnIndex;
        }
        if (direction === "right") {
            index = 1;
            searchX = boxX + index;
            while ((searchX >= 0) && (searchX < size - 1)) {
                searchId = (boxX + index).toString() + "_" + boxY.toString();
                searchBox = document.getElementById(searchId);
                searchColor = searchBox.getAttribute("fill");
                if (searchColor === color) {
                    return index;
                } else {
                    index++;
                    searchX = boxX + index;
                }
            }
            return returnIndex;
        }
        if (direction === "left") {
            index = 1;
            searchX = boxX - index;
            while ((searchX >= 0) && (searchX < size - 1)) {
                searchId = (boxX - index).toString() + "_" + boxY.toString();
                searchBox = document.getElementById(searchId);
                searchColor = searchBox.getAttribute("fill");
                if (searchColor === color) {
                    return index;
                } else {
                    index++;
                    searchX = boxX - index;
                }
            }
            return returnIndex;
        }
    }