const db = require('../db/db')

async function getTicketOrders() {
    const sql = 'SELECT t.orderID, t.userID, u.username, f.flightsId, f.starting, f.arivval, a.airline AS airlineName, dep_city.name AS departureCityName, dest_city.name AS destinationCityName, t.status FROM ticketOrders AS t JOIN users AS u ON t.userID = u.userID JOIN flights AS f ON t.flightsId = f.flightsId JOIN airlines AS a ON f.airlineID = a.airlineID JOIN cities AS dep_city ON f.departureCityID = dep_city.cityID JOIN cities AS dest_city ON f.destinationCityID = dest_city.cityID ORDER BY t.orderID DESC;'
    const [result] = await db.query(sql)

    return result
}

async function getTicketOrder(userID) {
    const sql = 'SELECT * FROM `ticketorders` WHERE `userID`=?'
    const [result] = await db.query(sql, [userID])

    return result
}

async function createTicketOrder(userID, airlineId, status) {
    const sql = 'INSERT INTO `ticketorders`( `userID`, `airlineId`, `status`) VALUES (?,?,?)'
    const [result] = await db.query(sql, [userID, airlineId, status])

    return {insertId: result.insertId}
}

async function updateTicketStatus(orderID, status) {
    const sql = 'UPDATE `ticketorders` SET `status`=? WHERE `orderID`=?'
    const [result] = await db.query(sql, [status, orderID])

    return result
}

async function deleteTicketOrder(orderID) {
    const sql = 'DELETE FROM `ticketorders` WHERE `orderID`= ? '
    const [result] = await db.query(sql, [orderID])

    return result
}

// async function getCartForUser(userID) {
//     // 1. HOTEL FOGLALÁSOK LEKÉRÉSE A KOSÁRBÓL
//     const hotelSql = `
//         SELECT 
//             ho.orderID,
//             h.name,
//             c.name as city,
//             r.price,
//             hi.hotelImg as imageUrl
//         FROM hotelorders ho
//         JOIN hotels h ON ho.hotelID = h.hotelID
//         JOIN cities c ON h.cityID = c.cityID
//         JOIN rooms r ON ho.roomID = r.roomID
//         LEFT JOIN hotelimage hi ON h.hotelID = hi.hotelID
//         WHERE ho.userID = ? AND ho.status = 'in_cart'
//         GROUP BY ho.orderID
//     `;
//     const [hotels] = await db.query(hotelSql, [userID]);

//     // 2. REPJÁRAT FOGLALÁSOK LEKÉRÉSE A KOSÁRBÓL
//     const flightSql = `
//         SELECT 
//             tord.orderID,
//             a.airline as name,
//             dep_city.name as 'from',
//             dest_city.name as 'to',
//             f.price,
//             ai.airlineImg as imageUrl
//         FROM ticketorders tord
//         JOIN flights f ON tord.airlineId = f.flightsId
//         JOIN airlines a ON f.airlineId = a.airlineID
//         JOIN cities dep_city ON f.departureCityID = dep_city.cityID
//         JOIN cities dest_city ON f.destinationCityID = dest_city.cityID
//         LEFT JOIN airlineimage ai ON a.airlineID = ai.airlineID
//         WHERE tord.userID = ? AND tord.status = 'in_cart'
//         GROUP BY tord.orderID
//     `;
//     const [flights] = await db.query(flightSql, [userID]);

//     // 3. EREDMÉNY VISSZAADÁSA (Formázás nélkül, mert az URL-ek már jók)
//     return {
//         hotels: hotels,
//         flights: flights
//     };
// }

module.exports = {getTicketOrders, getTicketOrder, createTicketOrder, updateTicketStatus, deleteTicketOrder}