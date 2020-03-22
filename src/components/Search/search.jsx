import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './style.scss';
import Api from '../Api/Api';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

const Search = () => {
    const [ selectedValue, setSelectedValue ] = useState();
    const [ searchingOptions, setSearchingOptions ] = useState(false);
    const [ launches, setLaunches ] = useState(false);
    const [ rockets, setRockets ] = useState(false);

    useEffect(() => {
        Api.fetchLaunches().then(res => setLaunches(res))
        Api.fetchRockets().then(res => setRockets(res))
    }, []);

    const selectStyle = {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        transition: 'all .3s linear',
        fontSize: '1rem',
    }

    let launchesLabels = []
    if (launches !== false) {
        launchesLabels = launches.map(launch => {return { value:launch.flight_number, label: launch.mission_name }})
    }
    let rocketsLabels = []
    if (rockets !== false) {
        rocketsLabels = rockets.map(rocket => {return { value:rocket.rocket_id, label: rocket.rocket_name }})
    }

    return (
        <div className="search">
            <div className="tab">
                <select onChange={event => setSearchingOptions(event.target.value)} style={(searchingOptions ? selectStyle : null)}>
                    <option hidden>Select searching option</option>
                    <option>Launch search</option>
                    <option>Rocket search</option>
                </select>
                {!launches && !rockets ? <LoadingIndicator /> : 
                <Select
                    onChange={event => setSelectedValue(event.value)}
                    options={searchingOptions === 'Launch search' ? launchesLabels : rocketsLabels}
                    className={'autocomplete'}
                    classNamePrefix={'autocomplete'}
                    isSearchable={true}
                    styles={{container: styles => ({...styles, opacity: searchingOptions && '1'})}}
                />}
            </div>
            <button onClick={event=>{event.preventDefault(); !selectedValue ? alert('Please select searching option') : searchingOptions === 'Launch search' ? window.location.href=`/launches/${selectedValue}` : window.location.href=`/rockets/${selectedValue}`}}>SEARCH</button>
        </div>
    )
}
export default Search;