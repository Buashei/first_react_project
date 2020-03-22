import React from 'react';
import './style.scss'

const LoadingIndicator = (props) => {
    return (<><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> {props.children}</>)
}

export default LoadingIndicator;