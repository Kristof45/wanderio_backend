const db = require('../db/db')

async function getHotelOrd() {
    const sql = 'SELECT ho.orderID, ho.userID, u.username, ho.hotelID, h.name AS hotelName, ho.roomID, ho.date, ho.day, ho.status FROM `hotelorders` as ho JOIN users AS u ON ho.userID = u.userID JOIN hotels AS h ON ho.hotelID = h.hotelID ORDER BY ho.date DESC'
    const [result] = await db.query(sql)

    return result
}

async function createHotelOrd(userID, hotelID, date, day, status) {
    const sql = 'INSERT INTO `hotelorders` (`userID`, hotelID, `date`, `day`, `status`) VALUES (?,?,?,?,?)'
    const [result] = await db.query(sql, [userID, hotelID, date, day, status])

    return result
}

async function updateHotOrdStat(orderID, status) {
    const sql = 'UPDATE `hotelorders` SET `status`=? WHERE `orderID`=?'
    const [result] = await db.query(sql, [status, orderID])

    return result
}

async function deleteHotelOrd(orderID) {
    const sql = 'DELETE FROM `hotelorders` WHERE `orderID`=?'
    const [result] = await db.query(sql, [orderID])

    return result
}

module.exports = { getHotelOrd, createHotelOrd, updateHotOrdStat, deleteHotelOrd }