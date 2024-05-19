import styles from './Register.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const data = {
      username: username,
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Registered successfully');
        navigate('/login');
      } else {
        console.error('Registration error');
      }
    } catch (error) {
      console.error('An error occurred while sending the request:', error);
    }
  };

  return (
    <div className={styles.register}>
      <h2>Rejestracja</h2>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <label htmlFor="username">Nazwa użytkownika:</label>
        <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        
        <label htmlFor="email">Adres email:</label>
        <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <label htmlFor="confirm_password">Potwierdź hasło:</label>
        <input type="password" id="confirm_password" name="confirm_password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        
        <input type="submit" value="Zarejestruj się" />
      </form>
    </div>
  );
};

export default Register;
