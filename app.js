const express = require("express");
const indexRouter = require("./router/index.js");

const app = express();
const port = 4000;

app.use("/",indexRouter);

app.get("/",(req,res) => {
    res.send("asasdfasfsafㅁㄴㅇㅁㅇㅁd");
})

// app.get("/asda", (req,res) => {
//     res.status(404).send("오오옹")
// })

app.listen(port, () => {
    console.log(`켜짐 포트 : ${port}`)
})