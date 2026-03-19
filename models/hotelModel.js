const db = require('../db/db')

async function getHotels() {
    const sql = 'SELECT * FROM `hotels`'
    const [result] = await db.query(sql)
    
    return result
}

async function createHotel(name, details, address) {
    const sql = 'INSERT INTO `hotels`( `name`, `details`, `address`) VALUES (?, ?, ?)'
    const [result] = await db.query(sql, [name, details, address])
    
    return result
}

async function updateHotel(hotelID, name, details, address) {
    const sql = 'UPDATE `hotels` SET `name`= COALESCE(NULLIF (?, ""), `name`), `details`= COALESCE(NULLIF (?, ""), `details`), `address`= COALESCE(NULLIF (?, ""), `address`) WHERE `hotelID` = ?'
    const [result] = await db.query(sql, [name, details, address, hotelID])
    
    return result
}

async function deleteHotel(hotelID) {
    const sql = 'DELETE FROM `hotels` WHERE `hotelID`=?'
    const [result] = await db.query(sql, [hotelID])
    
    return result
}

module.exports = {getHotels, createHotel, updateHotel, deleteHotel}