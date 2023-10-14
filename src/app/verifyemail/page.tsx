"use client";
import axios from "axios";

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token,
      });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, [token]);
  useEffect(() => {
    if (token?.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-400 text-black rounded mt-4">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl m-5 ">Email verified</h2>
          <Link href="/login" className="text-white bg-blue-500 py-2 px-2 rounded-full hover:text-blue-600 ">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div >
          <h2 className="text-4xl bg-red-600 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
