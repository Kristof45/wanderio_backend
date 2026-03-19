const db = require('../db/db')

async function getHotelOrd() {
    const sql = 'SELECT * FROM `hotelorders`'
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

module.exports = {getHotelOrd, createHotelOrd, updateHotOrdStat, deleteHotelOrd}