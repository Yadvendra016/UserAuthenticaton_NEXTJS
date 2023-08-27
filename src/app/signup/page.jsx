"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import Link from "next/link";

export default function SignUp() {
  //states
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const router = useRouter();

  const onSubmit = async () => {
    try {
      const {data} = await axios.post("/api/users/signup", user);
      console.log(data);

      router.push('/login');

    } catch (error) {
      console.log("Register failed =>", error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center  justify-center  py-11 text-white">
      <h1 className="text-3xl">Register</h1>
      <br />
      <label htmlFor="username">username</label>
      <input
        className="p-2 text-black border rounded-lg mb-4 focus:outline:none focus:border-gray-600"
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter your name"
      />
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
      <button onClick={onSubmit} className="w-60 p-2 border border-gray-300 rounded-lg mb-4 text-white hover:outline-none hover:border-gray-600">
        Register
      </button>

      <p>Already have account? <Link className="text-blue-800 font-bold" href="/login">Login</Link></p>
    </div>
  );
}
