import Joi from "joi";

const todoSchema = Joi.object({
  title: Joi.string().required().min(3).max(50).empty().messages({
    "any.required": "Sorry, title is required",
    "string.empty": "title cannot be an empty field",
    "string.min":
      "title should have a minimum length of 3 and a maximum length of 255",
  }),
  description: Joi.string().required().min(5).empty().messages({
    "any.required": "Sorry, description is required",
    "string.empty": "Sorry, description cannot be an empty field",
  }),
});

export { todoSchema };
