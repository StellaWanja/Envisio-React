import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../components/stateprovider";
import LeftSideBar from '../components/left-side-bar';
import RightSideBar from '../components/right-side-bar';
import Table from '../components/table';
import "../styles/patientData.css";
import swal from "sweetalert";
import styled from 'styled-components'

const Styles = styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    border: none;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th{
        text-align: left;
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: none;
      border-right: none;
      :last-child {
        border-right: 0;
      }
    }
  }
`


function PatientData() {

    const context = useContext(AppContext);
    const navigate = useNavigate();
    const patientId = context.state.currentPatient.id;
    const [results, setResults] = useState([]);

    function changeRoute() {
        let path = `/prediction`;
        navigate(path);
    }

    function viewTestResults () {
		fetch(
			`https://envisio-api.up.railway.app/api/v1/TestResult/all-results?patientId=${patientId}`,
			//allow for use of bearer authentication token
			{ headers: {"Authorization" : `Bearer ${context.state.userData.token}`} }
		)
			.then(res => res.json())
			.then(result => {

                // context.dispatch({
                //     type: "ADD_RESULT",
                //     payload: result,
                // })
                setResults(result);
                console.log(result);

			})
			.catch(err => {
				swal({
                    title: 'Error!',
                    text: "Unable to complete request. Please try again after some time",
                    icon: "error",
                    button: "Close",
                });
				console.log({ err });
			});
    }    

    useEffect(() => {
        viewTestResults()
    }, [patientId]);

    let test, result, date;

    {{results.map((res) => {
        result = res.result;
        test = res.test;
        date = res.date;
    })}}

    return (
        <>
            <div className="dashboard-container">
                <LeftSideBar />
                <div className="patient-data-wrapper">
                    <span className="personal-details-title">Personal Details</span>
                    <span className="personal-details-title" id="medhistory-title">Family Medical History</span>
                    <div className="patient-data-container">

                        <div className="patient-data-div">
                            <ul id="patient-data-list">
                                <li className="patient-data-list-item">FIRST NAME:<span className="list-item-data">{context.state.currentPatient.firstName}</span></li>
                                <li className="patient-data-list-item">LAST NAME:<span className="list-item-data"> {context.state.currentPatient.lastName}</span></li>
                                <li className="patient-data-list-item">MARITAL STATUS:<span className="list-item-data"> {context.state.currentPatient.maritalStatus}</span></li>
                                <li className="patient-data-list-item">DOB:<span className="list-item-data"> {context.state.currentPatient.dob}</span></li>
                                <li className="patient-data-list-item">HEIGHT:<span className="list-item-data"> {context.state.currentPatient.height} CM</span></li>
                                <li className="patient-data-list-item">WEIGHT:<span className="list-item-data"> {context.state.currentPatient.weight} KG</span></li>
                            </ul>
                        </div>

                        <div className="patient-data-div">
                            <p id="medhistory-text">{context.state.currentPatient.familyMedicalHistory}</p>
                        </div>
                    </div>
                    <span className="personal-details-title">Test results</span>
                    <div className="patient-data-test-container">
                        <Styles>
                         <table>
                                    <tr>
                                        <th>Test</th>
                                        <th>Date</th>
                                        <th>Result</th>
                                    </tr>

                                {results.map((testResult) => {
                                    const {id, test, date, result} = testResult;
                                    return(
                                        <tr key={id}>
                                            <td>{test}</td>
                                            <td>{date}</td>
                                            <td>{result}</td>
                                        </tr>
                                    )
                                    })}
                        </table>
                        </Styles>
                    </div>

                    <button type="submit" className="form-submit" id="add-test-btn" onClick={changeRoute}>
                        Start Test
                    </button>
                </div>


                <RightSideBar />
            </div>
        </>
    )
}

export default PatientData;