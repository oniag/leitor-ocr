module.exports = {
  randonNumber() {
    const d = new Date().getTime()
    const hashNumber = `${Math.random() * (100 - 2000) + 2000}-${d}`

    return hashNumber
  }
}