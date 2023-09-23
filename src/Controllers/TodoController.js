const { BSON } = require("bson");
const todoModel = require("../Models/todo.model");

const TodoController = {
	getTodo: async (req, res) => {
		const timestamp = new Date().toISOString();

		try {
			const todoList = await todoModel.find({ isDeleted: false });
			return res.status(200).json({
				data: todoList,
				status: true,
				timestamp,
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message,
				status: false,
				timestamp,
			});
		}
	},
	createTodo: async (req, res) => {
		const { todoTitle } = req.body;
		const timestamp = new Date().toISOString();

		try {
			if (!todoTitle) {
				return res.status(404).json({
					error: "TodoTitle is not found",
					status: false,
					timestamp,
				});
			}
			const newTodo = new todoModel({
				_id: new BSON.ObjectId(),
				todoTitle,
				checked: false,
				createdAt: timestamp,
				updatedAt: timestamp,
				isDeleted: false,
			});
			const resTodo = await newTodo.save();
			return res.status(201).json({
				data: resTodo,
				status: true,
				timestamp,
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message,
				status: false,
				timestamp,
			});
		}
	},
	updateTodo: async (req, res) => {
		const timestamp = new Date().toISOString();
		try {
			const { _id, todoTitle, checked } = req.body;
			if (!_id && !todoTitle && !checked) {
				return res.status(404).json({
					error: "Payload not found",
					status: false,
					timestamp,
				});
			}
			const updatedTodo = await todoModel.findOneAndUpdate(
				{ _id },
				{ todoTitle, checked, updatedAt: timestamp },
				{ new: true }
			);
			return res.status(200).json({
				data: updatedTodo,
				status: true,
				timestamp,
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message,
				status: false,
				timestamp,
			});
		}
	},
	deleteTodo: async (req, res) => {
		const timestamp = new Date().toISOString();
		const { _id } = req.body;
		try {
			if (!_id) {
				return res.status(404).json({
					error: "Payload not found",
					status: false,
					timestamp,
				});
			}
			const deletedTodo = await todoModel.findOneAndUpdate(
				{ _id },
				{ isDeleted: true, updatedAt: timestamp },
				{ new: true }
			);
			return res.status(200).json({
				data: deletedTodo,
				status: true,
				timestamp,
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message,
				status: false,
				timestamp,
			});
		}
	},
};

module.exports = TodoController;
