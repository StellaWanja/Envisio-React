import React from 'react';
import { useContext } from "react";
import { AppContext } from "../components/stateprovider";
import '../styles/patientData.css';

const DoctorIcon = () => {
  const context = useContext(AppContext);
  console.log(context);
  return (
    <section>
      <div className="top-row-container" id="doctor-icon" style={{marginTop: '5%'}}>
        <div id="doctor-info">
          <div id="doctor-name">
            <p>{context.state.userData.firstName + " " + context.state.userData.lastName}</p>
            <div className="circle"></div>
          </div>
          <p id="hosp-name">{context.state.userData.hospitalName}</p>
        </div>
      </div>
    </section>
  );
};

export default DoctorIcon;
