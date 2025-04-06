"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiArrowFromRight } from 'react-icons/bi'
import Link from 'next/link'

// import { getpasswordresettoken } from '../services/opration/authapi'
const Forgotpassword = () => {
   const [emailsend,setemailsend]=useState(false)
   const [email,setemail]=useState("")
   
    const {loading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();


    const resetpasswordhandler=(e)=>{
         e.preventDefault();
        //  dispatch(getpasswordresettoken(email,setemailsend));

    }


  return (
    <div className='mt-36 '>
      {
        loading ?(<div>loading.......</div>):(
        <div className='flex flex-col items-center '>
            <h1 className=''>
                {
                    !emailsend ? ("Reset your Password"):("check your Email")
                }
            </h1>
            <div>
                {
                   !emailsend ? <p className='w-96 p-3 ml-4'>
                      "Have no fear. we'll email you instruction to reset your password. if 
                      you don't have access to email ,we can try account recovery "
                   </p>
                : <p className='ml-12 my-5 scale-110'>{`we have send the reset email to ${email} `}
                 <span>kindly check your E-mail</span> </p>
                  
                
                }
            </div>
            <form onSubmit={resetpasswordhandler} className=''>

        
            {
              !emailsend && (
 
                 <div className='flex flex-col space-y-5 mt-2 items-center'>
                    <label htmlFor="">Email Address <sup>*</sup></label>
                    <input className='p-3 border rounded-lg w-80  text-blue-600 font-bold'
                      required
                     type="email"
                     name='email'
                     value={email}
                     onChange={(e)=>setemail(e.target.value)}
                      placeholder='myemailaddress@gmail.com' />
                 </div>
                )
            } 
              <button className='p-2 cursor-pointer lg:w-48 mt-3 bg-yellow-400 text-black rounded-lg '
                type='submit'>
                 {
                  !emailsend ?"Reset Password":"Resend Email"
                 }
              </button>
                
                 
             <Link href={'/Account/login'}>
             <div className='flex lg:mt-3'>
                               <BiArrowFromRight className='mt-1'/>
                               <p>back to login</p>
            </div>
            </Link>   
               </form>
        </div>)
      }
    </div>
  )
}

export default Forgotpassword
