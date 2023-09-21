const jwt = require('jsonwebtoken')
const User = require("../models/user_model")
module.exports = {
    authenticateUser: async (req, res, next) => {
        try {
            if (!req.header('Authorization')) {
                return res.send({
                    msg: 'Please use auth token to access'
                })
            }
            const token = req.header('Authorization').replace('Bearer ', '');

            if (!token) {
                return res.send({
                    msg: 'Token is not available'
                })
            }

            const decode = jwt.verify(token, "secret text")
            const user = await User.findOne({ _id: decode._id });
            if (!user) {
                return res.send({
                    msg: 'You are not authorized to perform this operation'
                })
            }

            req.user = user;

            next()

        }
        catch (error) {
            res.send({
                msg: error.message
            })

        }

    },
}