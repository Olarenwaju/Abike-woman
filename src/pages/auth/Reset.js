import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import loginImg from "../../assets/login.png";
import Loader from "../../components/loader/Loader"; 

const Reset = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const resetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true)

        sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
    }


  return (
    <>
    {isLoading && <Loader />}
    <div className='relative w-full h-screen bg-zinc bg-zinc-900/90'>
        <img className='absolute w-full h-full object-cover mix-blend-overlay' src={loginImg} alt="/" />

        <div className='flex justify-center items-center h-full'>
            <form onSubmit={resetPassword} className='max-w-[400px] w-full mx-auto bg-white p-8'>
                <h2 className='text-4xl font-bold text-center py-8'>RESET</h2>

                <div className='flex flex-col mb-4 mt-3'>
                    <label className=''>Email</label>
                    <input 
                        className='border relative bg-gray-100 p-2' 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button type="submit" className='w-full py-3 mt-3 bg bg-gray-900 hober:bg-black relative text-white'>Reset Password</button>
                <div className='flex justify-between mt-8'>
                    <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center cursor-pointer'><Link to="/login">Login</Link></p>
                    <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center cursor-pointer'><Link to="/register">Sign Up</Link></p>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Reset;