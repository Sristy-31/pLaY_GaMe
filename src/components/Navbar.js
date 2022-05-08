import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [active, setActive] = useState('');

    useEffect(() => {
        let currentURL = window.location.href
        if(currentURL.endsWith("/"))
        setActive('TicTacToe');
        else if(currentURL.endsWith("/sudoku"))
        setActive('Sudoku')
    }, [active])

    return(
        <div className="navbar">
            <div className="navbar_active">
                {active}
            </div>
            <div className="navbar_items">
               <Link to="/">
                {active !== 'TicTacToe' && <div className="navbar_item" onClick={()=>setActive('TicTacToe')}>TicTacToe</div>}
                </Link>
                <Link to="/sudoku">
                {active !== 'Sudoku' && <div className="navbar_item" onClick={()=>setActive('Sudoku')}>Sudoku</div>}
                </Link>
            </div>
        </div>
    )
};

export default Navbar;