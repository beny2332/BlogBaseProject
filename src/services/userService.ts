import User, { IUser } from "../models/userModel";

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  try {
    const user = new User(userData);
    await user.save();
    return user
  } catch (error) {
    console.log(error)
    throw error
  }
};

export const findAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await User.find();
    return users
  } catch (error) {
    console.log(error)
    throw error
  }
};

export const findUserByUsername = async (username: string): Promise<IUser | null> => {
  try {
    const user = await User.findOne({ username });
    return user
  } catch (error) {
    console.log(error)
    throw error
  }
};