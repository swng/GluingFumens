const { decoder, encoder } = require('tetris-fumen');

colorMapping = {
    "S": 7,
    "J": 6,
    "T": 5,
    "Z": 4,
    "O": 3,
    "L": 2,
    "I": 1
}

reverseMapping = {
    7: 4,
    4: 7,
    6: 2,
    2: 6,
    5: 5,
    3: 3,
    1: 1,
    0: 0,
    8: 8
}

reverseMappingLetters = {
    "L": "J",
    "J": "L",
    "S": "Z",
    "Z": "S",
    "T": "T",
    "O": "O",
    "I": "I",
}

reverseMappingRotation = {
    "spawn": "spawn",
    "right": "left",
    "reverse": "reverse",
    "left": "right"
}

var fumenCodes = []
for(let rawInput of process.argv.slice(2)){
    fumenCodes.push(...rawInput.split(" "));
}

for (let code of fumenCodes) {
    let inputPages = decoder.decode(code);
    for (let i = 0; i < inputPages.length; i++) {

        board = inputPages[i]["_field"]["field"]["pieces"];
        for (let rowIndex = 0; rowIndex < 23; rowIndex++) {
            row = board.slice(rowIndex * 10, (rowIndex + 1) * 10);
            for (let colIndex = 0; colIndex < 10; colIndex++) {
                board[rowIndex * 10 + colIndex] = reverseMapping[row[9 - colIndex]];
            }
        }

        op = inputPages[i]["operation"];
        if (op) {
            op.type = reverseMappingLetters[op.type];
            op.x = 9 - op.x;
            if ("IO".includes(op.type)) op.x--; // thonk
            if ("SZLJT".includes(op.type)) op.rotation = reverseMappingRotation[op.rotation];
        }

    }

    console.log(encoder.encode(inputPages));
}