const express = require("express");
const indexRouter = require("./router/index");
const cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());
app.use("/", indexRouter);
app.listen(port, () => {
  console.log(`켜짐 포트 : ${port}`);
});
