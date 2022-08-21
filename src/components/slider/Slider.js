import React from 'react';
import styles from './Slider.module.scss';
import heroImg from '../../assets/heroSideImg.png';
import { CreditCardIcon, ShoppingCartIcon } from '@heroicons/react/outline';


//import discountImg from '../../assets/discountIcon.png';

const Slider = () => {
  return (
    <section className='lg:pt-10 md:pt-20 h-full max-h-[640px] mb-8 xl:mb-24 pb-20'>
        <div className='flex flex-col lg:flex-row'>
            <div className='lg:px-32 md:px-24 px-4 lg:pt-10 md:pt-16 pt-20
                flex flex-col lg:items-start text-left
                lg:text-left justify-center flex-1'>
                    {/*  */}
                <h1 className={`${styles.herotxt} text-6xl lg:text-[110px] font-bold mb-6 hero-txt `}>Adunni<br ></br> Collection</h1>
                <p className='max-w-[480px] mb-8 text-gray-500'>Up to 6 Years Durability, long lasting nylon effect,
                    <br ></br> 
                    with poly-ethylene material.
                </p>

                <div div className='flex justify-center'>  
                    
                    <button className='flex items-center px-3 py-4 mr-3 btn-full'>
                        <CreditCardIcon className='w-5 mr-2'/>
                        Buy Now
                    </button>
                    
            
                    <button className='flex items-center px-3 py-4 btn-outline'>
                        <ShoppingCartIcon className='w-5 mr-2' />
                        Add To Cart
                    </button>
                </div>

                
            </div>

            <div className='hidden lg:h-4/5  flex-1 lg:flex lg:w-[400px] justify-end items-end pt-4'>
                <img src={heroImg} alt='' />
            </div>
        </div>
    </section>
  );
};

export default Slider