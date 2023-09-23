const { default: mongoose } = require("mongoose");

const todoSchema = new mongoose.Schema(
	{
		_id: { type: mongoose.Types.ObjectId },
		todoTitle: String,
		checked: Boolean,
		createdAt: Date,
		updatedAt: Date,
		isDeleted: Boolean,
	},
	{ strict: false, collection: "todos" }
);

const todoModel = mongoose.model("todos", todoSchema);
module.exports = todoModel;
