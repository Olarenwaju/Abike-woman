import React from 'react'

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className='w-full bg-stone-900 py-10 px-5'>
      <div className='max-w-[1300px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8 '>
        <div>
          <h6 className='font-normal text-white pt-2'>Get In touch</h6>
          <ul>
            <li className='li-2'>42 Allen Avenue, Ikeja</li>
            <li className='li-2'>Lagos. Nigeria</li>
            <li className='li-2'>Email: abikewoman@gmail.com</li>
            <li className='li-2'>Phone: +234 08163347917</li>
          </ul>
        </div>

        <div>
          <h6 className='font-normal text-white pt-2'>Customer Service</h6>
          <ul>
            <li className='li-2'>Contact Us</li>
            <li className='li-2'>Returns</li>
            <li className='li-2'>Site Map</li>
          </ul>
        </div>

        <div>
          <h6 className='font-normal text-white pt-2'>My Account</h6>
          <ul>
            <li className='li-2'>My Account</li>
            <li className='li-2'>Order History</li>
            <li className='li-2'>Wish List</li>
            <li className='li-2'>Newsletter</li>
          </ul>
        </div>


        <div className='col-span-2 pt-8 md:pt-2'>
          <p className='font-normal text-white pt-2'>Subscribe to our Newsletter</p>
          <p className='li-2'>Get notified on each update</p>
          <form className='flex flex-col'>
                <input className='w-full p-2 mr-4 mb-4 bg-transparent border-1 border-white ' type="email" placeholder='Input your email here'></input>
                <button className='bg-white font-semibold p-2 mb-4 '>Subcribe</button>
          </form>
        </div>

      </div>

      <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-white'>
        <p className='text-sm py-4'>{year} Abikewoman, Inc, All rights reserved</p>
        <div className='flex justify-evenly align-center sm:w-[100px] pt-4 text-1xl'>
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
        </div>
      </div>
    </div>
  )
};

export default Footer;