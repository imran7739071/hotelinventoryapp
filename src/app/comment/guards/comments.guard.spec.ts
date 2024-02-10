import { TestBed } from '@angular/core/testing';

import { CommentsGuard } from './comments.guard';

describe('CommentsGuard', () => {
  let guard: CommentsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CommentsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
