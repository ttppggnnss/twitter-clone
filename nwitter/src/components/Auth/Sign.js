import React, { useState } from 'react';

import useAuth from 'hooks/useAuth';

const Sign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { newAccount, error, error2, onSubmit, toggleAccount, onSocialClick } =
    useAuth();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={(event) => onSubmit(event, email, password)}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
        {error}
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? 'Go to Log In' : 'Go to Create Account'}
      </button>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
        {error2}
      </div>
    </>
  );
};

export default Sign;
