import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import {
  EMAIL_REQUIRED,
  INVALID_EMAIL,
  PASSWORD_LENGTH,
  PASSWORD_REQUIRED,
  PASSWORD_UNMATCH,
  VALIDATION_FAILED,
} from '../../constants/strings';

const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': INVALID_EMAIL,
    'any.required': EMAIL_REQUIRED,
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': PASSWORD_LENGTH,
    'any.required': PASSWORD_REQUIRED,
  }),
  password2: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': PASSWORD_UNMATCH,
    'any.required': PASSWORD_REQUIRED,
  }),
});

const userPartialSchema = Joi.object({
  email: Joi.string().email().messages({
    'string.email': INVALID_EMAIL,
  }),
  password: Joi.string().min(8).messages({
    'string.min': PASSWORD_LENGTH,
  }),
}).or('email', 'password');

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(422).json({
      message: VALIDATION_FAILED,
      errors: error.details.map((detail) => detail.message),
    });
  } else {
    next();
  }
};

export const validateUserPartial = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userPartialSchema.validate(req.body);
  if (error) {
    res.status(422).json({
      message: VALIDATION_FAILED,
      errors: error.details.map((detail) => detail.message),
    });
  } else {
    next();
  }
};
