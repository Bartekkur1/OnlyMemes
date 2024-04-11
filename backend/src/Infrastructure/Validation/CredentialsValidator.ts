import Joi from 'joi';
import { Credentials, RegisterForm } from '../../Types/Identity';

const credentialsPartialValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const userIdentityValidator = Joi.object({
  credentials: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  profile: Joi.object({
    displayName: Joi
      .string()
      .trim()
      .min(3)
      .max(30)
      .pattern(/^[a-zA-Z0-9_]+$/)
      .messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must have at least {#limit} characters',
        'string.max': 'Username cannot exceed {#limit} characters',
        'string.pattern.base': 'Username can only contain alphanumeric characters and underscores',
      })
  })
});

export const validateLoginCredentials = (credentials: Omit<Credentials, 'displayname'>): string | undefined => {
  return validate(credentials, credentialsPartialValidator);
};

export const validateRegisterForm = (form: RegisterForm): string | undefined => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    displayName: Joi
      .string()
      .trim()
      .min(3)
      .max(30)
      .pattern(/^[a-zA-Z0-9_]+$/)
      .messages({
        'string.base': 'Username'
      }),
    inviteToken: Joi.string().required()
  });
  const { error } = schema.validate(form);
  return error ? error.message : undefined;
}

const validate = (credentials: Credentials, schema: Joi.ObjectSchema) => {
  const { error } = schema.validate(credentials);
  return error ? error.message : undefined;
}