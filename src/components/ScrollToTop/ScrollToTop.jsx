import React, { useState, useEffect } from 'react';
import './style.scss'

const ScrollToTop = () => {
    const [ isVisible, setIsVisible ] = useState(false);
    useEffect(()=>{
        document.addEventListener("scroll", (()=>
            {window.pageYOffset > 50 ? setIsVisible(true) : setIsVisible(false) }
        ));
    
    },[])

    return (
        <div className="scrollToTopWrapper">
            {isVisible && <button className="scrollToTop" onClick={event => {event.preventDefault(); window.scrollTo({top: 0,behavior: "smooth"})}}>▲</button>}
        </div>)
}

export default ScrollToTop;