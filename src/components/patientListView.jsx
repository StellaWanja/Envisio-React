import { useContext } from 'react';
import { useNavigate } from 'react-router';
import '../styles/patientListView.css';
import { AppContext } from './stateprovider';
import swal from "sweetalert";

function ListItem({ item }) {
    const context = useContext(AppContext)
    const navigate = useNavigate()

    function viewPatientData(){
        fetch(
            `https://envisio-api.up.railway.app/api/v1/Patient?patientId=${item.id}`,
		{ headers: {"Authorization" : `Bearer ${context.state.userData.token}`} }
    )
        .then(res => res.json())
        .then(result => {

            context.dispatch({
                type: 'VIEW_PATIENT',
                payload: result,
            });

            console.log(context.state.currentPatient.id);

            navigate({
                pathname: '/patient-data',
                search: "?patientId=" + item.id,  // query string
                state: {  // location state
                    detail: result,
                }
            });
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
    return (
        <li className="patient-item-view">
            <span className='patient-list-title'>{item.firstName +" " + item.lastName}</span>
            <span className='View' onClick={viewPatientData}>View</span>
        </li>
    );
}

export default ListItem;