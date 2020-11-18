import mongoose from "mongoose";

const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", TodoSchema);

// export default Todo;
