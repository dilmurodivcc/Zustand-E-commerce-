import React from 'react'

const Profile = () => {
    if(!localStorage.getItem("token")) window.location.href = "/login";
  return (
    <div>Profile</div>
  )
}

export default Profile