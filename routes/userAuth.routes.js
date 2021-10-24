const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cart = require('../models/Cart');

const router = Router();

router.post('/user-auth/signup', async (req, res) =>{
    const { name, email, password } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error('Missing field');
        }

        const mail = await User.findOne({ email });
        if (mail) {
            throw new Error('Email already in use');
        }

        const user = await User.findOne({ name });
        if (user) {
            throw new Error('Username already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            passwordHash
        });

        res.status(201).json({
            name: newUser.name
        });
        
    } catch (error) {
        res.status(500).json({ msg: 'Error while creating user', error: error.message || error })
    }
});


router.post('/user-auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Email not found, please digit a valid email')
        }

        const compareHash = bcrypt.compareSync(password, user.passwordHash);
        if (!compareHash) {
            throw new Error('Email or password incorrect')
        }

        const payload = {
            id: user.id,
            name: user.name
        };

        //criando token
        const token = jwt.sign(
            payload,
            process.env.SECRET_JWT,
            { expiresIn: '1day' }
        );
        res.status(200).json({ msg: payload, token });
        
    } catch (error) {
        res.status(500).json({ message: 'Error trying to login', error: error.message || error });
    }
});

module.exports = router;

