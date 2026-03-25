const db = require('../db/db')

async function getHotels() {
    const sql = 'SELECT * FROM `hotels`'
    const [result] = await db.query(sql)
    
    return result
}

async function createHotel(cityID, name, details, address) {
    const sql = 'INSERT INTO `hotels`(cityID, `name`, `details`, `address`) VALUES (?, ?, ?, ?)'
    const [result] = await db.query(sql, [cityID, name, details, address])
    
    return result
}

async function updateHotel(cityID, hotelID, name, details, address) {
    const sql = 'UPDATE `hotels` SET cityID = COALESCE(NULLIF (?, ""), `cityID`), `name`= COALESCE(NULLIF (?, ""), `name`), `details`= COALESCE(NULLIF (?, ""), `details`), `address`= COALESCE(NULLIF (?, ""), `address`) WHERE `hotelID` = ?'
    const [result] = await db.query(sql, [cityID, name, details, address, hotelID])
    
    return result
}

async function deleteHotel(hotelID) {
    const sql = 'DELETE FROM `hotels` WHERE `hotelID`=?'
    const [result] = await db.query(sql, [hotelID])
    
    return result
}

module.exports = {getHotels, createHotel, updateHotel, deleteHotel}