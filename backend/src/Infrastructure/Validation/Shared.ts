import Joi from "joi";

export const validate = (input: any, schema: Joi.ObjectSchema) => {
  const { error } = schema.validate(input);
  return error ? error.message : undefined;
};
