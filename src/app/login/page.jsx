"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  //states
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const onLogin = async () => {
    try {
      const {data} = await axios.post("/api/users/login", user);
      console.log("Login Successful", data);

      router.push("/profile");

    } catch (error) {
      console.log("Login failed", error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center  justify-center  py-11 text-white">
      <h1 className="text-3xl">Login</h1>
      <br />
      <label htmlFor="email">email</label>
      <input
        className="p-2 text-black border rounded-lg mb-4 focus:outline:none focus:border-gray-600"
        type="email"
        name="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 text-black border rounded-lg mb-4 focus:outline:none focus:border-gray-600"
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your name"
      />
      <button onClick={onLogin} className="w-60 p-2 border border-gray-300 rounded-lg mb-4 text-white hover:outline-none hover:border-gray-600">
        LogIn
      </button>

      <p>Does not have account? <Link className="text-blue-800 font-bold" href="/signup">Register</Link></p>
    </div>
  );
}
