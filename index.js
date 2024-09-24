const express = require("express");
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const PORT = 8000;
const app = express();

connectMongoDb("mongodb://127.0.0.1:27017/user-db")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("error", err));

//middlewares
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

//routes

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
