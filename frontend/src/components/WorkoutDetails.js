import React from 'react'
// import formatDistanceToNow from 'date-fns/formatDistanceToNow' //? date-fns
import { useWorkoutsContext } from '../hooks/useWorkoutsContext' //& Importing context hook

export default function WorkoutDetails( workout ) {

	const {dispatch} = useWorkoutsContext()
  // const createdAtBen = workout.created_at

  //^ DELETE from MongoDB
  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    })

    const json = await response.json() //^ Returns document which was just deleted.

    //^ If the workout was succesfully deleted.
    if(response.ok){
      	//& If the delete request was successful context will update the UI
		console.log(json)
		dispatch({type: "DELETE_WORKOUT", payload: json}) //& The json is the document which is going to be deleted.
    }

  }
  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong> {workout.load}</p>
        <p><strong>Reps: </strong> {workout.reps}</p>
        {/* <p>{formatDistanceToNow(new Date(workout.createdAt, { addSuffix: true }))  }</p> */}
        {/* <p>{workout.created_at}</p> */}
        <p>{workout.createdAt}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}
