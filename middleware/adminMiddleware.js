function isAdmin(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Nincs hitelesitve.' })
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Nincs jogosultságod a muvelethez' })
        }

        next()
    } catch (err) {
        return res.status(500).json({ error: 'Hiba az adminnal.' })
    }
}

module.exports = { isAdmin }