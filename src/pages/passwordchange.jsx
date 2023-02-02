import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import '../styles/register.css';
import swal from 'sweetalert';
import Header from '../components/header';
import SideColor from '../components/sidecolor';
import useMatchMedia from "../custom hooks/matchmedia";


import React, { useState } from "react"; 
import validator from 'validator'


function PasswordChange() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
   const [errorMessage, setErrorMessage] = useState('') 

  

  const validate = (value) => { 

  

    if (validator.isStrongPassword(value, { 

      minLength: 8, minLowercase: 1, 

      minUppercase: 1, minNumbers: 1, minSymbols: 1 

    })) { 

      setErrorMessage('Is a Strong Password') 
      

    } else { 

      setErrorMessage('Is Not a Strong Password') 

    } 

  } 

const newpasswordHandler = async ({email, newPassword, ConfirmnewPassword}) => {

    // let isValid = true;
            
 


          let userEmail = {
              email: email,
              newPassword: newPassword,
              ConfirmnewPassword: ConfirmnewPassword,
           
        };


    // perform all neccassary validations
    if (newPassword !== ConfirmnewPassword) {
        alert("Passwords don't match");
    } 
    else {
        // make API call
        fetch(
            'https://envisio-api.up.railway.app/api/v1/Auth/ResetPassword',
            {
                method: 'Post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userEmail ),
            }
        )
            .then(res => res.text())
            .then(result => {
                console.log(result)
            });
           navigate('/login'); 
            swal({
                title: 'Password Created Successful',
                text: " ",
                icon: "success",
                button: "Close" ,
                
            })
            ;
    }

        
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
                    <div className="form">
                        <h2 className="main_title ">Reset Password</h2>
                        <p className="center">You're almost there</p>
                        <br />
                        <form onSubmit={handleSubmit(newpasswordHandler)}>

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
                                    Re-Enter Email Address
                                </label>
                            </div>

                            <div className="input-container">
                                <input
                                    id="newPassword"
                                    className="input"
                                    type="password"
                                    {...register("newPassword", { required: true })}
                                    onChange={(e)=> validate(e.target.value)}
                                    placeholder=" "
                                />
                                <br/>
                                 <span style={{fontWeight:'bold',
                            color: 'red',
                            }}>{errorMessage}</span>

                                <div className="cut" />
                                <label htmlFor="password" className="placeholder">
                                    Password
                                </label>
                               
                            </div>
                            <br/>
                            <div className="input-container">
                                  <input
                                    id="ConfirmnewPassword"
                                    className="input"
                                    type="password"
                                    {...register("ConfirmnewPassword", { required: true })}
                                    onChange={(e)=> validate(e.target.value)}
                                    placeholder=" "
                                />
                                <br/>
                                <span style={{fontWeight:'bold',
                            color: 'red',
                            }}>{errorMessage}</span>
                                <div className="cut" />
                               <label htmlFor="Password" className="placeholder" >
                                    Confirm Password
                                </label>
                            </div>
                            <button type="submit" className="form-submit-create-new-password">
                                Confirm
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PasswordChange;