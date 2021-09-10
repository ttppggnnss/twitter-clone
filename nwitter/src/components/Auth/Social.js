import React from 'react';

const Social = () => {
  return (
    <div>
      <button name="google" onClick={onSocialClick}>
        Continue with Google
      </button>
      <button name="github" onClick={onSocialClick}>
        Continue with Github
      </button>
      {error2}
    </div>
  );
};
