import React, { useState } from 'react'

//& Importing Context
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

export default function WorkoutForm() {

    //&Using Context
    const { dispatch } = useWorkoutsContext() //& Used to update the UI when the user adds a workout




    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [epmtyFields, setEmptyFields] = useState([]) //~ Error if the user leves a field open when creating a workout

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        //^ Sending POST request
        const response = await fetch('/api/workouts', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": 'application/json'
            }
        })

        const json = await response.json()

        //^ If there was an error sending the data to the DB.
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setError(null) //^ Setting error to null, incase there was one prevosulsy 
            console.log('new workout added', json)

            //^ Reseting form inputs
            setTitle('')
            setLoad('')
            setReps('') 

            //& Using Context to update the UI when the user adds a workout
            dispatch({type: "CREATE_WORKOUT", payload: json}) //^ 'json' is the newly added workout 

            //~ Setting the emptyFields state back to an empty array once the user has filled them in correctly
            setEmptyFields([])

        }
    }



  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add A New Workout</h3>

        <label>Exercise Title</label>
        <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)} //^ target: the event target.
            value={title} //^ Used to reset the form.
            className={epmtyFields.includes('title') ? 'error': ''} //~ If the error is present it will apply the class of error and if the error is not present it will either not have the class or it will remove it.
        />

        <label>Load (in kg)</label>
        <input 
            type="number" 
            onChange={(e) => setLoad(e.target.value)} //^ target: the event target.
            value={load} //^ Used to reset the form.
            className={epmtyFields.includes('load') ? 'error': ''} //~ If the error is present it will apply the class of error and if the error is not present it will either not have the class or it will remove it.

            
        />

        <label>Reps</label>
        <input 
            type="number" 
            onChange={(e) => setReps(e.target.value)} //^ target: the event target.
            value={reps} //^ Used to reset the form.
            className={epmtyFields.includes('reps') ? 'error': ''} //~ If the error is present it will apply the class of error and if the error is not present it will either not have the class or it will remove it.

        />

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}
