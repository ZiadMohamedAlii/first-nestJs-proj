import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // ✅ FIX: no "const" here
    fakeUsersService = {
      find: () => Promise.resolve([]),

      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates new user with a salted and hashed password', async () => {
    const user = await service.signUp('assf@asdf.com', 'asdf');
    expect(user.password).not.toEqual('asdf');
  });

  it('throws an error if user signs up with email that is in use', async () => {
    // ✅ now this actually affects the same object
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);

    await expect(
      service.signUp('asdf@asdssf.com', 'asdf'), // ✅ fixed signUp
    ).rejects.toThrow(BadRequestException);
  });
});
