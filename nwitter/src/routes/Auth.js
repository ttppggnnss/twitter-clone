import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    if (newAccount) {
      // create account
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return user;
        })
        .catch((error) => {
          setError(error.code.substr(5));
        });
    } else {
      // log in
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return user;
        })
        .catch((error) => {
          setError(error.code.substr(5));
        });
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
    setError("");
  };

  const onSocialClick = async (event) => {
    const auth = getAuth();
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    } else if (name === "github") {
      provider = new GithubAuthProvider();
      provider.addScope("repo");
    }
    await signInWithPopup(auth, provider).catch((error) => {
      setError2(error.code.substr(5));
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
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
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? "Go to Log In" : "Go to Create Account"}
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
    </div>
  );
};

export default Auth;
