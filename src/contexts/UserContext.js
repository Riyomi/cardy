import React, { useContext, useState } from 'react';

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo'))
  );

  return (
    <UserContext.Provider
      value={{
        userInfo: userInfo?.user,
        accessToken: userInfo?.accessToken,
        expires: Date.parse(userInfo?.expires),
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
