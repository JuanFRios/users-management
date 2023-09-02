import { FilterUserByNamePipe } from './filter-user-by-name.pipe';

describe('FilterUserByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterUserByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
