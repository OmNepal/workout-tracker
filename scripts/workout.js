import { getWorkoutDataArray } from "./scripts.js";

console.log(getWorkoutDataArray())

const favWorkoutList = document.querySelector('.js-fav-workouts')

let workoutDataArray = getWorkoutDataArray()

const workoutsGroupedByFrequency = workoutDataArray.reduce((groups, currentWorkout) => {
  let workoutName = currentWorkout.name

  if (groups[workoutName.toLowerCase()]) {
    groups[workoutName.toLowerCase()] ++;
  } else {
    groups[workoutName.toLowerCase()] = 1;
  }

  return groups;
}, {})

console.log(workoutsGroupedByFrequency)

const workoutFrequencyArray = Object.entries(workoutsGroupedByFrequency)

console.log(workoutFrequencyArray)

workoutFrequencyArray.forEach((workout) => {
  favWorkoutList.innerHTML += `
  <li>${workout[0]}: ${workout[1]} times</li>`
})