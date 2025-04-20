const db = require('../data/database')

class Workout {
  constructor(workoutData) {
    this.name = workoutData.name,
      this.sets = workoutData.sets,
      this.date = workoutData.date,
      this.notes = workoutData.notes
  }

  getAllWorkouts() {

  }

  async save() {
    const workoutData = {
      name: this.name,
      sets: this.sets,
      date: this.date,
      notes: this.notes
    }
    const response = await db.getDb().collection('workouts').insertOne(workoutData)

    return response;
  }
}