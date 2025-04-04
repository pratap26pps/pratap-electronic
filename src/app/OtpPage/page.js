"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 
import OTPInput from "react-otp-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
 
import { BiArrowFromRight } from "react-icons/bi";

const OtpPage = () => {
  const { loading, signupdata } = useSelector((state) => state.auth);
  const [otp, setotp] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  // const email = signupdata?.email;
  // useEffect(() => {
  //   if (!signupdata) {
  //     router.push("Account/Signup");
  //   }
  // }, [signupdata]);

  const handleonsubmit = (e) => {
    const {
        firstname,
        lastname,
        password,
        email,
        role,
        country,
        state,
        otp,
        phonenumber,
      
    } = signupdata;
    console.log("signupdata", signupdata);
    e.preventDefault();
    // dispatch(
    //   signup(
    //     firstname,
    //     lastname,
    //     password,
    //     email,
    //     role,
    //     country,
    //     state,
    //     otp,
    //     phonenumber,
    //   )
    // );
  };

  return (
    <div>
      {loading ? (
        "loading...."
      ) : (
        <div className="  text-2xl flex flex-col  items-center mt-36 ">
          <h1 className="text-orange-600">Verify Email</h1>
          <p className="w-68 mx-1 my-4">
            a verification code has been sent to you.Enter the code below
          </p>
          <form className="scale-100 my-8" onSubmit={handleonsubmit}>
            <div className="scale-200">
            <OTPInput
            inputStyle="border border-gray-400 rounded-md text-center text-xl focus:outline-none focus:border-blue-500"
              name="otp"
              inputType="text"
              value={otp}
              onChange={setotp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
            </div>
      
            <button
              type="submit"
              className="bg-yellow-500 
                -ml-4   hover:scale-95 hover:bg-green-500 transition-all duration-200 my-9 p-2 rounded-md "
            >
              Verify Email
            </button>
          </form>
          <Link href="/Signup">
            <div className="flex mt-6 -ml-6">
              <BiArrowFromRight className="mt-1" />
              <p>back to signup</p>
            </div>
          </Link>
          <button className="mt-3 -ml-6" onClick={() => dispatch(takeotp(email))}>
            Resend it
          </button>
        </div>
      )}
    </div>
  );
};

export default OtpPage;
