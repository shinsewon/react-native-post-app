import React, {createContext, useState, useContext} from 'react';

const UserContext = createContext(null);

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);

  return <UserContext.Provider value={{user, setUser}} children={children} />;
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!useContext) {
    throw new Error('UserContext.Prover is not Found');
  }
  return userContext;
}
