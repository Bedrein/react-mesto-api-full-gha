import { useState } from 'react';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleLogin({ email, password });
  }

  return (
    <section className="auth">
      <h2 className="auth__header-form">Вход</h2>
      <form className="auth__form" name="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth__form-input"
          type="email"
          placeholder="Email"
          name="email"
          minLength="2"
          maxLength="35"
          value={email || ''}
          onChange={handleChangeEmail}
        />

        <input
          className="auth__form-input"
          type="password"
          placeholder="Пароль"
          name="password"
          minLength="6"
          maxLength="16"
          value={password || ''}
          onChange={handleChangePassword}
        />

        <button className="auth__form-button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
