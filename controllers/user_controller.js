const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const User = require("../models/user_model");

module.exports = {
    signupUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = {
                username, email, password: hashedPassword , blogs:[]
            }
            console.log(newUser);

            // Save user
            await new User(newUser).save()

            res.status(200).send({
                msg: 'Signup successfully',
                data: { newUser }
            })

        } catch (error) {
            res.send({
                msg: error.message
            })

        }

    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const userData = await User.findOne({ email: email })
            if (!userData) {
                return res.status(404).send("user not found.")
            }
            if (userData) {
                console.log(userData);
                const iscorrectPassword = await bcrypt.compare(password, userData.password);
                if (!iscorrectPassword) {
                    return res.status(404).send("Password is incorrect.")
                }
                if (iscorrectPassword) {
                    console.log(iscorrectPassword);
                    const token = jwt.sign(
                        userData.toObject(), "secret text", { expiresIn: 60 * 24 }
                    )
                    console.log("token", token)

                    return res.status(200).send({
                        msg: 'Login successfully',
                        data: { email, token }
                    })
                }
            }
        } catch (error) {
            res.send({
                msg: error.message
            })

        }

    },
    getAllusers: async (req, res) => {
        try {
            const Users = await User.find();
            if (!Users) {
                return res.status(404).send({
                    msg: "User not Found."
                })
            }
            return res.status(200).send({Users});
        }
        catch (error) {
            res.send({
                msg: error.message,
            })
        }

    }

}