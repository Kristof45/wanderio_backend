const db = require('../db/db.js')

async function findByEmail(email) {
    const sql = 'SELECT * FROM `users` WHERE `email`=?'
    const [result] = await db.query(sql, [email])

    return result[0] || null
}

async function createUser(username, email, hash) {
    const sql = 'INSERT INTO users(username, email, psw, role) VALUES (?, ?, ?, "user")'
    const [result] = await db.query(sql, [username, email, hash] )

    return {insertId: result.insertId}
}

module.exports = {findByEmail, createUser}