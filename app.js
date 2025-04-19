const exp = require('constants')
const express = require('express')
const path = require('path')
const fs = require('fs')

const workoutData = require(path.join(__dirname, 'util', 'workouts-data.js'))
const workoutRoutes = require('./routes/workout.routes')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))

app.use(workoutRoutes)

app.get('/history', function (req, res) {
  const workoutsArray = workoutData.getStoredWorkouts();

  const groupedWorkoutsArray = workoutData.getGroupedWorkouts(workoutsArray);

  res.render('history', {
    groupedWorkoutsArray: groupedWorkoutsArray
  })
})

app.get('/history/:id', function (req, res) {
  const id = req.params.id

  const workoutsArray = workoutData.getStoredWorkouts()
  const groupedWorkoutsArray = workoutData.getGroupedWorkouts(workoutsArray)

  const workoutDetails = groupedWorkoutsArray.find((workout) => {
    return (workout.date === id)
  });

  console.log(workoutDetails)

  res.render('workout-details', {
    workoutDetails: workoutDetails
  })
})

app.get('/review', function (req, res) {
  const filePath = path.join(__dirname, 'views', 'review.html')
  res.sendFile(filePath)
})

app.get('/workout', function (req, res) {
  const filePath = path.join(__dirname, 'views', 'workout.html')
  res.sendFile(filePath)
})

app.get('/profile', function (req, res) {
  const filePath = path.join(__dirname, 'views', 'profile.html')
  res.sendFile(filePath)
})

app.listen(3000)
