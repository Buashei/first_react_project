import React, {useState, useEffect} from 'react';
import Api from '../../components/Api/Api';
import './style.scss';
import SingleCoreRow from '../../components/SingleRow/SingleCoreRow';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const Cores = () => {
    const [ obj, setObj ] = useState(false);


    useEffect(()=>{
        Api.fetchCores().then(res => setObj(res))
    },[])

    if(!obj){
        return (
            <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "93vh" }}>
                <LoadingIndicator>Loading data, please wait</LoadingIndicator>
            </div>
        )
    }
    return (
        <div className="content cores">
            <ScrollToTop />
            <h1>Cores</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date <p className="small">(UTC+0100)</p></th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Missions</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                {obj.map(core=>{
                    return (
                        <SingleCoreRow {...core}  key={core.core_serial} />
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Cores;