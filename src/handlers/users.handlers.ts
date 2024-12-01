import { Request, Response } from 'express';
import { User } from '../models/users.models';
import {
  USER_CREATED,
  USER_DELETED,
  USER_NOT_FOUND,
  USER_UPDATED,
} from '../constants/strings';
import { hashPassword } from '../utils/validations/hashPassword';

export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
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
  const { id } = req.params;

  try {
    const user = await User.findById(id);

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
    const newUser = new User({ email, name, uid, favoriteItems: [] });

    const savedUser = await newUser.save();

    res.status(201).json({ message: USER_CREATED, userId: savedUser._id });
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
  const { id } = req.params;
  const { email, name, uid } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, name, uid, favoriteItems: [] },
      { new: true, runValidators: true }
    );

    if (updatedUser) {
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
  const { id } = req.params;
  const updates = req.body;

  if (updates.password) {
    updates.password = await hashPassword(updates.password);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (updatedUser) {
      res.status(200).json({ message: USER_UPDATED });
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

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) {
      res.status(200).json({ message: `${USER_DELETED} ${id}` });
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
  const { userId } = req.params;
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    res.status(400).send({ message: '`title` is required and must be valid.' });
    return;
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid: userId },
      { $push: { favoriteItems: title } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).send({ message: 'User not found or no update made.' });
      return;
    }

    res.send({ message: 'Favorite item added successfully' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send({ message: 'An unknown error occurred' });
  }
};

export const removeUserFavoriteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    res.status(400).send({ message: '`title` is required and must be valid.' });
    return;
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid: userId },
      { $pull: { favoriteItems: title } },
      { new: true }
    );

    if (!updatedUser) {
      res
        .status(404)
        .send({ message: 'User not found or item not in favorites.' });
      return;
    }

    res.send({ message: 'Favorite item removed successfully' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send({ message: 'An unknown error occurred' });
  }
};

export const getAllFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid }, { favoriteItems: 1 });

    if (!user) {
      res.status(404).send({ message: 'User not found.' });
      return;
    }

    res.status(200).send({ favoriteItems: user.favoriteItems || [] });
  } catch (error) {
    console.error('Error occurred while fetching favorites:', error);
    res.status(500).send({ message: 'An unknown error occurred' });
  }
};
