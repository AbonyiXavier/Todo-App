import createError from "http-errors";
import readXlsxFile from "read-excel-file/node";

import Todo from "../Models/todo";

export default class todoController {
  static async addTodo(request, response, next) {
    try {
      const { title } = request.body;
      const titleExist = await Todo.findOne({ title });
      if (titleExist) {
        throw createError.Conflict(
          `${title} already exist, please change title....`
        );
      }
      const todo = new Todo({
        ...request.body,
        userId: request.decoded.user._id,
      });

      await todo.save();

      return response.send({
        message: "Todo added succesfully...",
        todo,
      });
    } catch (error) {
      next(error);
    }
  }

  static async uploadTodo(request, response, next) {
    try {
      // eslint-disable-next-line eqeqeq
      if (request.file == undefined) {
        return response.status(400).send("Please upload an excel file!");
      }

      let path = `uploads/${request.file.filename}`;

      const rows = await readXlsxFile(path, { Todo });
      console.log("rows", rows);

      // skip header
      rows.shift();

      let todos = [];

      rows.forEach((row) => {
        let todo = {
          _id: row[0],
          title: row[1],
          description: row[2],
          isDone: row[3],
        };
        console.log("todo", todo);
        todos.push(todo);
      });

      await Todo.insertMany(todos);

      return response.send({
        message: `Uploaded the file successfully: ${request.file.originalname}`,
      });
    } catch (error) {
      console.log(error);
      response.status(500).send({
        message: `Could not upload the file: ${request.file.originalname}`,
      });
    }
  }

  static async getTodos(request, response, next) {
    try {
      let { title, page, limit } = request.query;
      page = page < 1 ? 1 : page;
      limit = 5;
      let search = title
        ? { title: { $regex: new RegExp(title), $options: "i" } }
        : {};

      let count = await Todo.countDocuments();
      let totalPages = Math.ceil(count / limit);
      page = page > totalPages ? totalPages : page;
      const todos = await Todo.find(search, {})
        .populate("userId")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .collation({ locale: "en" })
        .sort({ title: 1 })
        .exec();
      if (!todos) {
        throw createError.NotFound("todos not added");
      }
      return response.send({
        message: "Todos retrieved succesfully...",
        todos,
        totalPages,
        currentPage: page,
        totalTodos: count,
      });
    } catch (error) {
      next(error);
    }
  }
}
