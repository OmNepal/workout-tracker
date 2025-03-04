import {getWorkoutDataArray} from './scripts.js';

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
const today = dayjs().format('MMMM D, YYYY')
const yesterday = dayjs().subtract(1, 'day').format('MMMM D, YYYY')

const workoutHistoryElement = document.querySelector('.js-workout-history')

let workoutDataArray = getWorkoutDataArray();

if (workoutDataArray.length === 0) {
  workoutHistoryElement.innerHTML = `
  <p class = "no-workouts-message"> 
  You have not added any workouts yet. Add Workouts in the Home page. 
  </p>
  `
}

workoutDataArray.sort((a,b) => {
  return dayjs(b.date).diff(dayjs(a.date))
})
console.log(workoutDataArray)

let sortedWorkoutObject = {}

const workoutsGroupedByDate = workoutDataArray.reduce((groups, currentWorkout) => {

  let newFormatDate = dayjs(currentWorkout.date).format('MMMM D, YYYY')

  sortedWorkoutObject = groups.find((sortedWorkoutObject) => {
    return sortedWorkoutObject['date'] === newFormatDate
  })

  if (sortedWorkoutObject) {
    sortedWorkoutObject['workouts'].push(currentWorkout);
  } else {
    sortedWorkoutObject = {}
    sortedWorkoutObject['date'] = newFormatDate
    if(!(sortedWorkoutObject['workouts'])) {
      sortedWorkoutObject['workouts'] = []
    }
    sortedWorkoutObject['workouts'].push(currentWorkout);
    groups.push(sortedWorkoutObject);
  }
  return groups;
}, [])

console.log(workoutsGroupedByDate)

workoutsGroupedByDate.forEach((workoutGroup) => {

  workoutHistoryElement.innerHTML += `
  <div class="workout-history-of-day">
  <p class="workout-date">${checkTodayYesterday(workoutGroup.date)}</p>
  <div class="workouts-grid">
    ${displayWorkoutNames(workoutGroup)}
  </div>
  <a href="summary-suggestions.html" class="workout-summary"
    >Summary & Suggestions</a
  >
</div>
  `

})

function displayWorkoutNames(workoutGroup) {
  let workoutNamesHtml = '';
  let workoutsArray = workoutGroup.workouts
  workoutsArray.forEach((workout) => {
    workoutNamesHtml += `
    <div>${workout.name} (${workout.sets}x)</div>
    `
  })

  return workoutNamesHtml;
}

function checkTodayYesterday(date) {
  if (date === today) {
    return `${date} (Today)`
  }
  else if (date === yesterday) {
    return `${date} (Yesterday)`
  }
  else return date;
}






