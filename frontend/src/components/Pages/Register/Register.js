import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import {
  FaUser,
  FaLock,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Registered successfully");
        setMessage("Registered successfully");
        navigate("/login");
      } else {
        console.error("Registration error");
        setMessage("Please enter correct details");
      }
    } catch (error) {
      console.error("An error occurred while sending the request:", error);
      setMessage("An error occurred while sending the request");
    }
  };

  return (
    <div className={styles.register}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <label htmlFor="username">Login:</label>
        <div className={styles.inputWithIcon}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Enter your login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <label htmlFor="email">E-mail adress:</label>
        <div className={styles.inputWithIcon}>
          <IoIosMail className={styles.icon} />
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label htmlFor="password">Password:</label>
        <div className={styles.inputWithIcon}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <label htmlFor="confirm_password">Confirm password:</label>
        <div className={styles.inputWithIcon}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            required
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <input type="submit" value="Create an account" />

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default Register;
