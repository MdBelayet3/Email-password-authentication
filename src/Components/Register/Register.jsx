import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../Firebase/Firebase.init';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";


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
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)

        // password validation
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters ');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError("Password should be at least 1 Upper case letter")
            return;
        }

        // create user with Email and Password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setRegisterSuccess('User successfully created')
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
                    <input className='btn btn-secondary w-3/4 py-2 px-4' type="submit" value="Register" />
                </form>
                {
                    registerError && <h2 className='text-red-700 mt-5'>{registerError}</h2>
                }
                {
                    registerSuccess && <h2 className='text-green-700 mt-5'>{registerSuccess}</h2>
                }
            </div>
        </div>
    );
};

export default Register;