const express = require("express")
const { getAllblogs, addBlogs, updateBlog, deleteBlog, getById, getbyuserId , } = require("../controllers/blog_controller");
const { authenticateUser } = require("../middleware/authenticate");
const router = express.Router();

router.get("/getBlogs", authenticateUser ,getAllblogs);
router.post("/add", authenticateUser,addBlogs)
router.get("/getblog/:id", authenticateUser,getById)
router.put("/update/:id", authenticateUser,updateBlog)
router.delete("/delete/:id",authenticateUser,deleteBlog);
router.delete("/user/:id",authenticateUser,getbyuserId);

module.exports=router;