import React, {useEffect, useState} from 'react';
import Api from '../../components/Api/Api'
import './style.scss'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const Rockets = () => {

    const [ obj, setObj ] = useState(false)
    useEffect(()=>{
        Api.fetchRockets().then(res => setObj(res))
    },[])
    
    const handleTrClick = (event, link) => {
        event.preventDefault();
        window.location.href=(`/rockets/${link}`);
    }

    if(!obj){
        return (
            <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "93vh" }}>
                <LoadingIndicator>Loading data, please wait</LoadingIndicator>
            </div>
        )
    }
    return (
        <div className="content rockets">
            <ScrollToTop />
            <h1>Rockets</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>Success Rate</th>
                    </tr>
                </thead>
                <tbody>
                {obj.map(rocket=>{
                    return <tr key={rocket.id}  onClick={event=>handleTrClick(event, rocket.rocket_id)} ><td>{rocket.rocket_name}</td><td style={rocket.active ? {color: 'green'} : {color: 'red'}}>{rocket.active ? "Active" : "Inactive"}</td><td>{rocket.height.meters}(meters)<br />{rocket.height.feet}(feets)</td><td>{rocket.mass.kg}(kg)<br />{rocket.mass.lb}(lb)</td><td>{rocket.success_rate_pct}%</td></tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Rockets;