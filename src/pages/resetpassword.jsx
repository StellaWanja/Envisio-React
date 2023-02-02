import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import '../styles/register.css';
import Header from '../components/header';
import SideColor from '../components/sidecolor';
import useMatchMedia from "../custom hooks/matchmedia";
import React, {
    // useState
} from "react";


function ResetPassword() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    // const [email, setEmail] = useState("");
    // const [user, setUser] = useState("");
    const resetpasswordHandler = async ({email}) => {

          let userEmail = {
            Email: email,
           
        };

        fetch(
            'https://envisio-api.up.railway.app/api/v1/Auth/ForgotPassword',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userEmail ),
            }
        )
            .then(res => res.text())
            .then(result => {
                console.log(result)
              
               if (result === "Proceed to reset password")
               {
                   console.log("email exist!")
                   navigate('/password_change')
                   return alert(" The email exist,proceed to create new password! ")
               }
               else {
                   navigate('/register')
                   return alert(" The email doesn't exist, please register with Envisio! ")
               };

            });
             
    };
    

    const isDesktopResolution = useMatchMedia('(min-width:768px)', true)
    return (
        <>
            {isDesktopResolution && (
                <SideColor />
            )}
            <Header />
            <div id="grid-container">
                <div className="register-form-container column">
                    <div className="reset-password-form">
                        <h2 className="main_title ">Reset Password</h2>
                        <p className="center">oops... Forgot password?</p>
                        <p className="center">Input your registered email to initiate reset</p>
                        <br/>
                        <form onSubmit={handleSubmit(resetpasswordHandler)}>
                            <div className="input-container">
                                <input
                                    id="email"
                                    className="input"
                                    type="text"
                                    {...register("email", { required: true })}
                                    placeholder=" "
                                />
                                <div className="cut" />
                                <label htmlFor="email" className="placeholder">
                                    Email Address
                                </label>
                            </div>
                            <button type="submit" className="form-submit-resetpassword">
                                Confirm
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResetPassword;