const jwt = require('jsonwebtoken');
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") { // Replace with DB check
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ success: true, token });
    }
    res.status(401).json({ success: false, message: "Invalid credentials" });
});
