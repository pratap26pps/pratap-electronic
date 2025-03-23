"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link"; 

export default function SignupFormDemo() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div
      className="shadow-input mt-36 mx-auto w-[61%] rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to companyName
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to -----cName if you can because we don&apos;t have a login flow
        yet
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Confirm Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        </div>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Phone No</Label>
          <Input id="password" placeholder="91+....." type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">city</Label>
          <Input id="password" placeholder="city" type="text" />
        </LabelInputContainer>
        </div>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Country</Label>
          <Input id="password" placeholder="country name" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">State</Label>
          <Input id="password" placeholder="state" type="text" />
        </LabelInputContainer>
        </div>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          Sign up &rarr;
          <BottomGradient />
        </button>
        <div className="flex">
          <p>Already an account ?</p>
          <Link href='/Account/Login' className="ml-3">Login</Link>
        </div>
        <Link href='/' className="mt-3">Back</Link>
        
        <div
          className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" 
          />

      
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
