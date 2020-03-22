import React, { useEffect, useState } from 'react';

const LaunchClock = () => {
    const [ intervalID, setIntervalID ] = useState(0)
    const [ nextLaunchDate, setNextLaunchDate ] = useState(false);
    const [ realDate, setRealDate  ] = useState(new Date());
    useEffect(()=>{
        setIntervalID(
            setInterval(() => {
                setRealDate(new Date());
            }, 1000)
        )
        fetch('https://api.spacexdata.com/v3/launches/next')
            .then(res => res.json())
            .then(res => setNextLaunchDate(res))
        return () => clearInterval(intervalID)
    },[])

    const launch_date = new Date(nextLaunchDate.launch_date_utc).getTime();
    const time_stamp = realDate.getTime();
    const distance = launch_date - time_stamp;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (!nextLaunchDate) {
        return <div className="time">LOADING DATA</div>;
    }
    return <div className="time">NEXT LAUNCH <div className="big">{days}</div> DAYS : <div className="big">{hours}</div> HRS : <div className="big">{minutes}</div> MIN : <div className="big">{seconds}</div> SEC</div>;
}

export default LaunchClock;