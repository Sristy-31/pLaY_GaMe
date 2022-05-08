import React, { useState } from 'react';
import "./tic_tac_toe.css";

const TicTacToe = () => {
	const [turn, setTurn] = useState('x');
	const [cells, setCells] = useState(Array(9).fill(''));
	const [winner, setWinner] = useState('-1');

	const renderContent = () => {
		if(winner === '2')
		return <div className="winner">Draw</div>;
		else if(winner === 'x' || winner === 'o')
		return <div className="winner">{winner} is the winner!!</div>;
		else
		return
	};

	const checkForWinner = (squares) => {
		let combos = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagnol: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};

		for (let combo in combos) {
			combos[combo].forEach((pattern) => {
				if (
					squares[pattern[0]] === '' ||
					squares[pattern[1]] === '' ||
					squares[pattern[2]] === ''
				) {
					// do nothing
				} else if (
					squares[pattern[0]] === squares[pattern[1]] &&
					squares[pattern[1]] === squares[pattern[2]]
				) {
					setWinner(squares[pattern[0]]);
				}
			});
		}
	};

	// const checkForDraw = (squares) => {
	// 	let c=0;
	// 	for(let cell in squares)
	// 	{
	// 		if(squares[cell] !== ''){
	// 			c++;
	// 		}
	// 	}
	// 	if(c === 9 && winner === '-1'){
	// 		setWinner('2');
	// 		console.log("draw");
	// 	}
	// }

	const handleClick = (num) => {
		if (cells[num] !== '') {
			return;
		}

		let squares = [...cells];

		if (turn === 'x') {
			squares[num] = 'x';
			setTurn('o');
		} else {
			squares[num] = 'o';
			setTurn('x');
		}

		checkForWinner(squares);
		setCells(squares);
		//  if(winner === '-1'){
		//  checkForDraw(squares);
		//  console.log("check");}
	};

	const handleRestart = () => {
		setWinner(null);
		setCells(Array(9).fill(''));
	};

	const Cell = ({ num }) => {
		return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
	};

	return (
		<div className='tic_tac_toe_wrapper'>
            <div className="turn">
				Turn: {turn}
            </div>
			<table className="tic_tbl">
				<tbody>
					<tr>
						<Cell num={0} />
						<Cell num={1} />
						<Cell num={2} />
					</tr>
					<tr>
						<Cell num={3} />
						<Cell num={4} />
						<Cell num={5} />
					</tr>
					<tr>
						<Cell num={6} />
						<Cell num={7} />
						<Cell num={8} />
					</tr>
				</tbody>
			</table>
				<>
                      {winner && renderContent()}
					<button className="button btn btn-outline-primary" onClick={() => handleRestart()}>Play Again</button>
				</>
		</div>
	);
};

export default TicTacToe;