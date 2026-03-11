const db = require('../db/db.js')

async function getAllFlights() {
    const sql = 'SELECT *, airlines.airline FROM `flights` JOIN airlines ON flights.airlineId = airlines.airlineID'
    const [result] = await db.query(sql)

    return result
}

async function searchFlight(starting) {
    const sql = 'SELECT *, airlines.airline FROM `flights` JOIN airlines ON flights.airlineId = airlines.airlineID WHERE Date(flights.starting) = ?'
    const [result] = await db.query(sql, [starting])

    return result
}

module.exports = {getAllFlights, searchFlight}