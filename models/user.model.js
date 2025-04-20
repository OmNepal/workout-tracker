const db = require('../data/database')

class User {
  constructor(userData) {
    this.email = userData.email,
      this.password = userData.password
  }

  static async findByEmail(userEmail) {
    const matchingUser = await db.getDb().collection('users').findOne({
      email: userEmail
    })

    return matchingUser
  }

  async signup() {
    const user = {
      email: this.email,
      password: this.password
    }
    await db.getDb().collection('users').insertOne(user)
  }
}

module.exports = User