import { UserCircleIcon } from '@heroicons/react/outline';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../../redux/slice/authSlice';
import styles from "./Navbar.module.scss";
import { NavLink } from 'react-router-dom';

const activeLink = ({isActive}) => (isActive ? `${styles.active} font-bold text-black` : '')

const Navbar = () => {
  const userName = useSelector(selectUserName)
  // {styles.navbar}
  return (
    <div className='border-r-2 min-h-screen'>
      <div className={`flex justify-center items-center flex-col p-4 pt-24 bg-slate-600`}>
        <UserCircleIcon className='w-20 pt-10 text-blue-200' />
        <h2 className='font-bold text-white'>{userName}</h2>   
      </div>

      <div>
        <ul className='lg:visible visible w-full'>
          <li className='border-b-2 hover:py-6'>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li className='border-b-2 hover:py-6'>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li className='border-b-2 hover:py-6'>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li className='border-b-2 hover:py-6'>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </div>

    
  );
};

export default Navbar;