import { createContext, useState } from "react";

interface Props{
  children:React.ReactNode
}

export const UserContext = createContext(null);

export function UserContextProvider({children}:Props) {
  const [appUser,setAppUser] = useState<any>(null);
  return (
    <UserContext.Provider value={{appUser,setAppUser} as any}>
      {children}
    </UserContext.Provider>
  );
}