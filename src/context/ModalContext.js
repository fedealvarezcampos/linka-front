import { useState, createContext, useContext } from 'react';

const ModalContext = createContext();

function ModalContextProvider({ children }) {
    const [modal, setModal] = useState(false);

    return <ModalContext.Provider value={[modal, setModal]}>{children}</ModalContext.Provider>;
}

export const useModal = () => useContext(ModalContext)[0];
export const useSetModal = () => useContext(ModalContext)[1];

export default ModalContextProvider;
