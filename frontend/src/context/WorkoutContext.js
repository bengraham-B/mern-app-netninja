import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext() //^ Created custom workout provider context

 //& Update the state object by using a reducer. You will call the displatch function.
     //& The type describes the change that will be made. eg(CREATE_WORKOUT or SET_WORKOUTS)
        //& The second argument reprsents any data which will be needed to make the change. 'payload' -> will be an array of workout objects
               //& Ecample ->> 'dispatch({type: 'SET_WORKOUTS', playload: [{}, {}]  })'

             //& 1st arg: state, which is the prevoius state before we are making the change 
             //& 2nd arg: action

export const workoutsReducer = (state, action) => {

    switch (action.type){
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
            //& Returning a new value you want the state to be.

        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] //^ Single new workout object | ..state.workouts -> is the prevoius state.
                //& action.payload is the new workout AND '...state.workouts' is the existing arrays
            }

        case "DELETE_WORKOUT": //& Used in the the worjoutDetails component.
        console.log("DELETE context")
        return {
                //& Filtering through the array of workout objects on the current state. if the id of the workout in the array is equal to the one we want to delete
                workouts: state.workouts.filter((w) => w._id !== action.payload._id) //^ where they are not equal, we want to keep those values in the array.
            }

        

        default : {
            return state //^ return unchanged state if none match.
        }

    }
}

export const WorkoutContextProvider = ({ children }) => {
    //& first arg: Reducer function name. Second arg: initial value for state
    //& Dispatch will be used to update the state value.
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    }) 

     //& Provide state and dispatch in the 'value' so it is avaiable in the other components.
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}