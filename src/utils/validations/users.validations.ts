import { Request, Response, NextFunction } from 'express';
import {
  EMAIL_REQUIRED,
  PASSWORD_LENGTH,
  PASSWORD_REQUIRED,
  VALIDATION_FAILED,
} from '../../constants/strings';

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const errors: string[] = [];

  // Validate data

  if (!email) {
    errors.push(EMAIL_REQUIRED);
  }

  if (!password) {
    errors.push(PASSWORD_REQUIRED);
  } else {
    if (password.length < 8) {
      errors.push(PASSWORD_LENGTH);
    }
  }

  if (errors.length) {
    res.status(422).json({
      message: VALIDATION_FAILED,
      errors,
    });
  } else {
    next();
  }
};
