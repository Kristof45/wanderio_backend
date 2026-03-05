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

async function updatePsw(userID, hash) {
    const sql = 'UPDATE `users` SET psw=? WHERE userID=?'
    const [result] = await db.query(sql, [ hash, userID])
    return result
}

async function getUserById(userID) {
    const sql = 'SELECT * FROM users WHERE userID=?'
    const [result] = await db.query(sql, [userID])

    return result[0] || null
}

async function updateName(userID, username) {
    const sql = 'UPDATE `users` SET `username`=? WHERE `userID`=?'
    const result= await db.query(sql, [username, userID])
    return result
}

module.exports = {findByEmail, createUser, updatePsw, getUserById, updateName}