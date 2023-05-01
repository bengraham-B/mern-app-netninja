import { AuthContext } from "../context/AuthContext"; //^ Actual context which was created at the top of the file.
import { useContext } from 'react'

//& Used in the Home.js -> Page.

export const useAuthContext  =() => {
    const context = useContext(AuthContext)

    if(!context){
        throw Error("useAuthContext must be used inside a AuthContextProvider")
    }

    return context
}

