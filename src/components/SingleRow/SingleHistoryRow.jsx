import React, {useState} from 'react';
import moment from 'moment';

const SingleHistoryRow = ({ id, title, event_date_utc, details, links }) => {
    const [ dropDownClick, setDropDownClick ] = useState(false);
    
    const handleDropDown = () => {
        !dropDownClick ? setDropDownClick(true) : setDropDownClick(false)
    }
    return (
        <>
        <tr className="dropdownParent" onClick={handleDropDown} style={dropDownClick ? {backgroundColor: 'rgba(255,255,255,.4)'} : {backgroundColor: ''}}>
            <td>{id}</td>
            <td>{title}</td>
            <td className="date">{moment(event_date_utc).format('MMMM Do YYYY[\n]h:mm:ss a')}</td>
        </tr>
        <tr><td colSpan="5"  className="dropdown" style={dropDownClick ? {backgroundColor: 'rgba(255,255,255,.4)', display: 'table-cell'} : {display: 'none'}}>
            <p>{details}</p>
            <p className="link">{links.reddit && <a href={links.reddit}>Reddit</a>}{links.article && <a href={links.article}>Article</a>}{links.wikipedia && <a href={links.wikipedia}>Wikipedia</a>}</p>
        </td></tr>
        </>
    )
}

export default SingleHistoryRow;