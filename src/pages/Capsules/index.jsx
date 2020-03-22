import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Api from '../../components/Api/Api';
import './style.scss';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const Capsules = () => {
    const [ obj, setObj ] = useState(false);

    useEffect(()=>{
        Api.fetchCapsules().then(res => setObj(res))
    },[])

    if(!obj){
        return (
            <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "93vh" }}>
                <LoadingIndicator>Loading data, please wait</LoadingIndicator>
            </div>
        )
    }
    return (
        <div className="content capsules">
            <ScrollToTop />
            <h1>Capsules</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date <p className="small">(UTC+0100)</p></th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Missions</th>
                        <th>Type</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                {obj.map(capsule=>{
                    return <tr key={capsule.capsule_serial}><td className="date">{moment(capsule.original_launch).format('MMMM Do YYYY[\n]h:mm:ss a')}</td><td  style={capsule.status === 'active' ? {color: 'green'} : {color: 'red'}}>{capsule.status}</td><td>{capsule.capsule_serial}</td><td>{capsule.missions.map(mission=>mission.name)}</td><td>{capsule.type}</td><td>{capsule.details}</td></tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Capsules;