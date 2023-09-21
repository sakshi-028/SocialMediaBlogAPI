const Blog = require("../models/blog_model")
const User = require("../models/user_model")
const mongoose = require("mongoose")

module.exports = {
    getAllblogs: async (req, res) => {
        try {
            const blog = await Blog.find();
            if (!blog) {
                return res.status(404).send({
                    msg: "blog not found"
                })
            }
            return res.status(200).send({ blog })
        }
        catch (error) {
            res.send({
                msg: error.message
            })
        }

    },
    addBlogs: async (req, res) => {
        try {
            const { title, discription, image, user } = req.body;
            const existingUser = await User.findById(user);
            if (!existingUser) {
                return res.status(400).send({
                    msg: "Unable to find user by this id"
                })
            }
            const addblog = new Blog({
                title,
                discription,
                image,
                user,
            })
            // save blog
            const session = await mongoose.startSession();
            session.startTransaction();
            await addblog.save({ session });
            existingUser.blogs.push(addblog);
            await existingUser.save({ session });
            await session.commitTransaction();

            res.status(200).send({
                msg: 'added successfully',
                data: { addblog }
            })

        }
        catch (error) {
            res.send({
                msg: error.message
            })
        }

    },
    updateBlog: async (req, res) => {
        try {
            const _id = req.params.id;
            // take data from client from json
            const updateBlog = req.body;
            const newBlog = await Blog.findByIdAndUpdate(_id, updateBlog, {
                new: true
            })
            res.status(200).send({
                msg: "Item Updated",
                data: newBlog
            });
        }
        catch (error) {
            res.send({
                msg: error.message
            })

        }
    },
    getById: async (req, res) => {
        try {
            const _id = req.params.id;
            const blog = await Blog.findById(_id);
            if (!blog) {
                return res.status(404).send({
                    msg: "no Blog found"
                })
            }
            return res.status(200).send({ blog })

        }
        catch (error) {
            res.send({
                msg: error.message
            })
        }

    },

    deleteBlog: async (req, res) => {
        try {
            const _id = req.params.id;
            const Blog = await Blog.findByIdAndDelete(_id).populate("user")
            await blog.user.blogs.pull(blog)
            await blog.user.save();
            res.status(200).send({ msg: "deleted successfully" });
            console.log(Blog)
        }
        catch (error) {
            res.send({
                msg: error.message
            })
        }
    },
    getbyuserId: async (req, res) => {
        try {
            const userId = req.params.id;
            const userBlogs = await User.findById(userId).populate("blogs")
            if(!userBlogs){
                return res.status(404).send({
                    msg:"no blogs found."
                })
            }
            return res.status(200).send({blogs:userBlogs})

        }
        catch (error) {
            res.send({
                msg: error.message
            })
        }
    }
}