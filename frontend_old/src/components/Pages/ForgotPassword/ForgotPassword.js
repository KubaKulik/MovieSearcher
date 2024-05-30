import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaLock,
} from "react-icons/fa";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const resetPassword = async (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ ok: true });
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== repeatNewPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const data = {
      username: username,
      new_password: newPassword,
      repeat_new_password: repeatNewPassword,
    };

    try {
      const response = await resetPassword(data);
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
          <FaUser className={styles.icon} />
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
          <FaLock className={styles.icon} />
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputWithIcon}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            id="repeatNewPassword"
            name="repeatNewPassword"
            placeholder="Repeat your new password"
            value={repeatNewPassword}
            onChange={(e) => setRepeatNewPassword(e.target.value)}
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



/*

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaLock,
} from "react-icons/fa";

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
          <FaUser className={styles.icon} />
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
          <FaLock className={styles.icon} />
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
          <FaLock className={styles.icon} />
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

*/