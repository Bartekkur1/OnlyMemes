import IdentityHandler from '../src/Adapter/Web/Handlers/IdentityHandler';
import { InvalidCredentialsError, UserNotFoundError } from '../src/Application/Identity/error';
import { UnexpectedError } from '../src/Application/types';

describe('IdentityHandler', async () => {

  const identityMock = {
    login: jest.fn(),
    register: jest.fn(),
    verifyToken: jest.fn()
  };
  const identityHandler = new IdentityHandler(identityMock as any);
  const responseMock = { json: jest.fn(), sendStatus: jest.fn() };
  const nextMock = jest.fn();

  beforeEach(() => {
    identityMock.login.mockClear();
    identityMock.register.mockClear();
    identityMock.verifyToken.mockClear();
    responseMock.json.mockClear();
    responseMock.sendStatus.mockClear();
    nextMock.mockClear();
  });

  test('Should authenticate user successfully', async () => {
    const expectedToken = 'token:123';
    identityMock.login.mockReturnValue(expectedToken);
    await identityHandler.login(
      { body: { email: 'email', password: 'password' } } as any,
      responseMock as any,
      () => { }
    );
    expect(responseMock.json.mock.calls[0][0].token).toEqual(expectedToken);
  });

  test('Should return 401 if login credentials are invalid', async () => {
    identityMock.login = jest.fn().mockRejectedValue(new InvalidCredentialsError('Invalid password'));
    await identityHandler.login(
      { body: { email: 'email', password: 'password' } } as any,
      responseMock as any,
      nextMock
    );
    expect(nextMock.mock.calls[0][0].status).toEqual(401);
    expect(nextMock.mock.calls[0][0].message).toEqual('Invalid email or password!');
  });

  test('Should return 401 if login user is not found', async () => {
    identityMock.login = jest.fn().mockRejectedValue(new UserNotFoundError());
    await identityHandler.login(
      { body: { email: 'email', password: 'password' } } as any,
      responseMock as any,
      nextMock
    );
    expect(nextMock.mock.calls[0][0].status).toEqual(401);
    expect(nextMock.mock.calls[0][0].message).toEqual('User not found');
  });

  test('Should return 400 if register credentials are invalid', async () => {
    identityMock.register = jest.fn().mockRejectedValue(new InvalidCredentialsError('Invalid email'));
    await identityHandler.register(
      { body: { email: 'email', password: 'password', displayName: 'display' } } as any,
      responseMock as any,
      nextMock
    );
    expect(nextMock.mock.calls[0][0].status).toEqual(400);
    expect(nextMock.mock.calls[0][0].message).toEqual('Invalid email or password!');
  });

  test('Should return 500 if an unexpected error occurs', async () => {
    identityMock.register = jest.fn().mockRejectedValue(new UnexpectedError('Unexpected error'));
    await identityHandler.register(
      { body: { email: 'email', password: 'password', displayName: 'display' } } as any,
      responseMock as any,
      nextMock
    );
    expect(nextMock.mock.calls[0][0].status).toEqual(500);
    expect(nextMock.mock.calls[0][0].message).toEqual('An unexpected error occurred! Unexpected error');
  });

  test('Should return 401 if token is invalid', async () => {
    identityMock.verifyToken = jest.fn().mockImplementation(() => {
      throw new Error();
    })
    await identityHandler.verifyToken(
      { headers: { authorization: 'Bearer 123' } } as any,
      responseMock as any,
      nextMock
    );
    expect(responseMock.sendStatus.mock.calls[0][0]).toEqual(401);
  });

  test('Should return 200 if token is valid', async () => {
    identityMock.verifyToken = jest.fn().mockReturnValue(true);
    await identityHandler.verifyToken(
      { headers: { authorization: 'Bearer 123' } } as any,
      responseMock as any,
      nextMock
    );
    expect(responseMock.sendStatus.mock.calls[0][0]).toEqual(200);
  });
});