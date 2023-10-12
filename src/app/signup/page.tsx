"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
  const  router = useRouter()
  const [loading,setLoading]=React.useState(false)
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled,setButtonDisabled] =React.useState(false)
  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup",user)
      console.log(response,"this is response")
      router.push("/login")
    } catch (error:any) {
      console.log("signup failed"+error.message)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(user.email.length > 0 &&user.password.length > 0 &&user.username.length > 0){
      setButtonDisabled(false);
    }else {
      setButtonDisabled(true);
    }
  },[user.email, user.password, user.username])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="p-5 text-4xl font-bold font-mono ">{loading ? "processing":"signup"}</h1>
      <div className="flex flex-col">
        <label htmlFor="username" className="p-1">username</label>
        <input
          className="p-2 border border-gray-300 rounder-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="p-1">email</label>
        <input
          className="p-2 border border-gray-300 rounder-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="p-1">password</label>
        <input
          className="p-2 border border-gray-300 rounder-lg mb-4 focus:outline-none focus:border-gray-600"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
      </div>
      <button
        onClick={onSignup}
     
        className="px-4 py-3 bg-blue-400 rounded-xl text-white hover:bg-blue-600 transition-transform"
      >
        {buttonDisabled ? "No Signup": "Signup"}
      </button>
      <span className="p-5">
        <p>
        already have account ?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-600">
            Login
          </Link>
        </p>
      </span>
    </div>
  );
}
