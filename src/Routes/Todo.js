const TodoController = require("../Controllers/TodoController");

const todoRouter = require("express").Router();

todoRouter.get("/", TodoController.getTodo);
todoRouter.post("/", TodoController.createTodo);
todoRouter.put("/", TodoController.updateTodo);
todoRouter.delete("/", TodoController.deleteTodo);

module.exports = todoRouter;
