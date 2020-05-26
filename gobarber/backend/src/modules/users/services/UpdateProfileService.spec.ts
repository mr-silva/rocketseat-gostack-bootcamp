import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'testemail@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Testy',
      email: 'testy@emailservice.com',
    });

    expect(updatedUser.name).toBe('Testy');
    expect(updatedUser.email).toBe('testy@emailservice.com');
  });

  it('should not be able to update email to an existing one', async () => {
    await fakeUsersRepository.create({
      name: 'User Test One',
      email: 'usertestone@email.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'User Test Two',
      email: 'usertesttwo@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'User Test',
        email: 'usertestone@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'testemail@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Testy',
      email: 'testy@emailservice.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.name).toBe('Testy');
    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update user password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'testemail@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Testy',
        email: 'testy@emailservice.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'testemail@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Testy',
        email: 'testy@emailservice.com',
        old_password: 'wrong-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
