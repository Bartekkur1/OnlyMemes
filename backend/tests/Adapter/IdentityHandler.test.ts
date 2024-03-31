import { expect, test, mock, describe } from 'bun:test';
import IdentityHandler from '../../src/Adapter/Web/Handlers/IdentityHandler';

describe('IdentityHandler', async () => {

  const identityMock = {
    login: mock(),
  };
  const identityHandler = new IdentityHandler(identityMock as any);
  const responseMock = { json: mock() };

  test('should authenticate user successfully', async () => {
    const expectedToken = 'token:123';
    identityMock.login.mockReturnValue(expectedToken);
    await identityHandler.login(
      { body: { email: 'email', password: 'password' } } as any,
      responseMock as any,
      () => { }
    );
    expect(responseMock.json.mock.calls[0][0].token).toEqual(expectedToken);
  });
});