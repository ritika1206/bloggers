const mysql = require("mysql2");
const db = require("../util/database");

var c = 0;

module.exports = class Blog {
    constructor(title, imgUrl, content, category){
        this.id = c;
        c = c+1;
        this.title = title;
        this.imgUrl = imgUrl;
        this.content = content;
        this.category = category;
    }

    save(){
        return db.execute("INSERT INTO blogs (title, imgUrl, content, category) VALUES (?, ?, ?, ?)",
        [this.title, this.imgUrl, this.content, this.category]);
    }

    static fetchAll(){
        return db.execute("SELECT * FROM blogs");
    }

    static fetchById(title){
        return db.execute("SELECT * FROM blogs WHERE blogs.title = ?", [title]);
    }

    static fetchByCategory(category){
        return db.execute("SELECT * FROM blogs WHERE blogs.category = ?", [category]);
    }

    static deleteById(id){

    }
}