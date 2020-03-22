import React from 'react';
import imgSrc from '../../assets/elonsaysno.jpg';
import './style.scss';

const Error404 = () => {
    return (
        <div className="error">
        <img src={imgSrc} alt="Sad Elon saying no, cause we have a 404 Error" />
        </ div>
    );
}

export default Error404;