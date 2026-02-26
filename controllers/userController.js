const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {config} = require('../config/dotenvConfig')
const {findByEmail, createUser} = require('../models/userModel')

const cookieOpts = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
}

//registration
async function register(req, res) {
    try {
        const {email, username, psw} = req.body
        //console.log(email, username, psw);

        if (!email || !username || !psw) {
            return res.status(400).json({ error: 'Töltsd ki az összes mezőt!' })
        }

        const exists = await findByEmail(email)
        //console.log(exists);

        if (exists === 1) {
            return res.status(409).json({ error: 'Az email már foglalt' })
        }

        const hash = await bcrypt.hash(psw, 10)

        const { insertId } = await createUser(username, email, hash)

        return res.status(201).json({ message: 'Sikeres regisztracio', insertId })
    } catch (err) {
        return res.status(500).json({error: 'Regisztracios hiba', err})
    }
}

//login
async function login(req, res) {
    try {
        const { email, psw} = req.body
        //console.log(email, psw);

        if (!email || ! psw) {
            return res.status(400).json({error: 'Email es jelszo kotelezo'})
        }

        const exists = await findByEmail(email)
        //console.log(exists);

        if (!exists) {
            return res.status(401).json({ error: 'Hibas email' })
        }

        const ok = await bcrypt.compare(psw, exists.psw)
        //console.log(ok);
        if (!ok) {
            return res.status(401).json({error: 'Hibas jelszo'})
        }

        const token = jwt.sign({ userID: exists.userID, username: exists.username, email: exists.email, role: exists.role},
            config.JWT_SECRET,
            {expiresIn: config.JWT_EXPIRES_IN}
        )
        console.log(token);

        res.cookie(config.COOKIE_NAME, token, cookieOpts)
        
        return res.status(200).json({message: 'Sikeres login'})
    } catch (err) {
        return res.status(500).json({error: 'Belépési hiba', err})
    }
}

//logout
async function logout(req, res) {
    try {
        return res.clearCookie(config.COOKIE_NAME, {path: '/'}).status(200).json({message: 'Sikeres kijelentkezés'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba a kijelentkezés során'})
    }
}

module.exports = { register, login, logout }