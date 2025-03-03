import { getWorkoutDataArray, saveToStorage } from "./scripts.js";

const addWorkoutButton = document.querySelector('.js-add-workout-button');
const workoutNameElement = document.querySelector('.js-workout-name')
const numberOfSetsElement = document.querySelector('.js-number-of-sets')
const workoutDate = document.querySelector('.js-workout-date')
const workoutNotes = document.querySelector('.js-workout-notes')

console.log(workoutNotes)
const workoutTableInitialRow = document.querySelector('.js-workout-table-inital-row')
const workoutTableBodyElement = document.querySelector('.js-workout-table-body')
console.log(workoutTableBodyElement)

const errorMessageElement = document.querySelector('.js-error-message')

const requiredEntriesArray = document.querySelectorAll('.js-add-workout-entry')

let isEmpty;
let workoutNotesValue = '';

 let workoutDataArray = getWorkoutDataArray();
workoutDataArray.forEach((localWorkoutData) => {
  displayWorkoutDataHtml(localWorkoutData)
})

addWorkoutButton.addEventListener('click', () => {

  isEmpty = checkForEmptyFields()

  if (!isEmpty) {
    workoutDataArray = createWorkoutDataArray();
    console.log(workoutDataArray)

    const latestWorkoutData = workoutDataArray[workoutDataArray.length-1]

    saveToStorage(workoutDataArray);

    displayWorkoutDataHtml(latestWorkoutData)
    clearEntryFields()
  }
  })

  //function declarations below

   function displayWorkoutDataHtml(latestWorkoutData) {
    workoutTableInitialRow.innerHTML = ''
    workoutTableBodyElement.innerHTML += `
    <td>${latestWorkoutData.name}</td>
    <td>${latestWorkoutData.sets}</td>
    <td>${latestWorkoutData.date}</td>
    <td class="table-paragraph">
      ${checkNotesEmpty()}
    </td>
    `
  }

  function checkNotesEmpty() {
    workoutNotesValue = workoutNotes.value? workoutNotes.value : '-'
    return workoutNotesValue;
    }

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

    function clearEntryFields() {
      workoutNameElement.value = ''
      numberOfSetsElement.value = ''
      workoutDate.value = ''
      workoutNotes.value = ''
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
      
     
      
  