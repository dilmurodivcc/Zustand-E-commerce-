import loginImg from "../assets/Untitled.png";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import API from "../API";

const Login = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    return <Navigate to="/profile" />;
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await API.post("/auth/login", { username, password });
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      window.dispatchEvent(new Event("storage"));
      navigate("/profile");
    },
    onError: (error) => {
      console.error("Login xatosi:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(); // `useMutation` orqali login so‘rovi jo‘natiladi
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
            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Yuklanmoqda..." : "Login"}
            </button>
          </form>
          {mutation.isError && <p style={{ color: "red" }}>Login xatosi!</p>}
        </div>
        <div className="right-side">
          <img src={loginImg} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
