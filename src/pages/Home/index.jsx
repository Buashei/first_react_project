import React, { useState, useEffect } from 'react';

import Api from '../../components/Api/Api';
import './style.scss';
import LaunchClock from '../../components/LaunchClock/launchclock';
import Search from '../../components/Search/search'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import Slider from '../../components/Slider/Slider';


const Home = () => {
    const [ aboutObj, setAboutObj ] = useState(false);
    const [ aboutElonsTesla, setAboutElonsTesla ] = useState(false);

    useEffect(() => {
        Api.fetchInfo().then(res => setAboutObj(res))
        Api.fetchElonsRoadster().then(res => setAboutElonsTesla(res))
    }, [])

    if (!aboutObj) {
        return (
            <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "93vh" }}>
                <LoadingIndicator>Loading data, please wait</LoadingIndicator>
            </div>
        );
    }
    return (
        <div className="home">
            <ScrollToTop />
            <div className="content">
                <h1>Explore our history</h1>
                <LaunchClock />
                <Search />
            </div>
            <div className="info">
                <p className="about">About {aboutObj.name}</p>
                <p className="summary">{aboutObj.summary}</p>
                <p className="big">Company name</p>
                <p>Employees: {aboutObj.employees}</p>
                <p>Vehicles: {aboutObj.vehicles}</p>
                <p>Launch sites: {aboutObj.launch_sites}</p>
                <p>Test sites: {aboutObj.test_sites}</p>
                <p>Valuation: {aboutObj.valuation} $</p>
                <p>Headquater: {(aboutObj.headquarters || {}).address}, {(aboutObj.headquarters || {}).city}, {(aboutObj.headquarters || {}).state}</p>
                <p className="big">Company leadership</p>
                <p>Founder: {aboutObj.founder}</p>
                <p>CEO: {aboutObj.ceo}</p>
                <p>COO: {aboutObj.coo}</p>
                <p>CTO: {aboutObj.cto}</p>
                <p>CTO propulsion: {aboutObj.cto_propulsion}</p>
                <p className="links"><a target="_blank" rel="noopener noreferrer" href={(aboutObj.links || {}).website}>Website</a> | <a target="_blank" rel="noopener noreferrer" href={(aboutObj.links || {}).flickr}>Flickr</a> | <a target="_blank" rel="noopener noreferrer" href={(aboutObj.links || {}).twitter}>Twitter</a> | <a target="_blank" rel="noopener noreferrer" href={(aboutObj.links || {}).elon_twitter}>Elon's Twitter</a></p>
            </div>
            <div className="info">
                <p className="about">{aboutElonsTesla.name}</p>
                <p className="time">{aboutElonsTesla.launch_date_utc}</p>
                <p className="details">{aboutElonsTesla.details}</p>
                <p>Mass: {aboutElonsTesla.launch_mass_kg}kg, {aboutElonsTesla.launch_mass_lbs}lbs</p>
                <p>Days in space: {aboutElonsTesla.period_days}</p>
                <p>Speed: {aboutElonsTesla.speed_kph}km/h, {aboutElonsTesla.speed_mph}mph</p>
                <p>Earth distance: {aboutElonsTesla.earth_distance_km}km, {aboutElonsTesla.earth_distance_mi}mi</p>
                <p>Mars distance: {aboutElonsTesla.mars_distance_km}km, {aboutElonsTesla.mars_distance_mi}mi</p>
                <p><a className="wikipediaBtn" target="_blank" rel="noopener noreferrer" href={aboutElonsTesla.wikipedia}>Wikipedia</a></p>
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/aBr2kKAHN6M`} samesite='None-requires-Secure' frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="spaceX" allowFullScreen></iframe>
                {!aboutElonsTesla.flickr_images ? "" : <Slider links={aboutElonsTesla.flickr_images} style={{margin: '3rem 0'}} />}
            </div>
            <div className="info">

            </div>
        </div>
    )
}

export default Home;