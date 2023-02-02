import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AppContext } from "../components/stateprovider";
import LeftSideBar from "../components/left-side-bar";
import RightSideBar from "../components/right-side-bar";
import "../styles/result.css";
import swal from "sweetalert";

function Result(){
    const navigate = useNavigate();
    const context = useContext(AppContext);

    function saveResults(){

        let newResult = {
            PatientId: context.state.currentPatient.id,
            Result: context.state.testResult
        }

        console.log(newResult);

        fetch(
            'https://envisio-api.up.railway.app/api/v1/TestResult/test-result', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "Authorization" : `Bearer ${context.state.userData.token}`
            },
            body: JSON.stringify(newResult),
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)

                swal({
                    title: 'Result saved!',
                    text: "Test result saved successfully",
                    icon: "success",
                    button: "Close",
                });
            
                navigate("/patient-data")
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

    return(
        <>
        <div className="dashboard-container">
        <LeftSideBar/>
            
            <div className="result-wrapper">
                <h3 id="result-title">Your test result is ready!</h3>
                <p id="disclaimer">This prediction result should not be used as a substitute for real medical advice. </p>
                <div className="result-container">
                    <p id="result-text">Based on the inputs provided, results show that patient may have a <span id="result-word">{context.state.testResult}</span> tumor. </p>
                </div>

                <button type="submit" className="form-submit" id="add-test-btn" onClick={saveResults}>
                    Save
                </button>
            </div>

        <RightSideBar/>

        </div>
        </>
    )
}

export default Result;