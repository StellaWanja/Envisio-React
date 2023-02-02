import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from "react";
import { AppContext } from "../components/stateprovider";
import '../styles/dashboard.css';
//import SearchBar from 'material-ui-search-bar';
import LeftSideBar from '../components/left-side-bar';
import RightSideBar from '../components/right-side-bar';
import ListItem from '../components/patientListView';
import swal from 'sweetalert';
import {TiUserAdd} from 'react-icons/ti';
import {AiTwotoneFolderOpen} from 'react-icons/ai';

function Dashboard() {

	const context = useContext(AppContext);
	const navigate = useNavigate();
	let userid = context.state.userData.id;	
	let hasNoPatient = null;

	function getPatientList(){

		fetch(
			`https://envisio-api.up.railway.app/api/v1/all-patients?userId=${userid}`,
			//allow for use of bearer authentication token
			{ headers: {"Authorization" : `Bearer ${context.state.userData.token}`} }
		)
			.then(res => res.json())
			.then(result => {
				if (result.length !== 0){
					hasNoPatient = false;

					context.dispatch({
						type: "PATIENT LIST",
						payload: result,
					});

				}
				console.log(result.body);
				hasNoPatient = true;
			})
			.catch(err => {
				swal({
                    title: 'Error!',
                    text: "Unable to complete request. Please try again after some time",
                    icon: "error",
                    button: "Close",
                });
				console.log(context.state.userData.token);
			});
	}

		useEffect(() => {
			getPatientList()
		}, [userid]);

	const routeChange = () => {
		let path = `/add-patient`;
		navigate(path);
	};
	
	return (
		<div className='dashboard-container'>
			<LeftSideBar className='left-bar' />
			<div className='middle-column'>
				{/* <SearchBar className='dashboard-search' /> */}

				<div style={{ display: 'flex', marginTop: '7%' }}>
					<div className='helloDoc'>
						<h2 style={{ fontSize: '30px' }}>Hello {context.state.userData.firstName}</h2>
						<span style={{ color: '#7A7A7A', fontSize: '20px' }}>
							Welcome to your Envisio Dashboard.
						</span>
					</div>
					<div className='addPatientContainer'>
						<button className='add-patient' type='submit' onClick={routeChange}>
							<TiUserAdd color='#fff' fontSize='40px'/>
							<p style={{ color: '#ffff',  fontSize: '15px' }}>
								Add Patient</p>
						</button>
					</div>
				</div>

				{hasNoPatient ? (
				<div style={{ display: 'block', margin: '6% auto', width: '50%' }}>
					<AiTwotoneFolderOpen fontSize='30px'/>
				</div>
				)
				:
				(
				<div className="patient-list-view">
					<h4>List of Patients</h4>
					<ul id="patient-list-container">
							{context.state.patientList.map(function (patient) {
								return (
									<ListItem
										key={patient.id}
										item={patient}
									/>
								);
							})}
					</ul>
				</div>
				)
				}
			</div>
			<RightSideBar className='right-bar' />
		</div>
	);
}

export default Dashboard;
