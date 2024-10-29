const possibleMoves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
];

const minValue = 0;
const maxValue = 7;

function listNextPossibleMoves(move) {
    let nextMoves = [];

    possibleMoves.forEach((transformation) => {
        const nextX = move[0] + transformation[0];
        const nextY = move[1] + transformation[1];

        if (
            nextX < minValue ||
            nextX > maxValue ||
            nextY < minValue ||
            nextY > maxValue
        ) {
            return;
        }
        nextMoves.push([nextX, nextY]);
    });

    return nextMoves;
}

function addTheseToQueue(object) {
    const nextMoves = listNextPossibleMoves(object.position);

    let addObjectToQueue = [];

    nextMoves.forEach((move) => {
        const position = move;
        const path = object.path.concat([move]);
        addObjectToQueue.push({ position, path });
    });

    return addObjectToQueue;
}

function knightMoves(start, end) {
    // **Input Validation Start**

    if (!Array.isArray(start) || !Array.isArray(end)) {
        throw new Error("Uh-oh! Start and end points must be arrays.");
    }

    if (start.length !== 2 || end.length !== 2) {
        throw new Error(
            "Uh-oh! Start and end points must have exactly two coordinates."
        );
    }

    const isValidCoordinate = (coord) => {
        return (
            Number.isInteger(coord) && coord >= minValue && coord <= maxValue
        );
    };

    if (
        !isValidCoordinate(start[0]) ||
        !isValidCoordinate(start[1]) ||
        !isValidCoordinate(end[0]) ||
        !isValidCoordinate(end[1])
    ) {
        throw new Error("Uh-oh! Coordinates must be integers between 0 and 7.");
    }

    // **Input Validation End**

    if (start[0] === end[0] && start[1] === end[1])
        return console.log("That's the same spot!");

    let nextMoveQueue = [{ position: start, path: [] }];

    while (nextMoveQueue.length > 0) {
        if (
            nextMoveQueue[0].position[0] === end[0] &&
            nextMoveQueue[0].position[1] === end[1]
        ) {
            const totalPath = [start, ...nextMoveQueue[0].path];
            console.log(`I found it in ${totalPath.length - 1} move(s)!`);
            totalPath.forEach((position) => {
                console.log(`[${position[0]}, ${position[1]}]`);
            });
            break;
        }

        const addToQueue = addTheseToQueue(nextMoveQueue.shift());

        nextMoveQueue = nextMoveQueue.concat(addToQueue);
    }
}

export { knightMoves };
