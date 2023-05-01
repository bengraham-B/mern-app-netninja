import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

//^ User signups in this hook
export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email, password})
        })

        const json = await response.json() //^ Returns info about jwt if successs and if not sends back an erro message
        console.log(json)

        if(!response.ok){
            setIsLoading(false)
            setError(json.err)
        }
        if(response.ok){
            //^ Save user to local storage, their email and jwt 
            localStorage.setItem('user', JSON.stringify(json))
            
            //^ Update authContext
            dispatch({type: "LOGIN", payload: json})
            setIsLoading(false)

        }
    }
    return { signup, isLoading, error }
}