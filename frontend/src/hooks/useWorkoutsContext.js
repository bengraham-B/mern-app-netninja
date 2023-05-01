import { WorkoutsContext } from "../context/WorkoutContext"; //^ Actual context which was created at the top of the file.
import { useContext } from 'react'

//& Used in the Home.js -> Page.

export const useWorkoutsContext  =() => {
    const context = useContext(WorkoutsContext)

    if(!context){
        throw Error("useWorkouutsContext must be used inside a WorkoutsContextProvider")
    }

    return context
}

