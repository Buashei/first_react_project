import React, { useState } from 'react';
import './style.scss'

const SingleImage = ({link, handleClick}) => {
    return <img src={link} alt="obrazek" onClick={() => handleClick(link)}></img>
}

const ModalWindow = (link) => {
    const [isVisible, setIsVisible] = useState(false);
    {link && setVisible(true)}
    const fullScreenStyle = {
        display: 'none',
        position: 'fixed',
        height: '100vh',
        width: '100%',
        left: '0',
        top: '0',
        background: 'rgba(0,0,0,0.7)',
        zIndex: '999',
    };

    return <div className="fullScreen"><img scr="" alt="Modal Window SpaceX" style={fullScreenStyle}></img></div>
}

const Slider = ({ links, style }) => {
    const [ counter, setCounter] = useState(0);
    const [ link, setLink ] = useState()

    const handleLeftButton = event => {
        event.preventDefault();
        if (counter === 0) {
            setCounter(links.length - 1)
        } else {
            setCounter(prev => prev - 1)
        }
    };

    const handleRightButton = event => {
        event.preventDefault();
        if (counter === links.length - 1) {
            setCounter(0)
        } else {
            setCounter(prev => prev + 1)
        }

    };

    const fullScreenToggle = (link) => {
        setLink(link)
    }

    return (
        <>
        <ModalWindow link={link}/>
        <div className="slider" style={style}>
            <button className="buttonLeft" onClick={handleLeftButton}>◁</button>
            <div className="tape" style={{ transform: `translateX(-${counter}00%)` }}>
                {links.map(link => {
                    return <SingleImage link={link} handleClick={fullScreenToggle} key={link}/>
                })}
            </div>
            <button className="buttonRight" onClick={handleRightButton}>▷</button>
        </div>
        </>
    )
}

export default Slider;