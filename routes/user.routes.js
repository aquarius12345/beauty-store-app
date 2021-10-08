const { Router } = require('express');
const User = require('../models/User');

const router = Router();

router.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/user-logged', async (req, res) => {
    const { id } = req.user;

    try {
        const users = await User.findById(id);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;