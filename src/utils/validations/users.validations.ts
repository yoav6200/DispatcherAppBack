import { Request, Response, NextFunction } from 'express';

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, name, email, password } = req.body;

  const errors: string[] = [];

  // Validate data
  if (!id) {
    errors.push('id is required');
  }

  if (!name) {
    errors.push('name is required');
  }

  if (!email) {
    errors.push('email is required');
  }

  if (!password) {
    errors.push('password cannot be empty!');
  } else {
    if (password.length < 8) {
      errors.push('password must be at least 8 chars long');
    }
  }

  if (errors.length) {
    res.status(422).json({
      message: 'Validation failed',
      errors,
    });
  } else {
    next();
  }
};
