import {useEffect, useState} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { MenuAlt3Icon, XIcon, ShoppingCartIcon, HeartIcon, UserCircleIcon} from '@heroicons/react/outline';
import {auth} from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import {  toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
//import Loader from "../../components/loader/Loader"; 
import styles from "./Header.module.scss";
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import { REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';


const activeLink = ({isActive}) => (isActive ? `${styles.active} font-bold` : '')

const logo = (
  <h1 className='text-base font-bold mr-4 sm:text-sm'>
    <NavLink to="/" className={activeLink}>
      Abike-Woman
    </NavLink>
  </h1>           
);

const cart = (
  <NavLink to="/cart">
    <ShoppingCartIcon className='w-5 mx-3'/>
  </NavLink>
);

const orderHistory = (
  <NavLink to="/order-history">
    <HeartIcon className='w-5' />
  </NavLink>
);


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const navigate = useNavigate()

  const dispatch = useDispatch()

  // Monitor currently sign In User
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log(user)
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName)
        }
        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid,
        }))
        // ...
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  };

  const hideMenu = () => {
    setShowMenu(false)
  };

  const logoutUser = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("Logout successful")
      navigate("/")
    }).catch((error) => {
      // An error happened.
      toast.error(error.message)
    });
  };

  //Check nav

  return (
    <header>
      <div className="flex justify-between items-center w-screen h-[80px] z-10 bg-white fixed drop-shadow-lg lg:px-32 md:px-24 px-4">
        {logo}

        {/* {...showMenu ? 'translate-x-0' : 'translate-x-full'} */}
        {/* className='hidden lg:flex w-3/5 justify-between' */}
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          {/*Come Back To Check this dynamiv style later for Nav Wrapper with Css Modules*/}
          <div className={
            showMenu 
              ? `${styles["nav-wrapper"]} 
              ${styles["show-nav-wrapper"]}` 
              : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>   

          <ul className='block lg:flex justify-between text-sm items-center' onClick={hideMenu}>
            <li className='lg:hidden flex justify-between'>
              {logo}
              <XIcon className='w-8' onClick={hideMenu}/>
            </li>

            <li >
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button className='btn-full px-3 py-2'>
                    Admin
                  </button>
                </Link>
                
              </AdminOnlyLink>              
            </li>

            <li className='lg:border-none border-b-2'><NavLink to="/about" className={activeLink}>About</NavLink></li>
            <li className='lg:border-none border-b-2'><NavLink to="/shop" className={activeLink}>Shop</NavLink></li>
            <li className='lg:border-none border-b-2'><NavLink to="/gallery" className={activeLink}>Gallery</NavLink></li>
            <li className='lg:border-none border-b-2'><NavLink to="/contact" className={activeLink}>Contact</NavLink></li>
          </ul>

          <div className='block lg:flex' onClick={hideMenu}>
            <span className='flex items-center px-3 py-4 lg:border-none border-b-2 lg:mb-0 mb-4'>
              
              <ShowOnLogin>
                <span className='mr-4 font-bold'>
                  <UserCircleIcon className={`${activeLink} w-2`}/>
                  <span className='text-black'>Hi, {displayName}</span>
                </span>
              </ShowOnLogin>

              <ShowOnLogin>
                {orderHistory}
              </ShowOnLogin>

              {cart}
            </span>

            <span>
              <ShowOnLogout>
                <button className='py-3 px-9 mx-3 btn-outline'>
                      <NavLink to="/login">
                        Login
                      </NavLink>
                </button>
              </ShowOnLogout>

              <ShowOnLogin>
                <button className='py-3 px-9 mt-1 btn-full'>
                  <NavLink to="/contact" onClick={logoutUser}>
                    Logout
                  </NavLink>
                </button>
              </ShowOnLogin>


              {/* <button className='py-3 px-9 font-medium text-white bg-black
                hover:bg-white hover:text-black hover:border-black'>
                    <Link to="/register">
                      Sign Up
                    </Link>
              </button> */}
            </span>
            
          </div>
          
        </nav> 

        <div className='lg:hidden flex items-center cursor-pointer'>
          <ShowOnLogin>
            {orderHistory}
          </ShowOnLogin>

          {cart}
          <MenuAlt3Icon className='w-8' onClick={toggleMenu}/>
        </div>
                   
      </div>
    </header>
  );

};

export default Header;
