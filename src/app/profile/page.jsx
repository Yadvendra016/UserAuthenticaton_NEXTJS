"use client"
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing")

  const logout = async () =>{
    try {
      const {data} = await axios.get("/api/users/logout");
      router.push('/login')

    } catch (error) {
      console.log("Error while logout =", error);
    }
  }

  const getUserDetails = async () =>{
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data._id)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 text-white'>
      <h1>Profile</h1>
      <br />
      <p>Profile page</p>
      {/* For user data shown */}
      <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
      <hr />
      {/* logout button */}
      <button onClick={logout} className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Logout</button>
      {/* for getting user details */}
      <button onClick={getUserDetails} className='bg-orange-500 mt-4 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded'>User Detail</button>
    </div>
  )
}

export default ProfilePage;
