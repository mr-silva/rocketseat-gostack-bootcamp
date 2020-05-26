import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'testemail@email.com',
      password: '123456',
    });

    await expect(
      showProfile.execute({
        user_id: user.id,
      }),
    ).resolves.toHaveProperty('name');
  });

  it('should be able to show unexistent user profile', async () => {
    await expect(
      showProfile.execute({
        user_id: 'unexistent-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
