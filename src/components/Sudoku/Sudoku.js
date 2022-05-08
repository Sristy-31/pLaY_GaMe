import React, { useState } from "react";
import "./sudoku.css"

const initial = [
    [-1, 5, -1, 9, -1, -1, -1, -1, -1],
    [8, -1, -1, -1, 4, -1, 3, -1, 7],
    [-1, -1, -1, 2, 8, -1, 1, 9, -1],
    [5, 3, 8, 6, -1, 7, 9, 4, -1],
    [-1, 2, -1, 3, -1, 1, -1, -1, -1],
    [1, -1, 9, 8, -1, 4, 6, 2, 3],
    [9, -1, 7, 4, -1, -1, -1, -1, -1],
    [-1, 4, 5, -1, -1, -1, 2, -1, 9],
    [-1, -1, -1, -1, 3, -1, -1, 7, -1]
  ]

function Sudoku() {

    const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial));

    function getDeepCopy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    function onInputChange(e,row,col){
         var val = parseInt(e.target.value) || -1, grid =getDeepCopy(sudokuArr);
         if(val === -1 || (val >= 1 && val <= 9)){
             grid[row][col] = val;
         }

         setSudokuArr(grid);
    }

    function compareSolutions(currentSudoku, solvedSudoku) {
        let res = {
            isComplete: true,
            isSolvable:true
        }
        for (var i=0;i<9;i++)
        {
            for(var j=0;j<9;j++)
            {
                if(currentSudoku[i][j] !== solvedSudoku[i][j])
                {
                    if(currentSudoku[i][j] !== -1){
                        res.isSolvable = false;
                    }
                    res.isComplete = false;
                }
            }
        }
        return res;
    }
    
    //function to check sudoku is valid or not
    function checkSudoku() {
        let sudoku = getDeepCopy(initial);
        solver(sudoku);
        let compare = compareSolutions(sudokuArr, sudoku);
        if(compare.isComplete) {
            alert ("Congratulations ! You have solved Sudoku");
        }else if (compare.isSolvable){
            alert("Keep Going");
        }
        else{
            alert("Sudoku can't be solved, Try Again");
        }
    }

    function checkRow(grid,row,num) {
        return grid[row].indexOf(num) === -1
    }

    function checkCol(grid,col,num) {
        return grid.map(row => row[col]).indexOf(num) === -1;
    }

    function checkBox(grid, row, col, num) {
        let boxArr = [] ,
        rowStart = row - (row%3),
        colStart = col - (col%3);

        for(let i=0; i<3; i++){
          for(let j=0; j<3;j++){
            boxArr.push(grid[rowStart+i][colStart+j]);
          }
        }

        return boxArr.indexOf(num) === -1;
    }

    //function to check sudoku is valid or not
    function checkValid(grid, row, col, num) {
        //num should be unique in row, col and in the square 3X3
        if(checkRow(grid,row,num) && checkCol(grid,col,num) && checkBox(grid, row, col, num)){
            return true;
        }
        return false;
    }

    function getNext(row, col){
        //if colreaches 8, increse row number
        // if row reaches 8 anf col reaches 8, next will be 0,0
        // if col dosent reach 8 , increase col number
        return col !== 8 ? [row, col+1] : row !== 8 ? [row+1, 0] : [0,0];
    }

    function solver(grid, row=0, col=0) {

        // if current cell is already filled,move to the next cell
        if (grid[row][col] !== -1){
            //for last cell, do not solve it
            let isLast = row>=8 && col>=8;
            if(!isLast){
                let [newRow, newCol] = getNext(row,col);
                return solver(grid, newRow, newCol);
            }
        }
        //let num=1;
        for (let num=1; num<=9; num++)
        {
            //check if this num is satisfying sudoku constraints
            if(checkValid(grid, row, col, num)){
                //fill the num in that cell
                grid[row][col] = num;
        let [newRow, newCol] = getNext(row,col);

        if(!newRow && !newCol){
            return true;
        }

        if(solver(grid, newRow, newCol)) {
            return true;
        }
    }
}
 // if its in valid fill with -1
 grid[row][col] = -1;
 return false;


    }

    function solveSudoku() {
        let sudoku = getDeepCopy(initial);
        solver(sudoku);
        setSudokuArr(sudoku);
    }

    //function to reset suduko
    function resetSudoku() {
let sudoku = getDeepCopy(initial);
        setSudokuArr(sudoku);
    }

    return (
        <div className="sudoku_wrapper">
            <div className="sudoku header">
                <div className="title">Sudoku Solver</div>
                <table className="sudoku_tbl">
                    <tbody>
                        {
                            [0,1,2,3,4,5,6,7,8].map((row,rIndex) => {
                                return <tr key={rIndex} className={(row + 1) % 3 === 0 ?"bBorder": ''}>
                                    {
                                    [0,1,2,3,4,5,6,7,8].map((col,cIndex) => {
                                     return <td key={rIndex+cIndex} className={(col+1) % 3 === 0 ? 'rBorder':''}>
                                         <input onChange={(e) => onInputChange(e, row, col)} value={sudokuArr[row][col] === -1 ? '': sudokuArr[row][col]}
                                          className="cellInput"
                                          disabled={initial[row][col] !== -1}/>
                                         </td>
                                    })
                                }
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className="buttonContainer col-md-12 text-center">
                    <button className="check buton" onClick={checkSudoku}>Check</button>
                    <button className="solve buton" onClick={solveSudoku}>Solve</button>
                    <button className="reset buton" onClick={resetSudoku}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default Sudoku;