import mongoose from "mongoose";

const TodoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 50,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
