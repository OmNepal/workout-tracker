const exp = require('constants')
const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.use(express.static('public'))



app.get('/', function (req, res) {

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

app.post('/', function (req, res) {
  const workoutDetail = req.body
  if (!(workoutDetail.description)) {
    workoutDetail.description = '-'
  }

  const filePath = path.join(__dirname, 'data', 'workouts.json')

  const fileData = fs.readFileSync(filePath)
  const workoutsArray = JSON.parse(fileData)

  workoutsArray.push(workoutDetail)

  fs.writeFileSync(filePath, JSON.stringify(workoutsArray))

  /*
  let workoutDetailRow;
  workoutDetailRow += `
  <tr>
  <td>${workoutDetail.name}</td>
  <td>${workoutDetail.sets}</td>
  <td>${workoutDetail.date}</td>
  <td>${workoutDetail.description}</td>
</tr>
  `
  */
  res.render('index', {
    workoutsArray: workoutsArray
  })
})

app.get('/history', function (req, res) {
  const filePath = path.join(__dirname,'views', 'history.html')
  res.sendFile(filePath)
})

app.get('/workout', function (req, res) {
  const filePath = path.join(__dirname,'views', 'workout.html')
  res.sendFile(filePath)
})

app.get('/profile', function (req, res) {
  const filePath = path.join(__dirname,'views', 'profile.html')
  res.sendFile(filePath)
})

app.listen(3000)
