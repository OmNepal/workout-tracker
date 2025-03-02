const addWorkoutButton = document.querySelector('.js-add-workout-button');
const workoutNameElement = document.querySelector('.js-workout-name')
const numberOfSetsElement = document.querySelector('.js-number-of-sets')
const workoutDate = document.querySelector('.js-workout-date')
const workoutNotes = document.querySelector('.js-workout-notes')
const workoutTableBodyElement = document.querySelector('.js-workout-table-body')

let workoutDataArray = []

addWorkoutButton.addEventListener('click', () => {

  const workoutDataArray = createWorkoutDataArray();
  console.log(workoutDataArray)

  workoutTableBodyElement.innerHTML += `
  <td>${workoutNameElement.value}</td>
  <td>${numberOfSetsElement.value}</td>
  <td>${workoutDate.value}</td>
  <td class="table-paragraph">
    ${workoutNotes.value}
  </td>
  `
  clearEntryFields()

  })
  
function createWorkoutDataArray() {
  workoutDataArray.push({
    name: workoutNameElement.value,
    sets: numberOfSetsElement.value,
    date: workoutDate.value,
    notes: workoutNotes.value
  })

  return workoutDataArray;
}

function clearEntryFields() {
  workoutNameElement.value = ''
  numberOfSetsElement.value = ''
  workoutDate.value = ''
  workoutNotes.value = ''
}
