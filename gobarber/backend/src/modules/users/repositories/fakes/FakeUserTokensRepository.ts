import { uuid } from 'uuidv4';
import { isAfter, addHours } from 'date-fns';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const checkIfExistsAValidToken = this.userTokens.filter(
      filteredUserToken => {
        if (
          filteredUserToken.user_id === user_id &&
          isAfter(addHours(filteredUserToken.created_at, 2), Date.now())
        ) {
          return filteredUserToken;
        }
        return undefined;
      },
    );

    if (checkIfExistsAValidToken.length) {
      return checkIfExistsAValidToken[0];
    }

    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      searchedToken => searchedToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokensRepository;
