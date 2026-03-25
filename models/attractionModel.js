const db = require('../db/db')

async function getAttractions() {
    const sql = 'SELECT * FROM `attractions`'
    const [ result] = await db.query(sql)

    return result
}

async function createAtt(cityID, name, description, address, price, image) {
    const sql = 'INSERT INTO `attractions`( `cityID`, `name`, `description`, `address`, `price`, `image`) VALUES (?,?,?,?,?,?)'
    const [result] = await db.query(sql, [cityID, name, description, address, price, image])

    return result
}

async function updateAtt(attractionID, cityID, name, description, address, price, image) {
    const sql = 'UPDATE `attractions` SET `cityID` = COALESCE(NULLIF(?, ""), `cityID`), `name` = COALESCE(NULLIF(?, ""), `name`), `description` = COALESCE(NULLIF(?, ""), `description`), `address` = COALESCE(NULLIF(?, ""), `address`), `price` = COALESCE(NULLIF(?, ""), `price`), `image` = COALESCE(NULLIF(?, ""), `image`) WHERE `attractionID`=?'
    const [result] = await db.query(sql, [cityID, name, description, address, price, image, attractionID])

    return result
}

async function deleteAtt(attractionID) {
    const sql='DELETE FROM `attractions` WHERE `attractionID`=?'
    const [ result] = await db.query(sql, [attractionID])

    return result 
}

module.exports = {getAttractions, createAtt, updateAtt, deleteAtt}