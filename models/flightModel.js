const db = require('../db/db.js')

async function getAllFlights() {
    const sql = 'SELECT *, airlines.airline FROM `flights` JOIN airlines ON flights.airlineId = airlines.airlineID'
    const [result] = await db.query(sql)

    return result
}

async function searchFlight(starting, departure, destination) {
    const sql = 'SELECT *, airlines.airline FROM `flights` JOIN airlines ON flights.airlineId = airlines.airlineID WHERE Date(flights.starting) = ? AND flights.departure = ? AND flights.destination=?'
    const [result] = await db.query(sql, [starting, departure, destination])

    return result
}

async function createFlight(airlineId, starting, arivval, price, departureCityID, destinationCityID) {
    const sql = 'INSERT INTO `flights`(`airlineId`, `starting`, `arivval`, `price`, departureCityID, destinationCityID) VALUES (?,?,?,?,?,?)'
    const [result] = await db.query(sql, [airlineId, starting, arivval, price, departureCityID, destinationCityID])

    return result
}

async function updateFlight(flightsId, airlineId, starting, arivval, price, departureCityID, destinationCityID) {
    const sql = 'UPDATE `flights`SET `airlineId` = COALESCE(NULLIF(?, ""), `airlineId`), `starting` = COALESCE(NULLIF(?, ""), `starting`), `arivval` = COALESCE(NULLIF(?, ""), `arivval`),`price` = COALESCE(NULLIF(?, ""), `price`), departureCityID = COALESCE(NULLIF(?, ""), `departureCityID`), destinationCityID = COALESCE(NULLIF(?, ""), `destinationCityID`) WHERE `flightsId` = ?;'
    
    const [result] = await db.query(sql, [airlineId, starting, arivval, price, departureCityID, destinationCityID, flightsId])

    return result
}

async function deleteFlight(flightsId) {
    const sql = 'DELETE FROM `flights` WHERE `flightsId`=?'
    const [result] = await db.query(sql, [flightsId])

    return result
}

async function adGetFlights() {
    const sql = 'SELECT f.flightsId, a.airline, f.starting, f.arivval, f.price, c1.name AS depCity, c2.name AS destCity FROM `flights` AS f JOIN cities AS c1 ON f.departureCityID = c1.cityID JOIN cities AS c2 ON f.destinationCityID = c2.cityID JOIN airlines AS a ON f.airlineId = a.airlineID ;'
    const [result] = await db.query(sql)
    
    return result
}

module.exports = {getAllFlights, searchFlight, createFlight, updateFlight, deleteFlight, adGetFlights}