import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../API";

const Profile = () => {
  const [user, setuser] = useState({});
  useEffect(() => {
    API.get("/auth/me").then((res) => {
      setuser(res.data);
    });
  }, []);

  console.log(user);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="left">
          <img src={user.image} alt="" />
        </div>
        <div className="right">
          <div className="fullname">
            <p>
              <b>Fullname: </b> {user.firstName} {user.lastName}
            </p>
          </div>
          <p>
            <b>Email: </b>
            {user.email}
          </p>
          <p>
            <b>Phone: </b>
            {user.phone}
          </p>  
          <p>
            <b>Role: </b>
            {user.role}
          </p>
          <p>
            <b>Gender: </b>
            {user.gender}
          </p>
          <p>
            <b>University: </b>
            {user.university}
          </p>
          <p>
            <b>Weight: </b>
            {user.weight}kg
          </p>
          <p>
            <b>Birth Date: </b>
            {user.birthDate}
          </p>
          <p>
            <b>IP: </b>
            {user.ip}
          </p>
          <p>
            <b>MaidenName: </b>
            {user.maidenName}
          </p>
          <p>
            <b>MacAddress: </b>
            {user.macAddress}
          </p>
          <p>
            <b>Age: </b>
            {user.age}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
