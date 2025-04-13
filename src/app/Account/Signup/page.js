"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setSignupdata } from "@/redux/slices/userSlice";
import { setreceivedOtp } from "@/redux/slices/userSlice";

export default function SignupFormDemo() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    phonenumber: "",
    state: "",
    country: "",
    city: "",
  });

  const email = user.email;
  console.log("useremail", email);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    dispatch(setSignupdata(user));

    try {
      const response = await axios.post("/api/users/sendotp", {
        email: user.email,
      });
      console.log("Otp Send Successfully:", response.data);
      const otp = response.data.otp;
      dispatch(setreceivedOtp(otp));
    } catch (err) {
      console.error("Signup Error:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }

    router.push("/OtpPage");

    console.log("Form submitted");
    console.log("user", user);
  };

  return (
    <div className="shadow-input mt-36 mx-auto w-[61%] rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to EmbProto
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to EmbProto  if you can because we don&apos;t have a login flow
        yet
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="first name"
              type="text"
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              value={user.firstname}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Last name"
              type="text"
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              value={user.lastname}
              required
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="yourmail@gmail.com"
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
            required
          />
        </LabelInputContainer>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="confirmpassword"
              placeholder="••••••••"
              type="password"
              onChange={(e) =>
                setUser({ ...user, confirmpassword: e.target.value })
              }
              value={user.confirmpassword}
              required
            />
          </LabelInputContainer>
        </div>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Phone No</Label>
            <div className="flex">
              <Input
                type="text"
                value="+91"
                disabled
                className="w-16 bg-gray-100 border border-gray-300 rounded-md text-center"
              />
              <Input
                id="phonenumber"
                placeholder="Enter your phone No"
                type="number"
                 maxLength={10}
                onChange={(e) =>
                  setUser({ ...user, phonenumber: e.target.value })
                }
                value={user.phonenumber}
              />
            </div>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Country</Label>
            <Input
              id="country"
              placeholder="country name"
              type="text"
              onChange={(e) => setUser({ ...user, country: e.target.value })}
              value={user.country}
            />
          </LabelInputContainer>
        </div>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">State</Label>
            <Input
              id="state"
              placeholder="state"
              type="text"
              onChange={(e) => setUser({ ...user, state: e.target.value })}
              value={user.state}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">city</Label>
            <Input
              id="city"
              placeholder="city"
              type="text"
              onChange={(e) => setUser({ ...user, city: e.target.value })}
              value={user.city}
            />
          </LabelInputContainer>
        </div>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          {loading ? "Signing up..." : "Sign up →"}
          <BottomGradient />
        </button>
        <div className="flex mt-3">
          <p>Already have an account?</p>
          <Link href="/Account/Login" className="ml-3 text-blue-600">
            Login
          </Link>
        </div>
        <Link href="/" className="mt-3">
          Back
        </Link>

        <Link href="/" className="mt-3 text-gray-600">
          Back
        </Link>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
