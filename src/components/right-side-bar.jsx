// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../components/stateprovider";
import Calendar from 'react-calendar';
import '../styles/calendar.css'
import React, { useState } from 'react';
import '../styles/right-side-bar.css';
import DoctorIcon from './doctorIcon';
import {FiLogOut} from 'react-icons/fi';

export default function RightSideBar() {

    const context = useContext(AppContext);
    const navigate = useNavigate();
    const [calDate, setCalDate] = useState(new Date())

    function onChange(calDate) {
        // change results based on calendar date click
        setCalDate(calDate)
    }

    function logOut() {
        context.dispatch({
            type: "LOGOUT",
        });

        
        navigate("/login");
        console.log(context);
    }

    return (
        <div className="right-column">
            <div className="logout-container">
                <FiLogOut style={{fontSize: '25px', color: "#212121"}}/>
                <span id="logout-text" onClick={logOut}>Log Out</span>
            </div>
            <div className="main-container">
                <DoctorIcon/>
                <div className="calender-container">
                    <h4 style={{margin: '15% 4% 2% 10%', fontWeight: 'lighter'}}>
                        Calendar</h4>
                    <Calendar className="calendar" onChange={onChange} value={calDate} />
                </div>
            </div>
        </div>
    )
}
