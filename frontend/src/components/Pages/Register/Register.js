
import styles from './Register.module.scss';

const Register = () => {
  return (
    <div className={styles.register}>
      <h2>Rejestracja</h2>
      <form className={styles.registerForm} action="/submit" method="post">
        <label htmlFor="username">Nazwa użytkownika:</label>
        <input type="text" id="username" name="username" required />
        
        <label htmlFor="email">Adres email:</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password" name="password" required />
        
        <label htmlFor="confirm_password">Potwierdź hasło:</label>
        <input type="password" id="confirm_password" name="confirm_password" required />
        
        <input type="submit" value="Zarejestruj się" />
      </form>
    </div>
  );
};

export default Register;
