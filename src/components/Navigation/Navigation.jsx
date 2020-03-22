import React from 'react';
import {Link} from 'react-router-dom';
import imgSrc from '../../assets/logo.png' 

//scss
import './style.scss'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/launches">Launches</Link></li>
                <li><Link to="/cores">Cores</Link></li>
                <li><Link to="/capsules">Capsules</Link></li>
                <img src={imgSrc} alt="SpaceX Logotype"></img>
                <li><Link to="/rockets">Rockets</Link></li>
                <li><Link to="/launchpads">LaunchPads</Link></li>
                <li><Link to="/landpads">LandPads</Link></li>
                <li><Link to="/history">History</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;