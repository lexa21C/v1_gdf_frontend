import React, {
  createContext,
  useState,
  useContext,
  useCallback
} from 'react';

export const UserContext = createContext();

export function useAuth(){
        return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [userJsona, setUserJson] = useState(null)
  const [isLoggedInd,setIsLoggendIn]= useState(false)
  useCallback(()=>{

  },[])

  return (
    <UserContext.Provider value={{ userJsona, setUserJson, isLoggedInd, setIsLoggendIn }}>
      {children}
    </UserContext.Provider>
  );
};