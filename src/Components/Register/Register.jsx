import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../Firebase/Firebase.init';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link } from 'react-router';


const Register = () => {

    // useState
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [toggleEyeBtn, setToggleEyeBtn] = useState(false);

    // handleRegister function
    const handleRegister = e => {
        e.preventDefault();

        // previous Error and success remove
        setRegisterError('');
        setRegisterSuccess('');

        //input field
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoUrl = e.target.file[0];
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name,email,photoUrl, password, accepted)

        // password and another validation
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters ');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError("Password should be at least 1 Upper case letter")
            return;
        }
        else if(!accepted){
            setRegisterError("Please accept Our terms and conditions")
            return;
        }

        // create user with Email and Password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setRegisterSuccess('User successfully created')

                // Profile update
                updateProfile(result.user,{
                    displayName: name,
                    
                })

                // Email verification
                sendEmailVerification(result.user)
                .then(() =>{
                    alert("Please check your email")
                })
            })
            .catch(error => {
                console.log(error.code);
                console.log(error.message);
                setRegisterError(error.message);
            })
    }

    return (
        <div className=''>
            <div className='mx-auto md:w-1/2'>
                <h2 className="text-4xl mb-8 ">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className='bg-slate-300 w-3/4 rounded-md mb-4 py-2 px-4' type="text" placeholder='Your Name' name="name" id="" required /><br />
                    <input className='bg-slate-300 w-3/4 rounded-md mb-4 py-2 px-4' type="file" name="file" id="" /><br />
                    <input className='bg-slate-300 w-3/4 rounded-md mb-4 py-2 px-4' type="email" placeholder='Email Address' name="email" id="" required /><br />
                    {/* password input field and add password hide and show btn */}
                    <div className='relative'>
                        <input
                         className='bg-slate-300 w-3/4 rounded-md mb-4 py-2 px-4' 
                         type={toggleEyeBtn? "text" : "password"} placeholder='Password' name="password" 
                         id="" required />
                        <span
                         onClick={() => setToggleEyeBtn(!toggleEyeBtn)} className='absolute top-2 right-36'>
                            {toggleEyeBtn?<IoEyeOff className='text-3xl' /> :<IoEye className='text-3xl' />}
                        </span>
                    </div><br />
                    <div>
                        <input className='w-4 h-4 mr-4' type="checkbox" name="terms" id="terms" />
                        <label  className='text-2xl' htmlFor="terms">Accept Our <a href="">terms and Conditions</a></label>
                    </div>
                    <br />
                    <input className='btn btn-secondary w-3/4 py-2 px-4' type="submit" value="Register" />
                </form>
                {
                    registerError && <h2 className='text-red-700 mt-5'>{registerError}</h2>
                }
                {
                    registerSuccess && <h2 className='text-green-700 mt-5'>{registerSuccess}</h2>
                }
                <p className=' mt-4'>If you have any account Please <Link className='btn btn-primary' to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;