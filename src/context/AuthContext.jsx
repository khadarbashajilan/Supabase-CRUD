import { useContext } from "react";
import { createContext, useState } from "react";

const AuthContext = createContext(undefined)

export const AuthContextProvider = ({children}) => {

    const [session, setsession] = useState(false)

    return (
        <AuthContext.Provider value={{session}}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};
