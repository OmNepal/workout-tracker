const express = require('express')

const router = express.Router()

router.get('/', function (req, res) {

  const filePath = path.join(__dirname, 'data', 'workouts.json')

  const fileData = fs.readFileSync(filePath)
  const workoutsArray = JSON.parse(fileData)

  if (workoutsArray.length === 0) {
    workoutsArray.push({
      name: '-',
      sets: '-',
      date: '-',
      description: '-'
    })
  }

  res.render('index', {
    workoutsArray: workoutsArray
  })
})

router.post('/', function (req, res) {
  const workoutDetail = req.body
  if (!(workoutDetail.description)) {
    workoutDetail.description = '-'
  }

  const workoutsArray = workoutData.getStoredWorkouts()

  workoutsArray.push(workoutDetail)

  workoutData.storeWorkouts(workoutsArray)

  res.render('index', {
    workoutsArray: workoutsArray
  })
})

module.exports = router;