import React from "react";

function UserProfile({ params }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      <h1>Profile</h1>
      <br />
      <p className="text-4xl">Coding <span className="p-2 rounded bg-orange-500 text-black">{params.id}</span> </p>
    </div>
  );
}

export default UserProfile;
