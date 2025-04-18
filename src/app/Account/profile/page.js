"use client"
import toast from 'react-hot-toast'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation' 
const Page = () => {
const router= useRouter();
 
  const [user, setUser] = useState(null);
  const pathname=usePathname();
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/users/me", { cache: "no-store" });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

 console.log("userROLE",user);

  const logout = async()=>{
    try{
     await axios.get("/api/users/logout");
     toast.success("Logged out successfully!");
     router.push('/Account/Login');
     router.refresh();
    }catch(error){
      console.log(error.message);
  toast.error(error.message);
    }
  }

 const dashboardList =[
  {
    id:1,
    name:"orders",
    link:"/Account/profile/order"
  },
  {
    id:2,
    name:"Returns",
    link:"/returns"
  },
  {
    id:3,
    name:"Message",
    link:"/Contact-Us"
  },
  {
    id:4,
    name:"Addreses",
    link:"/Account/profile/AddresesManagement"
  },
  {
    id:5,
    name:"Yourlist",
    link:"/yourlist"
  },
  {
    id:6,
    name:"Account Setting",
    link:"/Account/profile/profileUpdateForm"
  },
 ]

  return (
    <div className='flex flex-col items-center gap-3 text-4xl mt-44'>
    <h1>Welcome {user?.firstname} {user?.lastname}</h1>

    {user?.role === "owner" ?(
      <div>

        <div>Owner</div>
        <div className='flex  gap-36'>
        <Link href="/ShowProduct">
          <button className="bg-blue-500 px-4 py-2 rounded">Show All Product</button>
        </Link>
        <Link href="/Account/profile/ShowAllOrder">
          <button className="bg-blue-500 px-4 py-2 rounded">Show All Order</button>
        </Link>
        <Link href="/upload/category">
          <button className="bg-blue-500 px-4 py-2 rounded">Upload Product</button>
        </Link>
        </div>

      </div>
         
      ):

      // costumer
      (<div className='flex gap-3 scale-75 cursor-pointer'>
        {
          dashboardList.map((list)=>{
            const isActive = pathname === list.link;

             return <Link key={list.id}  href={list.link}> <div 
             className={`p-2 rounded-lg cursor-pointer transition-colors ${
              isActive
                ? ""  
                : "hover:text-blue-600"
            }`}

             >{list.name}</div> </Link>
          })
        }
        
      </div>)}
 


    <Button
    onClick={logout}
    className="bg-amber-600 hover:bg-amber-800 cursor-pointer  text-white font-bold p-2 rounded-xl">
      Logout</Button>
    </div>
  )
}

export default Page
