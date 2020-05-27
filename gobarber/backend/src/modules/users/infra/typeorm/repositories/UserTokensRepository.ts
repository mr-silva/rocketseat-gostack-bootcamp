import { Repository, getRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userTokens = await this.ormRepository.find({
      where: { user_id },
    });

    const checkIfExistsAValidToken = userTokens.filter(filteredUserToken => {
      if (
        filteredUserToken.user_id === user_id &&
        isAfter(addHours(filteredUserToken.created_at, 2), Date.now())
      ) {
        return filteredUserToken;
      }
      return undefined;
    });

    if (checkIfExistsAValidToken.length) {
      return checkIfExistsAValidToken[0];
    }

    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }
}

export default UserTokensRepository;
