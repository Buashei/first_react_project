import React, {useState} from 'react';
import moment from 'moment';

const SingleCoreRow = ({ core_serial, status, original_launch, missions, details, reuse_count, rtls_attempts, rtls_landings, asds_attempts, asds_landings, water_landing }) => {
    const [ dropDownClick, setDropDownClick ] = useState(false);
    
    const handleDropDown = () => {
        !dropDownClick ? setDropDownClick(true) : setDropDownClick(false)
    }
    return (
        <>
        <tr className="dropdownParent" onClick={handleDropDown} style={dropDownClick ? {backgroundColor: 'rgba(255,255,255,.4)'} : {backgroundColor: ''}}>
            <td className="date">{moment(original_launch).format('MMMM Do YYYY[\n]h:mm:ss a')}</td>
            <td  style={status === 'active' ? {color:'green'} : {color:'red'}}>{status}</td>
            <td>{core_serial}</td><td>{missions.map(mission=>mission.name)}</td>
            <td>{details}</td>
        </tr>
        <tr><td colSpan="5"  className="dropdown" style={dropDownClick ? {backgroundColor: 'rgba(255,255,255,.4)', display: 'table-cell'} : {display: 'none'}}>
            <p>Reuse: {reuse_count}</p>
            <p>RTLS attempts: {rtls_attempts}</p>
            <p>RTLS landings: {rtls_landings}</p>
            <p>ASDS attempts: {asds_attempts}</p>
            <p>ASDS landings: {asds_landings}</p>
            <p>Water landings: {water_landing ? "yes" : "no"}</p>
        </td></tr>
        </>
    )
}

export default SingleCoreRow;