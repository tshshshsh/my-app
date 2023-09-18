"use client";
import { useState } from 'react';

import Row from '@/components/ui/Row';
import Board from './Board';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;


    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            const coords = findCoords(history[move], history[move - 1]);
            if (move === currentMove) {
                description = 'You are at move #' + currentMove + ' (' + coords + ')';
                return <li key={move}>{description}</li>;
            }

            description = 'Go to move #' + move
                + ' (' + coords + ')';


        } else {
            description = 'Go to game start';
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });


    return (
        <Row>
            <div className="text-center my-9">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                <ol>{moves}</ol>
            </div>
        </Row>
    )
}

function findCoords(current, prev) {
    const index = current.findIndex((el, i) => el !== prev[i]);
    return Math.floor(index / 3 + 1) + ',' + (index % 3 + 1);
}
