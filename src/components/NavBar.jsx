import React from 'react';
function NavBar (displayName, onLogout) {
    return (
    <nav className='navbar'>
        <a className='' href="/main">App</a>
        <span className='navbar-text'>
            {displayName}
        </span>
        <button className='btn' onClick={onLogout}></button>

    </nav>)
}

export default NavBar;