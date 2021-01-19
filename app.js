const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const categories = [
    "Fashion",
    "Food",
    "Travel",
    "Fitness",
    "Lifestyle",
    "Music",
    "Sports",
    "Politics",
    "Parenting",
    "business",
    "Movies",
    "Gaming",
    "Science",
    "Dance"
];

const users = [];
const blogs = [];
const loggedInUsers = [];

app.get("/", (req, res, next) => {
    res.render("blog/category");
    console.log(users);
});

app.get("/add-blog", (req, res) => {
    res.render("blog/add-blog", {categories: categories});
});

app.post("/add-blog", (req, res) => {
    blogs.push(req.body);
    res.redirect("/");
});

app.get("/blog-list", (req, res) => {
    res.render("blog/blog-list", {blogs: blogs});
});

app.get("/login", (req, res) => {
    res.render("user/login");
});

app.post("/login", (req, res) => {
    loggedInUsers.push(req.body);
    res.redirect("/");
});

app.get("/signup", (req, res) => {
    res.render("user/signup");
});

app.post("/signup", (req, res) => {
    users.push(req.body);
    res.redirect("/");
});

app.get("/current-user-profile", (req, res) => {
    res.render("user/user-profile", {users: users, blogs: blogs});
});

app.get("/author-list", (req, res) => {
    res.render("user/author-list", {users: users});
});

app.get("/edit-profile", (req, res) => {
    res.render("user/edit-user-profile");
});

app.get("/blog-detail", (req, res) => {
    res.render("blog/blog-detail", {blog: blogs[0]});
});

app.listen("4000", () => {
    console.log("server has been started");
});