import React, { useState } from 'react';
import { useAuthDispatch, useAuthState } from 'hooks';

const Sign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signAction, toggleAction, socialAction } = useAuthDispatch();
  const { newAccount, error, error2 } = useAuthState();

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
      <form onSubmit={(event) => signAction({ event, email, password })}>
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
      <button onClick={toggleAction}>
        {newAccount ? 'Go to Log In' : 'Go to Create Account'}
      </button>
      <div>
        <button name="google" onClick={(event) => socialAction({ event })}>
          Continue with Google
        </button>
        <button name="github" onClick={(event) => socialAction({ event })}>
          Continue with Github
        </button>
        {error2}
      </div>
    </>
  );
};

export default Sign;
