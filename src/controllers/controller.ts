import { onloadOperations } from '../app';
import { Request, Response } from 'express';
import { onLoad } from '../services/news.service';
import { INVALID_OPERATION, UNKNOWN_ERROR } from '../constants/strings';

export const loadNewsData = async (req: Request, res: Response) => {
  try {
    const operation = req.query.operation as string | undefined;

    if (!operation || !Object.keys(onloadOperations).includes(operation)) {
      throw new Error(INVALID_OPERATION);
    }

    const validOperation =
      onloadOperations[operation as keyof typeof onloadOperations];

    await onLoad(validOperation);
    res.status(200).send(`${validOperation} completed successfully'`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(`Error: ${error.message}`);
    } else {
      res.status(500).send(UNKNOWN_ERROR);
    }
  }
};
