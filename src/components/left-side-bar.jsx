import { Link, NavLink } from 'react-router-dom';
import '../styles/left-side-bar.css';
import Logo from "./logo";
import {MdSpaceDashboard, MdOutlineOnlinePrediction} from 'react-icons/md';
import {FaUserClock} from 'react-icons/fa';

export default function LeftSideBar() {
	return (
		<div className='left-column'>
			{/* <Link to='/' style={{marginTop: '4vh', marginBottom: '5vh'}} ><Logo className="left-side-logo"/> </Link> */}

			<Link to='/' style={{ marginTop: '6vh', marginLeft: '2vh' }} className='left-logo'>
				<Logo/>
			</Link>
			<ul className='links'>
				<div className='sidebar-item'>
					<MdSpaceDashboard style={{fontSize: '25px', color: "#212121"}}/>
					<NavLink className='sidebar-link' to='/dashboard' style={{color: "#212121"}}>
						Dashboard
					</NavLink>
				</div>
				
                <div className='sidebar-item'>
                    <FaUserClock style={{fontSize: '25px', color: "#212121"}}/>
					<NavLink className='sidebar-link' to='/patient-data' style={{color: "#212121"}}>
						Patient History
					</NavLink>
				</div>

				<div className='sidebar-item'>
					<MdOutlineOnlinePrediction style={{fontSize: '25px', color: "#212121"}}/>
					<NavLink className='sidebar-link' to='/prediction' style={{color: "#212121"}}>
						Prediction
					</NavLink>
				</div>
			</ul>
		</div>
	);
}
