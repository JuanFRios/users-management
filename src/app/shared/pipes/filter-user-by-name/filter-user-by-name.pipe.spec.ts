import { FilterUserByNamePipe } from './filter-user-by-name.pipe';

describe('FilterUserByNamePipe', () => {
  let pipe: FilterUserByNamePipe;

  beforeEach(() => {
    pipe = new FilterUserByNamePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array when no filter is provided', () => {
    const users = [
      { first_name: 'John',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 1,

     },
      { first_name: 'Jane',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 2, },
      { first_name: 'Doe',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 3, },
    ];
    const result = pipe.transform(users, '');

    expect(result).toEqual(users);
  });

  it('should return the original array when the filter has less than 3 characters', () => {
    const users = [
      { first_name: 'John',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 1,

     },
      { first_name: 'Jane',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 2, },
      { first_name: 'Doe',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 3, },
    ];
    const result = pipe.transform(users, 'a');

    expect(result).toEqual(users);
  });

  it('should filter the array by first_name when a valid filter is provided', () => {
    const users = [
      { first_name: 'John',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 1,

     },
      { first_name: 'Jane',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 2, },
      { first_name: 'Doe',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 3, },
    ];
    const result = pipe.transform(users, 'joh');

    expect(result).toEqual([{ first_name: 'John',
    last_name: 'Doe',
    email: '',
    avatar: '',
    id: 1,

   },]);
  });

  it('should handle filter with different letter case', () => {
    const users = [
      { first_name: 'John',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 1,

     },
      { first_name: 'Jane',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 2, },
      { first_name: 'Doe',
      last_name: 'Doe',
      email: '',
      avatar: '',
      id: 3, },
    ];
    const result = pipe.transform(users, 'JOH');

    expect(result).toEqual([{ first_name: 'John',
    last_name: 'Doe',
    email: '',
    avatar: '',
    id: 1,

   },]);
  });
});

