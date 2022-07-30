import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import loginImg from "../../assets/login.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase/config";
import Loader from "../../components/loader/Loader"; 


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault()
    if (password !== cPassword) {
      toast.error("Passwords do not match");
    }
    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      setIsLoading(false)
      toast.success("Registration successful...");
      navigate("/login")
    })
    .catch((error) => {
      toast.error(error.message)
      setIsLoading(false);
    });
  }

  return (
    <>
    {isloading && <Loader />}
    <div className='pt-20 relative w-full h-screen bg-zinc bg-zinc-900/90'>
        <img className='absolute w-full h-full object-cover mix-blend-overlay' src={loginImg} alt="/" />

        <div className='flex justify-center items-center h-full'>
            <form onSubmit={registerUser} className='max-w-[400px] w-full mx-auto bg-white p-8'>
                <h2 className='text-4xl font-bold text-center py-6'>SIGN UP</h2>

                <div className='flex flex-col mb-4 mt-3'>
                    <label className='font-normal'>Email</label>
                    <input 
                      className='border relative bg-gray-100 p-2' 
                      type="text" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} />
                </div>

                
                <div className='flex flex-col mb-4'>
                    <label className='font-normal'>Password</label>
                    <input 
                      className='relative bg-gray-100 p-2' 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                     />
                </div>

                <div className='flex flex-col'>
                    <label className='font-normal'>Confirm Password</label>
                    <input 
                      className='relative bg-gray-100 p-2' 
                      type="password" 
                      required
                      value={cPassword}
                      onChange={(e) => setCPassword(e.target.value)}
                      />
                </div>

                <button type='submit' className='w-full py-3 mt-8 bg bg-gray-900 hober:bg-black relative text-white'>Sign Up</button>
                <p className='text-center mt-8'>Already have an account? <span className='font-medium hover:font-bold cursor-pointer'><Link to="/login">Login</Link></span></p>
            </form>
        </div>
    </div>
    </>
  );
};

export default Register;