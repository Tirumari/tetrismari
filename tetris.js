// import tetrominoes
import { Z, S, J, L, T, I, O, tetrominoes } from "./tetrominoes.js";

// const dimensions
const ROW = 20;
const COL = 10;
const SqU = 40;

const VACANT = '#000000';

// create board chart
let board = [ ];

for (let r = 0; r < ROW; r++) {
    board[r] = [ ];

    for(let c = 0; c < COL; c++) {
        board[r][c] = VACANT;
    }
}

// select canvas
const canvas = document.getElementById("tetrisCanvas");
const ctx = canvas.getContext("2d");

// square draw function
const drawSquare = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x*SqU, y*SqU, SqU, SqU);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*SqU, y*SqU, SqU, SqU);
};

// draw board
for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
        drawSquare(c, r, board[r][c]);
    }
}

class Piece {
    constructor() {
        let ind = Math.round(Math.random()*6);

        this.tetromino = tetrominoes[ind][0];
        this.current = 0;
        this.activeTetromino = this.tetromino[this.current];
        this.color = tetrominoes[ind][1];
        this.x = 3;
        this.y = 0;
    }

    draw = () => {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino[r].length; c++) {
                if(this.activeTetromino[r][c]) {
                    drawSquare(c+this.x, r+this.y, this.color);
                }
            }
        }
    }

    unDraw = () => {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino[r].length; c++) {
                if(this.activeTetromino[r][c]) {
                    drawSquare(c+this.x, r+this.y, VACANT);
                }
            }
        }
    }

    moveDown = () => {
        this.unDraw();
        this.y++;
        this.draw();

        console.log(this.y + this.activeTetromino.length)
    }

    moveRight = () => {
        this.unDraw();
        this.x++;
        this.draw();
    }

    moveLeft = () => {
        this.unDraw();
        this.x--;
        this.draw();
    }

    rotate = () => {
        this.unDraw();
        this.current++;
        if (this.current === this.tetromino.length) {
            this.current = 0;
        }
        this.activeTetromino = this.tetromino[this.current];
        this.draw();
    }

    collisionCheck = () => {
        
    }
}

const crawl = (piece) => {
    console.log('begin crawl')
    // stop at bottom (row 20) when active square (1) is on row 20
        // iterate through tetromino by row, step in and iterate through columns, if this.y+r === 20 && val === 1
    let active = piece.activeTetromino;

    // check if the piece border is at the bottom first
    if ((piece.y + active.length) < 20) {
        setTimeout(() => {
            piece.moveDown();
            crawl(piece);
        }, 500);
        // check if any bottom border pieces are active (1) else crawl
    } else {
        return;
    }
}

const genNewPiece = () => {
    // create new piece
    let piece = new Piece
    piece.draw();
    console.log(piece)

    // add player control with keydown event listener
    document.addEventListener('keydown',(e) => {
        if (e.code === 'ArrowRight') {
            piece.moveRight()
        } else if (e.code === 'ArrowDown') {
            piece.moveDown();
        } else if (e.code === 'ArrowLeft') {
            piece.moveLeft();
        } else if (e.code === 'ArrowUp') {
            piece.rotate();
        }
    })

    // initiate auto-crawl, recursively
    crawl(piece);

    return;
}

export const startGame = () => {
    const startButton = document.getElementById("startButton");
    startButton.disabled = true;
    startButton.classList.add("disabledButt")
    
    console.log('clicked')
    genNewPiece();
}

