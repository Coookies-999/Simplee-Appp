import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext()

function AuthProvider ({children}){
    const [FirstName,setFirstName] = useState("")
    const [authUser,setAuthUser] = useState(false)
    return(
        <AuthContext.Provider value={{setFirstName,setAuthUser,FirstName}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=() => useContext(AuthContext)
export default AuthProvider