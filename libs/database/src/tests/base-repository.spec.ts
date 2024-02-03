import { BaseRepository } from '../repositories/base-repository';
import { IBaseEntity } from '../types/base-entity';

export interface IUser extends IBaseEntity {
  name: string;
}

describe('BaseRepository', () => {
  let repository: BaseRepository<IUser>;

  beforeEach(() => {
    BaseRepository.resetMockDB();
    repository = new BaseRepository<IUser>();
  });

  it('should create a new user', async () => {
    const user: IUser = { id: 1, name: 'John Doe' };
    await repository.create(user);
    const foundUser = await repository.findById(1);
    expect(foundUser).toEqual(user);
  });

  it('should find a user by id', async () => {
    const user: IUser = { id: 2, name: 'Jane Doe' };
    await repository.create(user);
    const foundUser = await repository.findById(2);
    expect(foundUser).toEqual(user);
  });

  it('should update a user', async () => {
    const user: IUser = { id: 3, name: 'John Smith' };
    await repository.create(user);
    const updatedUser: IUser = { ...user, name: 'John Doe' };
    await repository.update(updatedUser);
    const foundUser = await repository.findById(3);
    expect(foundUser).toEqual(updatedUser);
  });

  it('should delete a user', async () => {
    const user: IUser = { id: 4, name: 'Jane Smith' };
    await repository.create(user);
    const deleteResult = await repository.delete(4);
    const foundUser = await repository.findById(4);
    expect(deleteResult).toBeTruthy();
    expect(foundUser).toBeNull();
  });

  it('should find all users', async () => {
    const user1: IUser = { id: 5, name: 'User 1' };
    const user2: IUser = { id: 6, name: 'User 2' };
    await repository.create(user1);
    await repository.create(user2);
    const users = await repository.findAll();
    expect(users).toEqual([user1, user2]);
  });
});
