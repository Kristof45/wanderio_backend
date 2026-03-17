const db = require('../db/db')

async function getHotelOrd() {
    const sql = 'SELECT * FROM `hotelorders`'
    const [result] = await db.query(sql)

    return result
}