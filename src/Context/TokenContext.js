import React, { useState,createContext, useEffect } from 'react'

export const TokenContext = createContext()

export const TokenProvider = (props) => {
    const [token,setToken] = useState ("") 
    useEffect(() => {
        if (token === "logout") {
            window.localStorage.setItem("token","")
        }
        else if (token !== "" && token !== undefined && token !== "undefined") {
            window.localStorage.setItem("token",token)
        }

    },[token])
    
    useEffect(() => {
        setToken(window.localStorage.getItem("token"))
    },[])
    
    return (
<TokenContext.Provider value={[token,setToken]}>
    {props.children}
</TokenContext.Provider>
    )
}
