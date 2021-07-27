// const dimensions
const ROW = 20;
const COL = 10;
const SqU = 20;

const VACANT = '#000000';

// create board
let board = [ ];

for ( let r = 0; r < ROW; r++) {
    board[r] = [ ];
    console.log(r)

    for( let c = 0; c < COL; c++) {
        board[r][c] = VACANT;
    }
}

// select canvas
const cvs = document.getElementById("singleTetris");
const ctx = cvs.getContext("2d");

// square draw function
function drawSquare(x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SqU, y*SqU, SqU, SqU);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*SqU, y*SqU, SqU, SqU);
};

drawSquare(0,0,'red')