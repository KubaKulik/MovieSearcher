import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaLock,
} from "react-icons/fa";

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Logged in successfully");
        setMessage("Logged in successfully")
        setLoggedIn(true);
        navigate("/films");
      } else {
        console.error("Login error");
        setMessage("Please enter correct details")
      }
    } catch (error) {
      console.error("An error occurred while sending the request:", error);
      setMessage("An error occurred while sending the request")
    }
  };

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <div className={styles.inputWithIcon}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <label htmlFor="password">Password:</label>
        <div className={styles.inputWithIcon}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <NavLink className={styles.navItem} to="/forgot-password">
          Forgot password?
        </NavLink>

        <input type="submit" value="Log in" />

        <NavLink className={styles.navItem} to="/register">
          Create account
        </NavLink>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
