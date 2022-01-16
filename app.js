const express = require("express");
const app = express();
const connectDB = require("./db/connect");
// database url 
require("dotenv").config();
const { MONGO_URI } = process.env

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
// routes import 
const tasks = require("./routes/tasks");


//pass static files  middleware
app.use(express.static("./public"));
// app use json middleware
app.use(express.json());
// routes handler middleware
app.use("/raybags.com/api/task_manager/v1/tasks", tasks);
// not-found handler middleware
app.use(notFound);
app.use(errorHandler);

// handle db connection
const start = async() => {
    try {
        console.log("initializing connection  to server...")
        await connectDB(MONGO_URI);
        console.log("======= CONNECTED TO DB ========")
            // Port set-up and start server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));

    } catch (e) {
        console.error(e.message)
    }
}
start();