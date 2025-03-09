import loginImg from "../assets/Untitled.png";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import API from "../API";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    return <Navigate to="/profile" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        username,
        password,
      });

      if (res.status === 200) { // ✅ statusText o'rniga status === 200 ishlatish
        localStorage.setItem("token", res.data.accessToken);
        window.dispatchEvent(new Event("storage")); // ✅ Header ni avtomatik yangilash
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login xatosi:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                name="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="right-side">
          <img src={loginImg} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
