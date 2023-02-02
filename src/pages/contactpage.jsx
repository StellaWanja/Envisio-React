import React from 'react';
import '../styles/contactpage.css';
import { Button } from 'semantic-ui-react';
import emailjs from 'emailjs-com';
import swal from 'sweetalert';
import Footer from '../components/footer';
import TopNavigation from '../components/top-navigation';

const SERVICE_ID = 'service_c7843wa';
const TEMPLATE_ID = 'template_09u1kpg';
const USER_ID = 'user_CDbR0JB1ykYvbuG7Zti4G';

const ContactPage = () => {
	const handleOnSubmit = (e) => {
		e.preventDefault();
		emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
			(result) => {
				console.log(result.text);
				swal({
					icon: 'success',
					title: 'Message Sent Successfully',
					button: "OK",
				});
			e.target.reset();    

			},
			(error) => {
				console.log(error.text);
				return swal({
					icon: 'error',
					title: 'Ooops, something went wrong',
					text: error.text,
				});
			}
		);
	};

	return (
		<>
			<div className="contact-body">

			<div>
				<TopNavigation />
			</div>
			<div>
				<img
					src='https://i.ibb.co/fpKjHQw/Rectangle-637.png'
					alt='header'
					className='header-image'
				/>
			</div>
			<h2 className='header'>Get In Touch By Filling Out This Form</h2>
			<form onSubmit={handleOnSubmit} className='form-body'>
				<div className='input-section'>
					<div className='input-box'>
						<label htmlFor='name'>Name</label>
						<input
							id='form-input-control-last-name'
							label='Name'
							name='user_name'
							required
							className='input-area'
						/>
					</div>

					<div className='input-box'>
						<label htmlFor='email'>Email</label>
						<input
							id='form-input-control-email'
							label='Email'
							name='user_email'
							required
							className='input-area'
						/>
					</div>

					<div className='input-box'>
						<label htmlFor='message'>Message</label>
						<textarea
							id='form-textarea-control-opinion'
							label='Message'
							name='user_message'
							required
							className='textarea'
						/>
					</div>
				</div>
				<Button type='submit' className='submit-button'>
					Send
				</Button>
			</form>
			<img
				src='https://i.ibb.co/9HfjXmj/trafalgar-illustration-sec02-2.png'
				alt='trafalgar-illustration-sec02-2'
				className='image'
			/>
			<div className='clear'></div>
</div>
			<Footer />
		</>
	);

};
export default ContactPage;
