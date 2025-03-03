
export function getWorkoutDataArray() {
  return JSON.parse(localStorage.getItem('workoutDataArray')) || [];
}

export function saveToStorage(workoutDataArray) {
localStorage.setItem('workoutDataArray', JSON.stringify(workoutDataArray))
}

