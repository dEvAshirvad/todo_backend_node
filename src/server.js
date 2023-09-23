const express = require("express");
const dotenv = require("dotenv");
const todoRouter = require("./Routes/Todo");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({ path: `.env.development` });
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
	console.log(`Server is running at port http://localhost:${PORT}`);
});

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB Connected"))
	.catch((error) => console.error(error.message));

app.use("/api/v1/todo", todoRouter);
