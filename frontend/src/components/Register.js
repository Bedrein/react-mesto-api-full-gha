import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleRegister({ email, password });
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <section className="auth">
      <h2 className="auth__header-form">Регистрация</h2>

      <form
        className="auth__form"
        name="auth-form-auth"
        onSubmit={handleSubmit}>
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
          Зарегистрироваться
        </button>

        <Link to="/sign-in" className="auth__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}

export default Register;
