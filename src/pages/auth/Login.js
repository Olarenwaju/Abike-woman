import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import loginImg from "../../assets/login.png";
import {FaGoogle, FaFacebook} from 'react-icons/fa';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase/config';
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader"; 


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            //const user = userCredential.user
            //console.log(user);
            setIsLoading(false)
            toast.success("Login successful..")
            navigate("/")
        })
        .catch((error) => {
            setIsLoading(false)
            toast.error(error.message)
        });
    };

    // Login With Google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            //const user = result.user;
            //console.log(user);
            toast.success("Login successful..")
            navigate("/")
            // ...
        }).catch((error) => {
            toast.error(error.message)
        });
    };


  return (
    <>
    {isLoading && <Loader />}
    <div className='relative w-full h-screen bg-zinc bg-zinc-900/90'>
        <img className='absolute w-full h-full object-cover mix-blend-overlay' src={loginImg} alt="/" />

        <div className='flex justify-center items-center h-full'>
            <form onSubmit={loginUser} className='max-w-[400px] w-full mx-auto bg-white p-8'>
                <h2 className='text-4xl font-bold text-center py-8'>LOGIN.</h2>
                <div className='flex justify-between'>
                    <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center cursor-pointer'><FaFacebook className='mr-2'/> Facebook</p>
                    <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center cursor-pointer' onClick={signInWithGoogle}><FaGoogle className='mr-2'/> Google</p>
                </div>

                <div className='flex flex-col mb-4 mt-3'>
                    <label className=''>Email</label>
                    <input className='border relative bg-gray-100 p-2' 
                        type="text"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                
                <div className='flex flex-col'>
                    <label>Password</label>
                    <input 
                        className='relative bg-gray-100 p-2' 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className='w-full py-3 mt-8 bg bg-gray-900 hober:bg-black relative text-white'>Login</button>
                <p className='flex items-center mt-2 font-medium hover:font-bold cursor-pointer'><Link to="/reset">Reset Password</Link></p>
                <p className='text-center mt-8'>Not a member? <span className='font-medium hover:font-bold cursor-pointer'><Link to="/register">Sign Up</Link></span></p>
            </form>

            
        </div>
    </div>
    </>
  );
};

export default Login;