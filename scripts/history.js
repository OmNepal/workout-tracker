import {getWorkoutDataArray} from './scripts.js';
console.log(getWorkoutDataArray())

const workoutDataArray = getWorkoutDataArray();

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
const today = dayjs()
const yesterday = dayjs().subtract(1, 'day')
console.log(today, yesterday)

let todayWorkoutData = []
let yesterdayWorkoutData = []

todayWorkoutData = workoutDataArray.filter((workoutData, index) => {
  let result = workoutData.date === today.format('YYYY-MM-DD')

  return result
})

yesterdayWorkoutData = workoutDataArray.filter((workoutData) => {
  return workoutData.date === yesterday.format('YYYY-MM-DD')
})

const workoutHistoryElement = document.querySelector('.workout-history')
workoutHistoryElement.innerHTML = `
  ${genrateTodayWorkoutHtml()}
  ${genrateYesterdayWorkoutHtml()}
`

/*
workoutDataArray.forEach((workoutData) => {
 while(workoutData.date !== today.format('YYYY-MM-DD') && 
 workoutData.date !== yesterday.format('YYYY-MM-DD')) {
  console.log(workoutData)
  
  workoutHistoryElement.innerHTML +=`
  <div class="workout-history-of-day">
  <p>Days Before Yesterday</p>
  <p class="workout-date">${workoutData.date}</p>
  <div class="workouts-grid">
    <div>${workoutData.name} (${workoutData.sets}x) (${workoutData.date})</div>

</div>
  `
 }

});
*/


console.log(todayWorkoutData)
console.log(yesterdayWorkoutData)

function genrateTodayWorkoutHtml() {
  let todayWorkoutHtml = `<div class="workout-history-of-day">
  <p class="workout-date">${today.format('MMMM D, YYYY')} (Today)</p>
  <div class="workouts-grid">`


  todayWorkoutData.forEach((todayWorkoutData) => {
    todayWorkoutHtml += 
     `
      <div>${todayWorkoutData.name} (${todayWorkoutData.sets}x)</div>   
  `
  } )

  todayWorkoutHtml += `</div>
  <a href="summary-suggestions.html" class="workout-summary"
  >Summary & Suggestions</a
> </div>`

return todayWorkoutHtml;

}

function genrateYesterdayWorkoutHtml() {
  let yesterdayWorkoutHtml = `<div class="workout-history-of-day">
  <p class="workout-date">${yesterday.format('MMMM D, YYYY')} (Yesterday)</p>
  <div class="workouts-grid">`


  yesterdayWorkoutData.forEach((yesterdayWorkoutData) => {
    yesterdayWorkoutHtml += 
     `
      <div>${yesterdayWorkoutData.name} (${yesterdayWorkoutData.sets}x)</div>   
  `
  } )

  yesterdayWorkoutHtml += `</div>
  <a href="summary-suggestions.html" class="workout-summary"
  >Summary & Suggestions</a
> </div>`

return yesterdayWorkoutHtml;

}

