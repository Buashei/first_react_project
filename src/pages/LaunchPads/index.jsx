import React, {useEffect, useState} from 'react';
import Api from '../../components/Api/Api';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const LaunchPads = () => {

    const [ obj, setObj ] = useState(false)
    useEffect(()=>{
        Api.fetchLaunchPads().then(res => setObj(res))
    },[])

    if(!obj){
        return (
            <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "93vh" }}>
                <LoadingIndicator>Loading data, please wait</LoadingIndicator>
            </div>
        )
    }
    return (
        <div className="content landpads">
            <ScrollToTop />
            <h1>Landing Pads</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Location</th>
                        <th>Attempted Landings</th>
                        <th>Successful Landings</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                {obj.map(launchpads=>{
                    return <tr key={launchpads.id} ><td>{launchpads.site_name_long}</td><td  style={launchpads.status === 'active' ? {color: 'green'} : {color: 'red'}}>{launchpads.status}</td><td>{launchpads.location.name}</td><td>{launchpads.attempted_launches}</td><td>{launchpads.successful_launches}</td><td>{launchpads.details}</td></tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default LaunchPads;