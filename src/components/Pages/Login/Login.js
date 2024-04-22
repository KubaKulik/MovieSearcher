import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.login}>
      <h2>Logowanie</h2>
      <form className={styles.loginForm} action="/login" method="post">
        <label htmlFor="username">Nazwa użytkownika:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password" name="password" required />

        <input type="submit" value="Zaloguj się" />
      </form>
    </div>
  );
};

export default Login;