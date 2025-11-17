import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <ul>
            <li><button><Link to='/home'>Home</Link></button></li>
            <li><button><Link to='/series'>Les Séries</Link></button></li>
            <li><button><Link to='/films'>Les Films</Link></button></li>
        </ul>
    )
}
export default Navigation;
