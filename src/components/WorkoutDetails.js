import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts/` + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  let workoutDetailsClassName = "workout-details"; // Default className

  if (workout.workoutType === "B") {
    workoutDetailsClassName = "workout-details-b"; // Change className for workoutType B
  } else if (workout.workoutType === "C") {
    workoutDetailsClassName = "workout-details-c"; // Change className for workoutType C
  }

  return (
    <div className={workoutDetailsClassName}>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong> {workout.load}
      </p>
      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>
      <p>
        <strong>Sets:</strong> {workout.sets}
      </p>
      <p>
        <strong>Workout Type:</strong> {workout.workoutType}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
