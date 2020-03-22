import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Api from '../../components/Api/Api';
import './style.scss'
import Slider from '../../components/Slider/Slider'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const SingleLaunch = () => {
    const [obj, setObj] = useState(false)
    const { single_launch } = useParams();
    let history = useHistory();
    
    useEffect(() => {
        Api.fetchLaunches(single_launch).then(res => { res.error ? history.push(  '/404') : setObj(res) })
    }, [])
    if (!obj) {
        return (
            <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "93vh" }}>
                <LoadingIndicator>Loading data, please wait</LoadingIndicator>
            </div>
        )
    }
    return (
        <div className="content singleLaunch">
            <ScrollToTop />
            <img className="rocket" src={require(`../../assets/${obj.rocket.rocket_name.toLowerCase()}.png`)} alt="spacex rocket"></img>
            {!obj.links.mission_patch ? null : <img src={obj.links.mission_patch} alt="mission patch" style={{width: "20%", position: "absolute", right: "2rem"}}></img>}
            <h1>#{obj.flight_number} {obj.mission_name}</h1>
            <p className="time">{(new Date(obj.launch_date_unix)).toString()}</p>
            <div className="launch" style={obj.launch_success ? {color: 'green', border: '1px solid green'} : {color: 'red', border: '1px solid red'}}>{obj.launch_success ? 'Launch succeed 🚀' : 'Launch failed'}</div>
            <p className="details">{obj.details}</p>
            {obj.launch_failure_details ? (<ul><p className="big">Launch failure details:</p>
                <li>{(obj.launch_failure_details || {}).time ? `Time: ${obj.launch_failure_details.time}` : ''}</li>
                <li>{(obj.launch_failure_details || {}).altitude ? `Altitude: ${obj.launch_failure_details.altitude}` : ''}</li>
                <li>{(obj.launch_failure_details || {}).reason ? `Reason: ${obj.launch_failure_details.reason}` : ''}</li>
            </ul>) : <p>Launch success: {obj.launch_success && "yes"}</p>}
            <p className="big">Launch site:</p>
            <p>{obj.launch_site.site_name_long}</p>
            <p className="big">Rocket type:</p>
            <p>{obj.rocket.rocket_name}</p>
            {obj.rocket.first_stage && <p className="big">First stage:</p>}
            {(obj.rocket.first_stage.cores || {}).map(core=>{
                return <div key={core.core_serial}>
                        <p>{core.core_serial}</p>
                        <p>Flights: {core.flight}</p>
                        {core.block ? <p>Blocks: {core.block}</p> : null}
                        {core.gridfins ? <p>Grid fins: yes</p> : null}
                        {core.legs ? <p>Legs: yes</p> : null}
                        {core.reused ? <p>Reused: yes</p> : <p>Reused: no</p>}
                        {core.land_success ? <p>Land Success: yes</p> : <p>Land Success: no</p>}
                        {core.landing_intent ? <p>Land Intent: yes</p> : <p>Land Intent: no</p>}
                        {core.landing_type ? <p>Land Type: {core.landing_type}</p> : null}
                        {core.landing_vehicle ? <p>Land Vehicle: {core.landing_vehicle}</p> : null}
                       </div>
            })}

            <p className="big">Second stage:</p>
            <p>Blocks: {(obj.rocket.second_stage || {}).block}</p>
            {(obj.rocket.second_stage.payloads || {}).map(payloads=>{
                return <div key={payloads.payload_id}><h3>Payload</h3>
                        <p>{payloads.payload_id}</p>
                        <p>Customers: {payloads.customers}</p>
                        <p>Nationality: {payloads.nationality}</p>
                        <p>Manufacturer: {payloads.manufacturer}</p>
                        <p>Type: {payloads.payload_type}</p>
                        <p>Mass(kg): {payloads.payload_mass_kg}</p>
                        <p>Mass(lbs): {payloads.payload_mass_lbs}</p>
                        <p>Orbit: {payloads.orbit}</p>
                       </div>
            })}
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${obj.links.youtube_id}`} samesite='None-requires-Secure' frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="spaceX" allowFullScreen></iframe>
            {!obj.link ? null : <p className="big">Links:</p>}
            <p className="link">{obj.links.reddit_campaign && <a href={obj.links.reddit_campaign}>Reddit Campaign</a>}{obj.links.reddit_launch && <a href={obj.links.reddit_launch}>Reddit Launch</a>}{obj.links.reddit_recovery && <a href={obj.links.reddit_recovery}>Reddit Recovery</a>}{obj.links.reddit_media && <a href={obj.links.reddit_media}>Reddit Media</a>}{obj.links.presskit && <a href={obj.links.presskit}>Press Kit</a>}{obj.links.article_link && <a href={obj.links.article_link}>Article Link</a>}{obj.links.wikipedia && <a href={obj.links.wikipedia}>Wikipedia</a>}</p>
            {!obj.links.flickr_images.length ? null :
                        <>
                        <p className="big">Photos:</p>
                        <Slider links={obj.links.flickr_images} />
                        </>}
        </div>
    );
}

export default SingleLaunch;