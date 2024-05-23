import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
import { NavLink } from "react-router-dom";
import { IoIosMail } from "react-icons/io";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [new_password, setPassword] = useState("");
  const [repeat_new_password, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new_password !== repeat_new_password) {
      setMessage("Passwords do not match.");
      return;
    }

    const data = {
      username: username,
      new_password: new_password,
      repeat_new_password: repeat_new_password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/forgot-password", { 
      method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Password reset successful.");
        navigate("/login");
      } else {
        setMessage("Password reset failed.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("An error occurred while resetting your password.");
    }
  };

  return (
    <div className={styles.forgotPassword}>
      <form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>
        <h2>Forgot password</h2>
        <div className={styles.inputWithIcon}>
          <IoIosMail className={styles.icon} />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputWithIcon}>
          <IoIosMail className={styles.icon} />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your new password"
            value={new_password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputWithIcon}>
          <IoIosMail className={styles.icon} />
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            placeholder="Repeat your new password"
            value={repeat_new_password}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Reset my Password" />
        <NavLink className={styles.navItem} to="/register">
          Create account
        </NavLink>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
