import React, { createContext, useState } from 'react';

export const myUserContext = createContext({ user: {}, updateUser: () => {} });

function UserContext({ children }) {
  const [user, setUser] = useState({});

  const updateUserByKey = (key, value) => {
    const userCopy = {};
    Object.assign(userCopy, user);
    userCopy[key] = value;
    setUser(userCopy);
  };

  return (
    <myUserContext.Provider
      value={{
        user: user,
        updateUser: (key, value) => updateUserByKey(key, value),
      }}
    >
      {children}
    </myUserContext.Provider>
  );
}

export default UserContext;
