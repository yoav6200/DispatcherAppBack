import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../services/database.service';
import { Users } from '../models/users.models';
import {
  USER_CREATED,
  USER_DELETED,
  USER_NOT_FOUND,
  USER_UPDATED,
} from '../constants/strings';

import { hashPassword } from '../utils/validations/hashPassword';
import { News } from '../models/news.models';

export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await collections.users?.find({}).toArray();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const getUsersbyId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const user = await collections.users?.findOne({ _id: new ObjectId(id) });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: USER_NOT_FOUND });
    }
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const createOneUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, name, uid } = req.body;
    // const hashedPassword = await hashPassword(password);
    const newUser: Users = { email, name, uid, favoriteItems: [] };
    const result = await collections.users?.insertOne(newUser);

    if (result) {
      res
        .status(201)
        .json({ message: USER_CREATED, userId: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create user.' });
    }
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const updateOneUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const { email, name, uid } = req.body;
    // const hashedPassword = await hashPassword(password);
    const updatedUser: Users = { email, name, uid, favoriteItems: [] };

    const result = await collections.users?.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedUser }
    );

    if (result?.modifiedCount) {
      res.status(200).json({ message: USER_UPDATED });
    } else {
      res.status(404).json({ message: USER_NOT_FOUND });
    }
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};
export const updateOneUserPartial = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id;
  const updatedProperties = req.body;
  if (updatedProperties.password) {
    updatedProperties.password = await hashPassword(updatedProperties.password);
  }
  try {
    const user = await collections.users?.findOne({
      _id: new ObjectId(userId),
    });

    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    if (Object.keys(updatedProperties).length === 0) {
      res.status(400).send({ message: 'No updates provided' });
      return;
    }

    const update = { $set: updatedProperties };
    await collections.users?.updateOne({ _id: new ObjectId(userId) }, update);

    res.send({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating user' });
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const result = await collections.users?.deleteOne({
      _id: new ObjectId(id),
    });

    if (result?.deletedCount) {
      res.status(200).json({ message: USER_DELETED + ' ' + id });
    } else {
      res.status(404).json({ message: USER_NOT_FOUND });
    }
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const addUserFavoriteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id;
  const newsItemTitle = req.body.newsItemTitle;

  try {
    // Add the news item title to the user's favorites
    await collections.users?.updateOne(
      { _id: new ObjectId(userId) },
      {
        $addToSet: { favoriteItems: newsItemTitle },
      }
    );

    res.send({ message: 'Favorite item added successfully' });
  } catch (error) {
    res.status(500).send({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};
