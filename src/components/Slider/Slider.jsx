import React, { useState } from 'react';
import './style.scss'

const SingleImage = ({link, handleClick}) => {
    return <img src={link} alt="obrazek" onClick={() => handleClick(link)} style={{cursor: 'pointer'}}></img>
}

const ModalWindow = ({isVisible, link, handleCloseBtn}) => {

    const closeButton = {
    fontSize: '3rem',
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    cursor: 'pointer'
    }
    
    return <div className='modal' style={{display: isVisible ? 'flex' : 'none'}}><div style={closeButton} onClick={()=>{handleCloseBtn()}}>×</div><img src={link} alt="Modal Window SpaceX" /></div>
}

const Slider = ({ links, style }) => {
    const [ counter, setCounter] = useState(0);
    const [ link, setLink ] = useState();
    const [ isVisible, setIsVisible ] = useState(false);

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

    const openModalBtn = (link) => {
        setLink(link);
        setIsVisible(true)
    }
    const closeModalBtn = () => {
        setIsVisible(false)
    }

    return (
        <>
        <ModalWindow isVisible={isVisible} link={link} handleCloseBtn={closeModalBtn}/>
        <div className="slider" style={style}>
            <button className="buttonLeft" onClick={handleLeftButton}>◁</button>
            <div className="tape" style={{ transform: `translateX(-${counter}00%)` }}>
                {links.map(link => {
                    return <SingleImage link={link} handleClick={openModalBtn} key={link}/>
                })}
            </div>
            <button className="buttonRight" onClick={handleRightButton}>▷</button>
        </div>
        </>
    )
}

export default Slider;