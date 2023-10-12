"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const logOut = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.statusText === "OK") {
        toast.success("logout successful");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRWZahGYzkieBfnLHeLjSKPue1S0AokNoqyaZHE6iuKtNFZHd9ZUOkInBXoNg-JGwbSzomWlDB7SHZZ9X0"
          className="max-w-sm rounded-lg shadow-2xl"
          alt="img"
        />
        <div>
          <h1 className="text-5xl font-bold">hello user</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary" onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
