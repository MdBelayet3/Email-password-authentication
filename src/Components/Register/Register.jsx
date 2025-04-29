import React from 'react';

const Register = () => {

    const handleRegister = e =>{
        e.preventDefault();
        console.log('Form submitted')
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email,password)
    }

    return (
        <div className=''>
            <div className='mx-auto md:w-1/2'>
                <h2 className="text-4xl mb-8 ">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className='bg-slate-300 w-3/4 rounded-md mb-4 py-2 px-4' type="email" placeholder='Email Address' name="email" id="" /><br />
                    <input className='bg-slate-300 w-3/4 rounded-md mb-4 py-2 px-4' type="password" placeholder='Password' name="password" id="" /><br />
                    <input className='btn btn-secondary w-3/4' type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;