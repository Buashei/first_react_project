import React, {useEffect, useState} from 'react';
import Api from '../../components/Api/Api';
import './style.scss';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const LandingPads = () => {

    const [ obj, setObj ] = useState(false)
    useEffect(()=>{
        Api.fetchLandingPads().then(res => setObj(res))
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
                        <th>ID</th>
                        <th>Status</th>
                        <th>Location</th>
                        <th>Attempted Landings</th>
                        <th>Successful Landings</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                {obj.map(landpads=>{
                    return <tr key={landpads.id} ><td>{landpads.id}</td><td  style={landpads.status === 'active' ? {color: 'green'} : {color: 'red'}}>{landpads.status}</td><td>{landpads.location.name}</td><td>{landpads.attempted_landings}</td><td>{landpads.successful_landings}</td><td>{landpads.details}</td></tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default LandingPads;