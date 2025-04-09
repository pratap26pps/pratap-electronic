"use client";
import React,{useState} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link"; 
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupFormDemo() {

  const router = useRouter();
 const [user,setUser] = useState({
  email:"",password:"" 
   
 })
 const [loading,setLoading] = useState(false);

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);
   try{
  const res=await axios.post("/api/users/login", JSON.stringify(user),
    {        headers: {
      "Content-Type": "application/json",
    },});
  console.log("res of login",res.data)
   
    router.push('/Account/profile')
    toast.success("login successfully");
    console.log("Form submitted");
    setLoading(false);
   }catch(error){
    toast.error(error.message)
    console.log(error.message);
    setLoading(false);
     
   }

  };
  return (
    <div
      className="shadow-input mt-36 mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to companyName
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to -----cName if you can because we don&apos;t have a login flow
        yet
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
     
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="yourmail@gmail.com" type="email"
           onChange={(e)=>setUser({...user,email:e.target.value})}
           value={user.email} 
           required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password"
           onChange={(e)=>setUser({...user,password:e.target.value})}
           value={user.password} 
           required
          />
        </LabelInputContainer>
   

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
       {
        loading?"Loading....":<div> 
           Login &rarr;
          <BottomGradient /></div>
       }
    
        </button>

        <Link href='/Account/forgotpassword' className="mt-3 cursor-pointer">Forgot Password</Link>
        <div className="flex">
          <p>Not An Account ?</p>
          <Link href='/Account/Signup' className="ml-3">SignUp</Link>
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
