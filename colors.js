//Returns an array of 100 colors that continuous convert from startColor to endColor. The first position of the array is startColor and the 100th position is endColor. Start and end colors are in string form, intermediate colors are in rgb(red,blue,green) form.

function findIntermediateColors(startColor, endColor) {
    if (startColor != endColor) {
        var tempColor = [],
            startRGBArray = getRGB(startColor),
            endRGBArray = getRGB(endColor),
            startRed = startRGBArray[0],
            startBlue = startRGBArray[1],
            startGreen = startRGBArray[2],
            endRed = endRGBArray[0],
            endBlue = endRGBArray[1],
            endGreen = endRGBArray[2];
            tempColor.push(startColor);
        for (let i = 1; i < 99; i++) {
            tempRed = parseInt(((endRed * i + startRed * (100 - i)) / 100)).toString();
            tempBlue = parseInt(((endBlue * i + startBlue * (100 - i)) / 100)).toString();
            tempGreen = parseInt(((endGreen * i + startGreen * (100 - i)) / 100)).toString();
            tempColor.push("rgb(" + tempRed.toString() + ", " + tempBlue.toString() + ", " +  tempGreen.toString() + ")");
        }
        tempColor.push(endColor);
        return tempColor;
    }
    return null;
}

//Given an array of boxes to fill, with the range of colors from startColor to fillColor (where the color actually changes),fill all the boxes with each color in the range.

function changeColors(boxes) {
    var i = 1;
    var boxToFill,
        box,
        color;
    var int = setInterval(paint, 15);
    function paint() {
        if (i >= 100) {
            clearInterval(int);
            //Update the score
            score();
            handleSomeoneWins;
        } else {
            for (let j = 0; j < boxes.length; j++) {
                boxToFill = boxes[j];
                box = boxToFill.box;
                color = boxToFill.tempColors[i];
                box.setAttribute("fill", color);
            }
            i++
        }
    }
}
