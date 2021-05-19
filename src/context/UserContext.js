import { useState, createContext, useContext } from 'react';

const UserContext = createContext();

function UserContextProvider({ children }) {
    const [user, setUser] = useState(true);

    return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext)[0];
export const useSetUser = () => useContext(UserContext)[1];

export default UserContextProvider;
