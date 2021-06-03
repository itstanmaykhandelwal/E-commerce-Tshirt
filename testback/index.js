const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req,res) => {
    return res.send("This is Home")
})


const admin = (req,res) =>{
    return res.send("this is admin dashboard");
}

const isAdmin = (req,res,next) =>{
    console.log("isAdmin is Running")
    next()
}

const isLoggedIn = (req,res,next) =>{
    console.log("isAdmin is Running")
    next()
}

app.get("/admin",  isLoggedIn,isAdmin , admin);

app.get("/login", (req,res) =>{
    return res.send("You are visiting route")
})

app.get("/admin", (req,res) =>{
    return res.send("This is admin")
})


app.listen(port, () =>{
    console.log("Server is Up and Running...")
})



