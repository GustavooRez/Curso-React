import React from 'react';
import './Header.css';

function Header(black){
    return (
        <header className={black ? black : null}>
            <div className="header-logo">
                <a href="/">
                    <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" />
                </a>    
            </div>
            <div className="header-user">
                <a href="/"> 
                    <img src="" />
                </a>

            </div>
        </header>
    )
}

export default Header;