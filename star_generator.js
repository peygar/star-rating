const STAR_PADDING_RATIO = 0.05;

function getCoordinates(diameter) {
    var radius = diameter / 2.0;
    var angleIncrements = 2 * Math.PI / 5;
    var nextAngle = 0;
    var coordinates = "";
    for (var i = 0; i < 6; i++) {
        let y = radius * (1 - Math.cos(nextAngle));
        let x = radius * (1 - Math.sin(nextAngle));
        coordinates += " " + x + "," + y + " ";
        nextAngle += 2 * angleIncrements;
    }
    return coordinates;
}

function generateStar(coordinates, diameter, starNumber) {
    return `<polygon
                points="${coordinates}"
                transform="translate(${(diameter * (1 + STAR_PADDING_RATIO)) * starNumber})"
                style="fill:gold;" />`;
}

function generateRatingStars(rating, starSize) {
    const coordinates = getCoordinates(starSize);
    var completeStars = parseInt(rating, 10);
    var partialStar = rating - completeStars;
    var stars = "";
    for (var i = 0; i < completeStars; i++) {
        stars += generateStar(coordinates, starSize, i);
    }
    var num_gaps = completeStars - 1;
    if (partialStar > 0.1) {
        num_gaps++;
        stars += generateStar(coordinates, starSize, completeStars);
    }

    var svgWidth = (completeStars * starSize)
                + starSize * STAR_PADDING_RATIO * num_gaps
                + partialStar * starSize;
    return `<svg height="${starSize}" width="${svgWidth}">
            ${stars}
            </svg>`
}

console.log(generateRatingStars(3.5, 50));
