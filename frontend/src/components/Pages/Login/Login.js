import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './Login.module.scss';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Logged in successfully');
        setLoggedIn(true);
        navigate('/films'); 
      } else {
        console.error('Login error');
      }
    } catch (error) {
      console.error('An error occurred while sending the request:', error);
    }
  };

  return (
    <div className={styles.login}>
      <h2>Logowanie</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label htmlFor="username">Nazwa użytkownika:</label>
        <input type="text" id="username" name="username" placeholder="Wprowadź nazwę użytkownika" value={username} onChange={(e) => setUsername(e.target.value)} />
        
        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password" name="password" placeholder="Wprowadź hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <input type="submit" value="Zaloguj się" />
      </form>
    </div>
  );
};

export default Login;
