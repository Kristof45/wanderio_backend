const db = require('../db/db')

async function getAttractions() {
    const sql = 'jSELECT a.*, GROUP_CONCAT(ai.name) AS attractionImages FROM attractions a LEFT JOIN attractionImage ai ON a.attractionID = ai.attractionID GROUP BY a.attractionID;'
    const [ result] = await db.query(sql)

    return result
}

//attractions osszekotve a attractionImg vel

async function getAttractionsImg(){
    const sql ='SELECT attractions.name, attractionimage.name AS nameImg, attractions.description, attractions.price FROM `attractions` INNER JOIN attractionimage ON attractions.attractionID = attractionimage.attractionID INNER JOIN cities ON attractions.cityID = cities.cityID;'
    const [result] = await db.query(sql)

    return result
}

async function createAtt(cityID, name, description, address, price, image) {
    const sql = 'INSERT INTO `attractions`( `cityID`, `name`, `description`, `address`, `price`, `image`) VALUES (?,?,?,?,?,?)'
    const [result] = await db.query(sql, [cityID, name, description, address, price, image])

    return result
}

async function updateAtt(attractionID, cityID, name, description, address, price) {
    const sql = 'UPDATE `attractions` SET `cityID` = COALESCE(NULLIF(?, ""), `cityID`), `name` = COALESCE(NULLIF(?, ""), `name`), `description` = COALESCE(NULLIF(?, ""), `description`), `address` = COALESCE(NULLIF(?, ""), `address`), `price` = COALESCE(NULLIF(?, ""), `price`), `image` = COALESCE(NULLIF(?, ""), `image`) WHERE `attractionID`=?'
    const [result] = await db.query(sql, [cityID, name, description, address, price, attractionID])

    return result
}

async function deleteAtt(attractionID) {
    const sql='DELETE FROM `attractions` WHERE `attractionID`=?'
    const [ result] = await db.query(sql, [attractionID])

    return result 
}

async function uploadAttractionImage(attractionID, imageUrl) {
    const sql = 'INSERT INTO `attractionimage` (`attractionID`, `name`) VALUES (?, ?)';
    const [result] = await db.query(sql, [attractionID, imageUrl]);
    
    return result;
}

module.exports = {getAttractions, getAttractionsImg, createAtt, updateAtt, deleteAtt, uploadAttractionImage}