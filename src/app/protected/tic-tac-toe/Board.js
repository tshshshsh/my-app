"use client";


import Square from './Square';


export default function Board({ xIsNext, squares, onPlay }) {


    function handleClick(i) {
        if (squares[i] || calculateWinner(squares).winner) {
            return;
        }
        const nextSquares = squares.slice();


        nextSquares[i] = xIsNext ? "x" : 'o';

        onPlay(nextSquares);
    }

    const result = calculateWinner(squares);
    const winner = result.winner;
    const winnerCells = result.cells;

    const move = squares.filter(el => !!el).length;

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (move === 9) {
        status = "It's a draw!"
    } else {
        status = "Next player: " + (xIsNext ? "X" : 'O');
    }

    const boardSquares = [];

    for (let row = 0; row < 3; row++) {
        let squaresItems = [];
        for (let square = 0; square < 3; square++) {
            const index = row * 3 + square;
            let isActive = false;
            if (winnerCells.includes(index)) {
                isActive = true;
            }
            squaresItems.push(
                <Square
                    key={index}
                    isActive={isActive}
                    value={squares[index]}
                    onSquareClick={() => handleClick(index)}
                />
            )
        }
        boardSquares.push(
            <div key={row} className="flex justify-center">
                {squaresItems}
            </div>
        );
    }

    return (
        <>
            <div className="mb-3">{status}</div>
            {boardSquares}
        </>

    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                cells: lines[i]
            }
        }
    }
    return { winner: null, cells: [] };
}

