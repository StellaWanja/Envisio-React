import React from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../components/stateprovider";
import { useForm } from "react-hook-form";
import LeftSideBar from '../components/left-side-bar';
import RightSideBar from '../components/right-side-bar';
import "../styles/add-patient.css";
import swal from 'sweetalert';

function AddNewPatient() {
    const { register, handleSubmit } = useForm();
    const context = useContext(AppContext);
    const navigate = useNavigate();
    
    let userid = context.state.userData.id;
    function addPatient(data) {
        const { firstname, lastname, maritalstatus, dob, height, weight, med_history} = data;

        let newpatient = {
            FirstName: firstname,
            LastName: lastname,
            MaritalStatus: maritalstatus,
            DOB: dob,
            Height: height,
            Weight: weight,
            FamilyMedicalHistory: med_history,
            UserId: userid
        };
        console.log(newpatient);

        fetch(`https://envisio-api.up.railway.app/api/v1/register-patient`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization" : `Bearer ${context.state.userData.token}`
            },
            body: JSON.stringify(newpatient),
        })
            .then((res) => res.json())
            .then((result) => {

                context.dispatch({
                    type: 'VIEW_PATIENT',
                    payload: result,
                });

                swal({
                    title: 'Patient Added Successfully!',
                    text: "New patient has been added successfully!",
                    icon: "success",
                    button: "Close",
                });
 
                navigate('/patient-data')
            })
            .catch((err) => {
                swal({
                    title: 'Error!',
                    text: "Unable to complete request. Please try again after some time",
                    icon: "error",
                    button: "Close",
                });
				console.log({ err });
            });
    }

    return (
        <div className="dashboard-container">
            <LeftSideBar />
            <form className="add-patient-form-container column" onSubmit={handleSubmit(addPatient)}>
                <h2 className="edit-profile-title">Edit Profile</h2>
                <div className="profile-grid-container" >
                    <h4 className="personal-details-title">Personal Details</h4>
                    <div className="profile-form" >
                        <div className="profile-input-container">
                            <label>FIRST NAME</label>
                            <input
                                id="firstname"
                                className="profile-input"
                                type="text"
                                {...register("firstname", { required: true })}
                                placeholder=" "
                            />
                        </div>
                        <div className="profile-input-container">
                            <label>LAST NAME</label>
                            <input
                                id="lastname"
                                className="profile-input"
                                type="text"
                                {...register("lastname", { required: true })}
                                placeholder=" "
                            />
                        </div>
                        <div className="profile-input-container">
                            <label>MARITAL STATUS</label>
                            <input
                                id="maritalstatus"
                                className="profile-input"
                                type="text"
                                {...register("maritalstatus", { required: true })}
                                placeholder=" "
                            />
                        </div>
                        <div className="profile-input-container">
                            <label>DATE OF BIRTH (DD/MM/YYYY)</label>
                            <input
                                id="dob"
                                className="profile-input"
                                type="text"
                                {...register("dob", { required: true })}
                                placeholder=" "
                            />
                        </div>
                        <div className="profile-input-container">
                            <label>HEIGHT (IN CM)</label>
                            <input
                                id="height"
                                className="profile-input"
                                type="number"
                                {...register("height", { required: true })}
                                placeholder=" "
                            />
                        </div>
                        <div className="profile-input-container">
                            <label>WEIGHT(IN KG)</label>
                            <input
                                id="weight"
                                className="profile-input"
                                type="number"
                                {...register("weight", { required: true })}
                                placeholder=" "
                            />
                        </div>
                    </div>

                        <div className="input-text-area">
                            <label>Family Medical History</label>
                            <textarea 
                            id="profile-textarea"
                            {...register("med_history", {required:true})}
                                placeholder="Enter notes...">
                                
                            </textarea>
                        </div>
                    
                </div>
            
                    <button type="submit" className="form-submit" id="add-patient-submit-btn">
                        Save
                    </button>
            
            </form>
            <RightSideBar />
        </div>
    )
}

export default AddNewPatient;