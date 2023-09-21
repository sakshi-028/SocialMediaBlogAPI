const express = require("express")
const router = express.Router();
const app = express();
const dotenv = require("dotenv")
const PORT = process.env.PORT || 5000;
const usersRoute = require("./routers/user_router");
const blogRoute = require("./routers/blog_router");

require("./database/db");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user",usersRoute);
app.use("/api/blog",blogRoute)

app.get("/", (req, res, next) => {
    res.send("Hello!");
})

app.listen(PORT, () => {
    console.log("app is listening on port", PORT)
})
