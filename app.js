const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const Blog = require("./models/blog");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: true}));
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
    "Pet",
    "Science",
    "Dance"
];

const users = [];
const blogs = [];
const loggedInUsers = [];

app.get("/", (req, res, next) => {
    res.render("blog/category", {categories: categories});
    console.log(users);
});

app.get("/landing", (req, res) => {
    res.render("landing", {path: "/landing"});
});

app.get("/add-blog", (req, res) => {
    res.render("blog/add-blog", {categories: categories});
});

app.post("/add-blog", (req, res) => {
    const blog = new Blog(req.body.title, req.body.imgUrl, req.body.content, req.body.category);
    blog.save();
    res.redirect("/");
});

app.get("/blog-list", (req, res) => {
    Blog.fetchAll()
    .then(([rows, metadata]) => {
        res.render("blog/blog-list", {blogs: rows});
    })
    .catch(err => {
        console.log(err);
    });
});

app.get("/blog-list/:category", (req, res) => {
    Blog.fetchByCategory(req.params.category)
    .then(([rows, metadata]) => {
        res.render("blog/blog-list", {blogs: rows});
    })
    .catch(err => {
        console.log(err);
    });
});

app.get("/login", (req, res) => {
    res.render("user/login", {path: "/landing"});
});

app.get("/landing/login", (req, res) => {
    res.render("user/login", {path: "/landing/login"});
});

app.get("/landing/signup", (req, res) => {
    res.render("user/signup", {path: "/landing/signup"});
});

app.post("/login", (req, res) => {
    loggedInUsers.push(req.body);
    res.redirect("/");
});

app.get("/signup", (req, res) => {
    res.render("user/signup", {path: "/landing"});
});

app.post("/signup", (req, res) => {
    users.push(req.body);
    res.redirect("/");
});

app.get("/current-user-profile", (req, res) => {
    Blog.fetchAll()
    .then((rows, metadata) => {
        res.render("user/user-profile", {users: users, blogs: rows});
    })
    .catch(err => {
        console.log(err);
    });
});

app.get("/author-list", (req, res) => {
    res.render("user/author-list", {users: users});
});

app.get("/edit-profile", (req, res) => {
    res.render("user/edit-user-profile");
});

app.get("/blog-detail/:title", (req, res) => {
    Blog.fetchById(req.params.title)
    .then(([row, metadata]) => {
        console.log(req.params.title);
        res.render("blog/blog-detail", {blog: row[0]});
    })
    .catch(err => {
        console.log(err);
    });
});

app.listen("4000", () => {
    console.log("server has been started");
});