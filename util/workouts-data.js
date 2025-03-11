const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname,'../', 'data', 'workouts.json')

function getStoredWorkouts() {
  const fileData = fs.readFileSync(filePath)
  const workoutsArray = JSON.parse(fileData)

  return workoutsArray;
}

function storeWorkouts(workoutsArray) {
  fs.writeFileSync(filePath, JSON.stringify(workoutsArray))
}

function getGroupedWorkouts(workoutsArray) {
  let object = {}
  const groupedWorkoutsArray = workoutsArray.reduce(function (total, currValue) {
    object = total.find(function (item) {
      return (item['date'] === currValue.date)
    })

      if (object) {
        object['workouts'].push(currValue)
      } else {
        object = {
          date: currValue.date,
          workouts: []
        }
        object['workouts'].push(currValue)
        total.push(object)
      }
      
     return total;
    }, []);

    return groupedWorkoutsArray;
}

module.exports = {
  getStoredWorkouts: getStoredWorkouts,
  storeWorkouts: storeWorkouts,
  getGroupedWorkouts: getGroupedWorkouts
}

  