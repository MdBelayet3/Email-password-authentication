import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../Firebase/Firebase.init';
import { Link } from 'react-router';

const Login = () => {

    // State
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const emailRef = useRef(null);

    // handleLogin function
    const handleLogin = e => {
        e.preventDefault();

        // input field
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // remove previous error and success
        setLoginError('');
        setLoginSuccess('');

        // Sign in with emil and password method
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if (result.user.emailVerified) {
                    setLoginSuccess("Login has completed successfully")
                }
                else {
                    sendEmailVerification(result.user)
                    .then(() =>alert("Please Verified Your Email address"),email)
                    alert("Please Verified Your Email address"),email
                    
                }
            })
            .catch(error => {
                console.error(error)
                if (error.message === "Firebase: Error (auth/invalid-credential).") {
                    setLoginError("Wrong Password You have to give correct password")
                }
            })
    }

    // Handle forget password function
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert("Please provide a Email")
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert("Please provide a valid email")
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Please check you email")
            })
            .catch(error => {
                console.error(error);
            })
        console.log("reset email btn", emailRef.current.value)
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    placeholder="email"
                                    name='email'
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name='password'
                                    className="input input-bordered" required />
                                <label className="label">
                                    <a onClick={handleForgetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            loginError && <h2 className='text-red-700 mb-4 ml-3'>{loginError}</h2>
                        }
                        {
                            loginSuccess && <h2 className='text-green-700 mb-4 ml-3'>{loginSuccess}</h2>
                        }
                        <p className='ml-4 mb-4'>New in this Website Please <Link className='btn btn-secondary' to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;