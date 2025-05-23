"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import OTPInput from "react-otp-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { BiArrowFromRight } from "react-icons/bi";
import toast from "react-hot-toast";

const OtpPage = () => {
  const { signupdata,receivedOtp } = useSelector((state) => state.auth);
  console.log("signudata during otp",signupdata);
  const [otp, setotp] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
 const [loading, setLoading] = useState(false);

  const email = signupdata?.email;
  useEffect(() => {
    if (!signupdata) {
      router.push("Account/Signup");
    }
  }, [signupdata]);

  const handleonsubmit =async (e) => {
//  validation otp

if(otp ===receivedOtp){

  toast.success("otp-verified successfully");

  // api call signup
    console.log("signupdata", signupdata);
    e.preventDefault();
setLoading(false);

     try {
      const response = await axios.post("/api/users/signup", JSON.stringify(signupdata), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Signup Success:", response.data);
      Cookies.set("role", response.data.role);
      // Redirect to login after successful signup
      if (response.data.role === "owner") {
        router.push("/Account/profile"); // Owner goes to admin panel
      } else {
        router.push("/Account/Login");

      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data?.error || err.message);

    } finally {
      setLoading(false);
    }


}else{
  toast.error("invalid otp aagya");
}

  };

  return (
    <div>
      {loading ? (
        "loading...."
      ) : (
        <div className="  text-2xl flex flex-col  items-center mt-36 ">
          <h1 className="text-orange-600 ">Verify Email</h1>
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
