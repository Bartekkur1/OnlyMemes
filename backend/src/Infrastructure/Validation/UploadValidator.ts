import Joi from "joi";
import { Meme } from '../../Types/Content';
import { validate } from './Shared';

export const validateMeme = (meme: Partial<Meme>) => {
  const memeSchema = Joi.object({
    author: Joi.number().required(),
    content: Joi.string().required(),
    title: Joi.string().min(1).max(100).required(),
  });

  return validate(meme, memeSchema);
};
