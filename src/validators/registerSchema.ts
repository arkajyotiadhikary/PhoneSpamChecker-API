import Joi from "joi";

const registerSchema = Joi.object({
      name: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().optional(),
});

export default registerSchema;
