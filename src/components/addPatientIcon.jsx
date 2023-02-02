import "../styles/dashboard.css";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useHistory } from "react-router";

export default function AddPatientIcon() {
    const history = useHistory();
        function addNewPatient(e){
            e.preventDefault();
            console.log('You clicked submit.');
            history.push('/patient')
        }
    return(
    <button type="submit" id="add-patient-icon" onClick={addNewPatient}>
        <PersonAddIcon fontSize='large'/>
        <span>Add Patient</span>
    </button>
    )
}