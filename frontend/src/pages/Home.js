import React, { useEffect } from 'react'

//^ Importing Context
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// ^ Importing Components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

export default function Home() {

    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json() //^ Array of workout objects

            if(response.ok){ //^ Checks if the response is Correct!.  It will use context to display the workouts.
                dispatch({type:'SET_WORKOUTS', payload: json}) //& Displays all the data from the data mongoDB :)              
            }

        }


        fetchWorkouts()
    },[dispatch]) //& Any time the dispaaaaaaaatch function changes, it will rerun the element
  return (
    <div className='home'>

        <div className="workouts">
            {
                workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} _id={workout._id} title={workout.title} load={workout.load} reps={workout.reps} created_at={workout.created_at} createdAt={workout.createdAt}/>
                ))
            }
        </div>

        <WorkoutForm/>

    </div>
  )
}
