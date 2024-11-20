import { Request, Response, NextFunction } from 'express';
import {
  EMAIL_REQUIRED,
  INVALID_EMAIL,
  PASSWORD_LENGTH,
  PASSWORD_REQUIRED,
  PASSWORD_UNMATCH,
  VALIDATION_FAILED,
} from '../../constants/strings';

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, password2 } = req.body;

  const errors: string[] = [];

  if (!email) {
    errors.push(EMAIL_REQUIRED);
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      errors.push(INVALID_EMAIL);
    }
  }

  if (!password) {
    errors.push(PASSWORD_REQUIRED);
  } else {
    if (password.length < 8) {
      errors.push(PASSWORD_LENGTH);
    }
  }

  if (password2) {
    if (password !== password2) {
      errors.push(PASSWORD_UNMATCH);
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
