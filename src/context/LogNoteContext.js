import { useState, createContext, useContext } from 'react';

const LogNoteContext = createContext();

function LogNoteContextProvider({ children }) {
    const [logNote, setLogNote] = useState();

    return <LogNoteContext.Provider value={[logNote, setLogNote]}>{children}</LogNoteContext.Provider>;
}

export const useLogNote = () => useContext(LogNoteContext)[0];
export const useSetLogNote = () => useContext(LogNoteContext)[1];

export default LogNoteContextProvider;
