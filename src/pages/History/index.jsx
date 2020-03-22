import React, {useState, useEffect} from 'react';
import Api from '../../components/Api/Api';
import './style.scss';
import SingleHistoryRow from '../../components/SingleRow/SingleHistoryRow';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const History = () => {
    const [ obj, setObj ] = useState(false);

    useEffect(()=>{
        Api.fetchHistory().then(res => setObj(res))
    },[])

    if(!obj){
        return (
            <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "93vh" }}>
                <LoadingIndicator>Loading data, please wait</LoadingIndicator>
            </div>
        )
    }
    return (
        <div className="content history">
            <ScrollToTop />
            <h1>History</h1>
            <table>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                {obj.map(history=>{
                    return <SingleHistoryRow {...history} key={history.id} />
                })}
                </tbody>
            </table>
        </div>
    );
}

export default History;