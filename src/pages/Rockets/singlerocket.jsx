import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Api from '../../components/Api/Api';
import Slider from '../../components/Slider/Slider';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const SingleRocket = () => {

    const [obj, setObj] = useState(false)
    const { single_rocket } = useParams();
    let history = useHistory();
    
    useEffect(() => {
        Api.fetchRockets(single_rocket).then(res => { res.error ? history.push(  '/404') : setObj(res) })
    }, [])
    
    if (!obj) {
        return (
            <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "93vh" }}>
                <LoadingIndicator>Loading data, please wait</LoadingIndicator>
            </div>
        )
    }
    return (
        <div className="content singleRocket">
            <ScrollToTop />
            <img className="rocket" src={require(`../../assets/${obj.rocket_name.toLowerCase()}.png`)} alt="spacex rocket"></img>
            <h1>{obj.rocket_name}</h1>
            <p className="launch" style={obj.active ? {color: 'green', border: '1px solid green', display: 'inline-block'} : {color: 'red', border: '1px solid red', display: 'inline-block'}}>{obj.active ? 'Status: Active 🚀' : 'Status: Inactive'}</p>
            <p className="details">{obj.description}</p>
            <p className="big">Specs:</p>
            <p>Height: {obj.height.meters}meters, {obj.height.feet}feet</p>
            <p>Diameter: {obj.diameter.meters}meters, {obj.diameter.feet}feet</p>
            <p>Mass: {obj.mass.kg}kg, {obj.mass.lb}lb</p>
            <p>Boosters: {obj.boosters}</p>
            <p>Success Rate: {obj.success_rate_pct}</p>
            <p className="big">Engines:</p>
            <p>Engines no.: {obj.engines.number}</p>
            <p>Type: {obj.engines.type}</p>
            {obj.engines.version ? <p>Version: {obj.engines.version}</p> : null}
            <p>Propellant 1: {obj.engines.propellant_1}</p>
            <p>Propellant 2: {obj.engines.propellant_2}</p>
            <p className="big">Payload:</p>
            {obj.payload_weights.map(payload=>{
                return (
                    <div key={payload.name}>
                    <p>Name: {payload.name}</p>
                    <p>Weight: {payload.kg}kg, {payload.lb}lb</p>
                    <br />
                    </div>
                )
            })}
            {obj.landing_legs.number && obj.landing_legs.material ? (
                <>
                <p className="big">Landing legs:</p>
                {obj.landing_legs.number ? <p>Number: {obj.landing_legs.number}</p> : null}
                {obj.landing_legs.material ? <p>Material: {obj.landing_legs.material}</p> : null}
                </>) : null}
            <a href={obj.wikipedia} className="wikipediaBtn">Read more on Wikipedia</a>
            {obj.flickr_images.length === '0' ? null :
                        <>
                        <p className="big">Photos:</p>
                        <Slider links={obj.flickr_images} />
                        </>}
        </div>
    );
}

export default SingleRocket;