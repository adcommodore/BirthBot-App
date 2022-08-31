const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
    
    // @description create admininstrator
    // @route POST /admin/register
    // @access Public

    registerAdmin: async (req, res) => {
        const { 
            firstName, 
            lastName,
            email, 
            phoneNumber,
            password, 
        } = req.body;
        if (!firstName || 
            !lastName ||
            !email ||
            !phoneNumber ||
            !password) return res.status(400).json({ 'message': 'All fields are required.' });
    
        try {
            //encrypt the password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            //create and store the new user
            const result = await Admin.create({
                firstName, 
                lastName, 
                email, 
                phoneNumber, 
                password: hashedPassword,
            });
            console.log({ 'success': `New admin ${firstName} created!` })
            res.status(201).json({ 'success': `New admin ${firstName} created!` });
        } catch (err) {
            let msg;
            if(err.code == 11000) {
                msg = "Administrator already exists."
            } else {
                msg = err.message
            }
            res.status(500).json({'message': err.message})
        }
    },

    // @description login admininstrator
    // @route POST /admin/login
    // @access Public

    loginAdmin: async (req, res) => {
        const cookies = req.cookies;
    
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    
        const foundAdmin = await Admin.findOne({ email }).exec();
        if (!foundAdmin) return res.sendStatus(401); //Unauthorized 

        // evaluate password 
        const match = await bcrypt.compare(password, foundAdmin.password);
        if (match) {

            // create JWTs
            const accessToken = jwt.sign(
                { "email": foundAdmin.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            const newRefreshToken = jwt.sign(
                { "email": foundAdmin.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
    
            // Changed to let keyword
            let newRefreshTokenArray =
                !cookies?.jwt
                    ? foundAdmin.refreshToken
                    : foundAdmin.refreshToken.filter(rt => rt !== cookies.jwt);
    
            if (cookies?.jwt) {
    
                const refreshToken = cookies.jwt;
                const foundToken = await Admin.findOne({ refreshToken }).exec();
    
                // Detected refresh token reuse!
                if (!foundToken) {
                    // clear out ALL previous refresh tokens
                    newRefreshTokenArray = [];
                }
    
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            }
    
            // saves refreshToken with current user
            foundAdmin.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundAdmin.save();
    
            // creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
    
        } else {
            res.sendStatus(401);
        }
    },

    // @description refresh token
    // @route PUT /admin/:id
    // @access Private

    refreshToken: async (req, res) => {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies.jwt;
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    
        const foundAdmin = await Admin.findOne({ refreshToken }).exec();
    
        // detected refresh token reuse
        if (!foundAdmin) {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, decoded) => {
                    if (err || foundAdmin.email !== decoded.email) return res.sendStatus(403);
                    const accessToken = jwt.sign(
                        { "email": decoded.email },
                        proccess.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '15m' }
                    );
                    res.json({ accessToken })
            }
        )};
    },
    

    // @description update admininstrator
    // @route PUT /admin/:id
    // @access Private

    updateAdmin: (req, res) => {
        Admin.findOneAndUpdate({_id: req.admin.id}, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        }, {
            new: true,
            runValidators: true,
        })
            .then((updateAdmin) => {
                res.json(updateAdmin);
            })
            .catch((err) => {
                res.json('Something went wrong when updating administrator')
                res.status(400).json(err);
            })
    },

    // @description logout admininstrator
    // @route PUT /admin/logout
    // @access Private

    logoutAdmin: async (req, res) => {

        // delete the accessToken
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); // no content
        const refreshToken = cookies.jwt;
    
        // check refresh token in database
        const foundAdmin = await Admin.findOne({ refreshToken }).exec();
        if (!foundAdmin) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }
    
        // delete refreshToken in database
        foundAdmin.refreshToken = foundAdmin.refreshToken.filter(rt => rt !== refreshToken);;
        const result = await foundAdmin.save();
    
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
    }    
}