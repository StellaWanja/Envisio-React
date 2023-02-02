import "@fontsource/mulish";
import "./styles/index.css";
import React, {
	//  useState, useEffect 
	} from "react";
import { BrowserRouter as Router, Routes , Route,
	//  Redirect 
	} from "react-router-dom";
// import { useHistory } from "react-router-dom";
import StateProvider from "./components/stateprovider";
import LandingPage from './pages/landingpage';
import Onboarding from "./pages/onboarding";
import Register from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import AddPatient from "./pages/add-patient";
import PatientData from "./pages/patient-data";
import Prediction from "./pages/prediction";
import Result from './pages/result';
import ResetPassword from "./pages/resetpassword";
import PasswordChange from "./pages/passwordchange";
import ContactPage from './pages/contactpage';
import TeamPage from './pages/teampage';

function App() {
	// const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

	// useEffect(() => {
	// 	const accessToken = localStorage.getItem('accessToken');

	// 	if (accessToken) {
	// 		fetch('http://envisio-001-site1.itempurl.com/api/v1/User/get-user', {
	// 			headers: {
	// 				'content-type': 'application/json',
	// 				'Authorization': `Bearer ${accessToken}`
	// 			}
	// 		})
	// 			.then(response => response.json())
	// 			.then(userData => {
	// 				console.log("this is the data ==> ", userData)
	// 				setIsUserAuthenticated(true)
	// 				// TODO: store user data in your data store 

	// 			})
	// 			.catch(err => {
	// 				// TODO: show user error with a popup or something
	// 				setIsUserAuthenticated(false);
	// 				localStorage.removeItem('accessToken');
	// 			})

	// 	}
	// }, []);

	return (
		<StateProvider>
			<Router>
				<div className='App'>
					<div className='container d-flex align-items-center flex-column'>
						<Routes>
							<Route path='/signup' exact={true} element={<Register/>} />

							<Route path='/login' exact={true} element={<Login/>} />

							<Route path='/reset_password' exact={true} element={<ResetPassword/>} />

							<Route path='/password_change' exact={true} element={<PasswordChange/>} />

							<Route exact path='/' element={<LandingPage/>} />

							<Route exact path='/onboarding' element={<Onboarding/>} />

							<Route exact path='/contactpage' element={<ContactPage/>} />

							<Route exact path='/teampage' element={<TeamPage/>} />

							<Route exact path='/prediction' element={<Prediction/>} />
							
							<Route exact path='/prediction-result' element={<Result/>} />

							{/* <Route exact path='/dashboard' >
								{isUserAuthenticated ? <Dashboard /> : <Redirect to='/login' />}
							</Route> */}

							<Route exact path='/dashboard' element={<Dashboard/>} />

							<Route exact path='/add-patient' element={<AddPatient/>} />

							<Route exact path='/patient-data' element={<PatientData/>} />
							
						</Routes>
					</div>
				</div>
			</Router>
		</StateProvider>
	);
}

export default App;