"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function SignUp() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const onSignup = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="p-5 text-4xl font-bold font-mono ">SignUp</h1>
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
        SignUp
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
