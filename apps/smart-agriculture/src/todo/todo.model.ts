import { ObjectId } from 'mongodb';

export type Todo = {
  _id: ObjectId;
  title: string;
  hours: number;
  favorite: boolean;
  createdAt: Date;
};
