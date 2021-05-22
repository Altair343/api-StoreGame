
const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function getARandomOneInRange() {
    return possible.charAt(Math.floor(Math.random() * possible.length));
}

function getRandomFour() {
    return getARandomOneInRange() + getARandomOneInRange()
        + getARandomOneInRange() + getARandomOneInRange()
        + getARandomOneInRange();
}

export const SerialRandom = () => {
    console.log("cargo");
    let ser = `${getRandomFour()}-${getRandomFour()}-${getRandomFour()}-${getRandomFour()}-${getRandomFour()}`;
    return ser;
}


