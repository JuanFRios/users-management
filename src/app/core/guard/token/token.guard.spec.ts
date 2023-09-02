import { TestBed } from '@angular/core/testing';

import { TokenGuard } from './token.guard';

describe('TokenGuard', () => {
  let guard: TokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenGuard);
  });

});
