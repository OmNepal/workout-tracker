const addWorkoutButton = document.querySelector('.js-add-workout-button');
const workoutNameElement = document.querySelector('.js-workout-name')
const numberOfSetsElement = document.querySelector('.js-number-of-sets')
const workoutDate = document.querySelector('.js-workout-date')
const workoutNotes = document.querySelector('.js-workout-notes')
const workoutTableInitialRow = document.querySelector('.js-workout-table-inital-row')
const workoutTableBodyElement = document.querySelector('.js-workout-table-body')

const errorMessageElement = document.querySelector('.js-error-message')

const requiredEntriesArray = document.querySelectorAll('.js-add-workout-entry')

let workoutDataArray = []
let isEmpty;
let workoutNotesValue = '';

addWorkoutButton.addEventListener('click', () => {

  isEmpty = checkForEmptyFields()

  if (!isEmpty) {
    const workoutDataArray = createWorkoutDataArray();
    console.log(workoutDataArray)
    workoutTableInitialRow.innerHTML = ''

    workoutTableBodyElement.innerHTML += `
    <td>${workoutNameElement.value}</td>
    <td>${numberOfSetsElement.value}</td>
    <td>${workoutDate.value}</td>
    <td class="table-paragraph">
      ${checkNotesEmpty()}
    </td>
    `
    clearEntryFields()
  }

  

  })
  
function checkForEmptyFields() {
  if (workoutNameElement.value === '' || numberOfSetsElement.value === '' || workoutDate.value === '') {
    
    requiredEntriesArray.forEach((requiredEntry) => {
      requiredEntry.classList.add('workout-entry-error')
    })
    errorMessageElement.innerHTML = '**Complete all required fields**'

    return true;

  } else if (workoutNameElement.value !== '' && numberOfSetsElement.value !== '' && workoutDate.value !== '') {
    requiredEntriesArray.forEach((requiredEntry) => {
      requiredEntry.classList.remove('workout-entry-error')
    })
    errorMessageElement.innerHTML = ''

    return false
  }
}

function checkNotesEmpty() {
  workoutNotesValue = workoutNotes.value? workoutNotes.value : '-'
  return workoutNotesValue;
}
  
function createWorkoutDataArray() {
  workoutDataArray.push({
    name: workoutNameElement.value,
    sets: numberOfSetsElement.value,
    date: workoutDate.value,
    notes: checkNotesEmpty()
  })

  return workoutDataArray;
}

function clearEntryFields() {
  workoutNameElement.value = ''
  numberOfSetsElement.value = ''
  workoutDate.value = ''
  workoutNotes.value = ''
}
