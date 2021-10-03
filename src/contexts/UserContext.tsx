import React, { useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export interface UserInfo {
  id: string;
  name: string;
  img: string;
  experience: number;
}

interface UserContextType {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const UserContext = React.createContext<UserContextType>({
  userInfo: null,
  setUserInfo: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: Props) {
  const storageUserInfo = localStorage.getItem('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo>(
    JSON.parse(storageUserInfo as string)
  );

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
