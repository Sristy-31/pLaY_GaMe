import React from "react";
import TicTacToe from "./Tic_Tac_Toe/TicTacToe";
import Sudoku from "./Sudoku/Sudoku";
import { BrowserRouter as Router ,Route, Routes, Navigate} from 'react-router-dom';
import Navbar from "./Navbar";

function App() {
    return (
       <Router>
           <div className="App">
               <div className="container app_container">
                   <Navbar/>
                    <Routes>
                    <Route path="/" element={<TicTacToe />} />
                    <Route path="/sudoku" element={<Sudoku />} />
                    <Route path='*' element={<Navigate replace to="/" />} />
                    </Routes>
               </div>
           </div>
       </Router>
    );
}

export default App;