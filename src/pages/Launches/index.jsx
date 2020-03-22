import React, {useEffect, useState} from 'react';
import moment from 'moment'
import Api from '../../components/Api/Api'
import './style.scss'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const Launches = () => {

    const [ obj, setObj ] = useState(false);
    const [ fetchValue, setFetchValue ] = useState("past");

    useEffect(()=>{
        Api.fetchLaunches(fetchValue).then(res => setObj(res))
    },[fetchValue])

    const handleTrClick = (event, link) => {
        event.preventDefault();
        window.location.href=(`/launches/${link}`);
    }

    if(!obj){
        return <div className="content cores" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "93vh" }}><LoadingIndicator>Loading data, please wait</LoadingIndicator></div>
    }
    return (
        <div className="content launches">
            <ScrollToTop />
            <select onChange={event=>{setFetchValue(event.target.value); console.log(fetchValue)}}>
                <option value={"past"}>Past Launches</option>
                <option value={"upcoming"}>Upcoming Launches</option>
                <option value={""}>All Launches</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Date <p className="small">(UTC+0100)</p></th>
                        <th>Patch</th>
                        <th>Name</th>
                        <th>Rocket</th>
                        <th>Site</th>
                    </tr>
                </thead>
                <tbody>
                {obj.map(launch=>{
                    return <tr key={launch.mission_name} onClick={event=>handleTrClick(event, launch.flight_number)}><td className="date">{moment(launch.launch_date_utc).format('MMMM Do YYYY[\n]h:mm:ss a')}</td><td>{launch.links.mission_patch_small ? <img src={launch.links.mission_patch_small} alt="SpaceX Mission Patch"></img> : "Coming soon"}</td><td>{launch.mission_name}</td><td>{launch.rocket.rocket_name}</td><td>{launch.launch_site.site_name_long}</td></tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Launches;